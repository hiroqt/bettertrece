"""Build a Trece-only 4 m extrudable height layer from Google Open Buildings."""

import gzip
import json
import math
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import rasterio
from affine import Affine
from google.auth.credentials import AnonymousCredentials
from google.cloud import storage
from rasterio.features import geometry_mask, geometry_window, shapes
from rasterio.warp import transform_geom
from rasterio.enums import Resampling
from rasterio.windows import Window
from s2sphere import LatLng, LatLngRect, RegionCoverer
from shapely.geometry import Polygon, mapping, shape

ROOT = Path(__file__).resolve().parents[1]
BOUNDARY_PATH = ROOT / "public/data/trece-boundary-osm.geojson"
OUTPUT_PATH = ROOT / "public/data/trece-buildings-google-2023.geojson.gz"
BUCKET = "open-buildings-temporal-data"
YEAR = 2023
EFFECTIVE_PIXEL_METERS = 4
PIXEL_SCALE = 8
PRESENCE_THRESHOLD = 0.5
MINIMUM_HEIGHT_METERS = 2
HEIGHT_STEP_METERS = 4
MINIMUM_PATCH_AREA_METERS = 32
S2_LEVEL = 2


def city_s2_tokens(boundary):
    city = shape(boundary)
    west, south, east, north = city.bounds
    region = LatLngRect.from_point_pair(
        LatLng.from_degrees(south, west), LatLng.from_degrees(north, east)
    )
    coverer = RegionCoverer()
    coverer.min_level = S2_LEVEL
    coverer.max_level = S2_LEVEL
    return [cell.to_token() for cell in coverer.get_covering(region)]


def manifest_tile_paths(manifest, boundary):
    paths = []
    for tileset in manifest["tilesets"]:
        crs = tileset["crs"]
        projected_city = shape(transform_geom("EPSG:4326", crs, boundary))
        for source in tileset["sources"]:
            affine = source["affineTransform"]
            transform = Affine.translation(
                affine["translateX"], affine["translateY"]
            ) * Affine.scale(affine["scaleX"], affine["scaleY"])
            width = source["dimensions"]["width"]
            height = source["dimensions"]["height"]
            footprint = Polygon(
                transform * point
                for point in [(0, 0), (width, 0), (width, height), (0, height)]
            )
            if footprint.intersects(projected_city):
                paths.extend(
                    (
                        f"/vsigs/{(manifest['uriPrefix'] + tile).removeprefix('gs://')}",
                        crs,
                    )
                    for tile in source["uris"]
                )
    return paths


def visible_height_cells(presence, height):
    valid = (presence >= PRESENCE_THRESHOLD) & (height >= MINIMUM_HEIGHT_METERS)
    bins = np.clip(
        np.ceil((height - MINIMUM_HEIGHT_METERS) / HEIGHT_STEP_METERS), 1, 25
    )
    return np.where(valid, bins, 0).astype(np.uint8)


def source_manifests(client, tokens):
    for token in tokens:
        for blob in client.list_blobs(
            BUCKET, prefix=f"v1/manifests/{token}_"
        ):
            if f"_{YEAR}_" in blob.name:
                yield json.loads(blob.download_as_bytes())


