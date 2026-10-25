"""Build a compact Trece-only CHMv2 canopy patch layer from its public AWS COG."""

import gzip
import json
import math
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import rasterio
from affine import Affine
from rasterio.features import shapes
from rasterio.io import MemoryFile
from rasterio.merge import merge
from rasterio.mask import mask
from rasterio.warp import transform_geom
from shapely.geometry import mapping, shape

ROOT = Path(__file__).resolve().parents[1]
BOUNDARY_PATH = ROOT / "public/data/trece-boundary-osm.geojson"
OUTPUT_PATH = ROOT / "public/data/trece-canopy-6m.geojson.gz"
SOURCE_PREFIX = (
    "https://dataforgood-fb-data.s3.amazonaws.com/forests/v2/global/"
    "dinov3_global_chm_v2_ml3"
)
OBSERVATION_DATES = ["2010-01-30", "2014-05-17", "2018-04-06"]
POOL_FACTOR = 5
MINIMUM_HEIGHT_METERS = 3


def tile_index(longitude, latitude, zoom):
    scale = 1 << zoom
    x = min(scale - 1, max(0, int((longitude + 180) / 360 * scale)))
    latitude = math.radians(max(-85.05112878, min(85.05112878, latitude)))
    y = int((1 - math.asinh(math.tan(latitude)) / math.pi) / 2 * scale)
    return x, min(scale - 1, max(0, y))


def quadkey(x, y, zoom):
    key = ""
    for level in range(zoom, 0, -1):
        mask = 1 << (level - 1)
        digit = int((x & mask) != 0) + 2 * int((y & mask) != 0)
        key += str(digit)
    return key


def source_tiles(geometry):
    boundary_shape = shape(geometry)
    west, south, east, north = boundary_shape.bounds
    min_x, min_y = tile_index(west, north, 10)
    max_x, max_y = tile_index(east - 1e-9, south + 1e-9, 10)
    return [
        quadkey(x, y, 10)
        for y in range(min_y, max_y + 1)
        for x in range(min_x, max_x + 1)
    ]


def main():
    boundary_data = json.loads(BOUNDARY_PATH.read_text())
    boundary = boundary_data["features"][0]["geometry"]
    canopy_features = []
    tile_keys = source_tiles(boundary)
    sources = [
        rasterio.open(
            f"/vsicurl/{SOURCE_PREFIX}/chm/{tile_key}.tif"
        )
        for tile_key in tile_keys
    ]

    try:
        source = sources[0]
        projected_boundary = transform_geom("EPSG:4326", source.crs, boundary)
        city_shape = shape(projected_boundary)
        mosaic, mosaic_transform = merge(
            sources,
            bounds=city_shape.bounds,
            res=abs(source.transform.a),
            nodata=0,
        )
        with MemoryFile() as memory_file:
            with memory_file.open(
                driver="GTiff",
                width=mosaic.shape[2],
                height=mosaic.shape[1],
                count=1,
                dtype=mosaic.dtype,
                crs=source.crs,
                transform=mosaic_transform,
                nodata=0,
            ) as mosaic_dataset:
                mosaic_dataset.write(mosaic)
                pixels, transform = mask(
                    mosaic_dataset,
                    [projected_boundary],
                    crop=True,
                    indexes=1,
                    nodata=0,
                )
        height, width = pixels.shape
        padded = np.pad(
            pixels,
            ((0, (-height) % POOL_FACTOR), (0, (-width) % POOL_FACTOR)),
        )
        pooled = padded.reshape(
            padded.shape[0] // POOL_FACTOR,
            POOL_FACTOR,
            padded.shape[1] // POOL_FACTOR,
            POOL_FACTOR,
        ).max(axis=(1, 3))
        classes = np.select(
            [
                pooled < MINIMUM_HEIGHT_METERS,
                pooled < 6,
                pooled < 10,
                pooled < 15,
                pooled < 20,
            ],
            [0, 5, 8, 13, 18],
            default=24,
        ).astype(np.uint8)
        grid_transform = transform * Affine.scale(POOL_FACTOR, POOL_FACTOR)

        for geometry, height_meters in shapes(
            classes,
            mask=classes > 0,
            transform=grid_transform,
            connectivity=8,
        ):
            patch = shape(geometry).simplify(
                abs(grid_transform.a) / 2,
                preserve_topology=True,
            )
            patch = patch.intersection(city_shape)
            if patch.is_empty or patch.area < abs(grid_transform.a * grid_transform.e):
                continue

            canopy_features.append(
                {
                    "type": "Feature",
                    "id": len(canopy_features),
                    "properties": {"height_m": int(height_meters)},
                    "geometry": transform_geom(
                        source.crs,
                        "EPSG:4326",
                        mapping(patch),
                        precision=6,
                    ),
                }
            )

        document = {
            "type": "FeatureCollection",
            "name": "Trece Martires canopy patches",
            "source": "Meta and WRI Canopy Height Maps v2",
            "sourceUrl": f"{SOURCE_PREFIX}/chm/",
            "sourceMetadataUrl": f"{SOURCE_PREFIX}/metadata/",
            "sourceTileQuadkeys": tile_keys,
            "sourceGridMeters": abs(source.transform.a),
            "outputGridMeters": abs(grid_transform.a),
            "minimumCanopyHeightMeters": MINIMUM_HEIGHT_METERS,
            "observationDates": OBSERVATION_DATES,
            "retrievedOn": datetime.now(timezone.utc).date().isoformat(),
            "license": "CC-BY-4.0",
            "features": canopy_features,
        }
    finally:
        for source in sources:
            source.close()

    with gzip.open(OUTPUT_PATH, "wt", encoding="utf-8", compresslevel=9) as output:
        json.dump(document, output, separators=(",", ":"))

    print(f"Wrote {len(canopy_features)} canopy patches to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