def build_features(boundary, tiles):
    features = []
    with rasterio.Env(GS_NO_SIGN_REQUEST="YES"):
        for path, crs in tiles:
            projected_city = transform_geom("EPSG:4326", crs, boundary)
            city_projection = shape(projected_city)
            with rasterio.open(path) as dataset:
                bounds = geometry_window(dataset, [projected_city])
                col_start = max(
                    0,
                    math.floor(bounds.col_off / PIXEL_SCALE) * PIXEL_SCALE,
                )
                row_start = max(
                    0, math.floor(bounds.row_off / PIXEL_SCALE) * PIXEL_SCALE
                )
                col_end = min(
                    dataset.width,
                    math.ceil(
                        (bounds.col_off + bounds.width) / PIXEL_SCALE
                    )
                    * PIXEL_SCALE,
                )
                row_end = min(
                    dataset.height,
                    math.ceil(
                        (bounds.row_off + bounds.height) / PIXEL_SCALE
                    )
                    * PIXEL_SCALE,
                )
                window = Window(
                    col_start, row_start, col_end - col_start, row_end - row_start
                )
                window_height = int(window.height / PIXEL_SCALE)
                window_width = int(window.width / PIXEL_SCALE)
                pixels = dataset.read(
                    (2, 3),
                    window=window,
                    out_shape=(2, window_height, window_width),
                    resampling=Resampling.average,
                )
                transform = dataset.window_transform(window) * Affine.scale(
                    PIXEL_SCALE, PIXEL_SCALE
                )
                inside_city = geometry_mask(
                    [projected_city],
                    out_shape=(window_height, window_width),
                    transform=transform,
                    invert=True,
                )
                pixels[:, ~inside_city] = 0

            cells = visible_height_cells(pixels[1], pixels[0])
            for geometry, height in shapes(
                cells,
                mask=cells > 0,
                transform=transform,
                connectivity=4,
            ):
                patch = shape(geometry).simplify(
                    EFFECTIVE_PIXEL_METERS / 2, preserve_topology=True
                )
                patch = patch.intersection(city_projection)
                if patch.is_empty or patch.area < MINIMUM_PATCH_AREA_METERS:
                    continue
                features.append(
                    {
                        "type": "Feature",
                        "id": len(features),
                        "properties": {
                            "height_m": int(height) * HEIGHT_STEP_METERS,
                            "source": "Google Open Buildings 2.5D Temporal",
                            "year": YEAR,
                        },
                        "geometry": transform_geom(
                            crs,
                            "EPSG:4326",
                            mapping(patch),
                            precision=6,
                        ),
                    }
                )
    return features


def self_check():
    sample = visible_height_cells(
        np.array([[0.49, 0.5], [0.8, 0.7]]),
        np.array([[20, 1], [2.4, 5.6]]),
    )
    assert sample.tolist() == [[0, 0], [1, 1]]
    assert int(sample[1, 0]) * HEIGHT_STEP_METERS == 4
    assert int(sample[1, 1]) * HEIGHT_STEP_METERS == 4


def main():
    import sys

    if "--self-check" in sys.argv:
        self_check()
        print("Building height extraction self-check passed.")
        return

    boundary_data = json.loads(BOUNDARY_PATH.read_text())
    boundary = boundary_data["features"][0]["geometry"]
    client = storage.Client(
        credentials=AnonymousCredentials(), project="open-data-download"
    )
    manifests = list(source_manifests(client, city_s2_tokens(boundary)))
    tiles = [
        tile
        for manifest in manifests
        for tile in manifest_tile_paths(manifest, boundary)
    ]
    if not tiles:
        raise RuntimeError(f"No {YEAR} building-height rasters cover Trece.")

    features = build_features(boundary, tiles)
    document = {
        "type": "FeatureCollection",
        "name": "Trece Martires Google Open Buildings height estimates",
        "source": "Google Open Buildings 2.5D Temporal",
        "sourceUrl": "https://sites.research.google/gr/open-buildings/temporal/",
        "sourceTilePaths": [
            f"gs://{path.removeprefix('/vsigs/')}" for path, _ in tiles
        ],
        "year": YEAR,
        "effectivePixelMeters": EFFECTIVE_PIXEL_METERS,
        "heightStepMeters": HEIGHT_STEP_METERS,
        "minimumPatchAreaSquareMeters": MINIMUM_PATCH_AREA_METERS,
        "presenceThreshold": PRESENCE_THRESHOLD,
        "imageryPredictionDate": "2023-06-30",
        "retrievedOn": datetime.now(timezone.utc).date().isoformat(),
        "license": "CC-BY-4.0",
        "features": features,
    }
    with gzip.open(OUTPUT_PATH, "wt", encoding="utf-8", compresslevel=9) as output:
        json.dump(document, output, separators=(",", ":"))
    print(f"Wrote {len(features)} building patches to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
