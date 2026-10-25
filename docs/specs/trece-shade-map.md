# Trece Shade Map

## Problem

Residents need a Trece Martires map that shows when streets are shaded and, later, how much shade a walking route is likely to have. BetterTrece currently has Leaflet raster maps, but not a 3D map or pedestrian routing.

## Agreed solution

Create a dedicated **Shade Map** page for Trece Martires, using MapLibre with a keyless public vector basemap. Deliver it in two stages:

1. **3D shade view:** Show 3D building forms and estimated shadows from buildings and tree canopy. Default to current Philippine local time on today's date and provide a time slider. Add date selection later.
2. **Walking routes:** Let people set start and destination by tapping the map or searching a citywide OpenStreetMap places snapshot by name or category, with optional GPS for the start. Compare the shortest connected route with a longer route that prefers modeled shade at the selected time. Show shade and exposed segments and each route's estimated shaded share. Route points and calculations stay in the browser.

Shade is context and does not change route selection. The local place directory includes named OSM features tagged as amenities, shops, leisure, tourism, sport, healthcare, crafts, offices, historic places, or public transport. Search accepts names and categories such as cafes, malls, resorts, gyms, and shops. It reflects mapped data only and cannot guarantee every active business is listed or current. It is generated from OpenStreetMap's read-only map API, its retrieval date is shown in the UI, and ODbL attribution is linked. There is no address geocoder. The public basemap provider receives ordinary tile requests, including the viewer's IP address and viewed map area.

For initial camera framing, reuse BetterTrece's existing Trece center (`14.2828, 120.8667`), zoom 13, and current weather-map view box (`120.8200, 14.2500` to `120.9100, 14.3200`). These are map-view coordinates, not a city-limit polygon or routing boundary.

## Data and claims

- The Google Research Open Buildings 2.5D Temporal 2023 raster supplies estimated building presence and heights for the 3D polygons and shadows. The layer is downsampled to its stated 4 m effective resolution, quantized to 4 m height steps, and clipped to the OSM display outline; isolated patches under 32 m² are omitted. Its published height accuracy evaluation did not include the Philippines; footprints can shift or be missed. OpenMapTiles building heights are only a fallback if the prepared 2023 layer cannot load.
- Use the public Meta/WRI Canopy Height Maps v2 (CHMv2) for estimated canopy height. Its CC BY 4.0 GeoTIFFs and imagery-date metadata are on the AWS Open Data Registry; the Trece extract is aggregated to roughly 6 m canopy patches for browser rendering. Local imagery spans 2010, 2014, and 2018; these are not individual-tree measurements or current field surveys.
- 3D shapes and shade are estimates, not surveyed building/tree models. Publish source dates, coverage gaps, and uncertainty in the UI. Do not imply cloud cover, weather, air temperature, thermal comfort, or safety is modeled.
- Google's published 1.5 m building-height mean absolute error was evaluated in North America, Europe, and Japan, not the Philippines; it is not a local accuracy guarantee.
- Use sun position computed locally for the selected date/time; no sun-position service is needed.
- The public vector basemap is a provider dependency; keep attribution visible and recheck its current service terms/availability before release.

## Route geometry and limits

The user approved using the existing OpenStreetMap administrative outline (relation 1491128) for current route eligibility, with a prominent disclosure that it is community-mapped and not City-approved. Route endpoints and sampled path edges must remain inside that outline. It must never be presented as an official legal boundary.

Walking routes come from the currently loaded OpenMapTiles `transportation` source layer. This is a local snapshot of mapped streets and paths, not a complete routing graph. Missing tiles, sidewalks, crossings, access tags, or closures can change the result. The client excludes explicit private/no-access ways and motorway/trunk classes, then connects endpoints to nearby boundary-safe mapped nodes within 120 m and finds the shortest connected path. Considering nearby nodes avoids rejecting a route just because the single closest node is isolated. Shade is sampled along the route at 20 m intervals from the modeled shadows at the selected time. It is not measured shade or a safety guarantee.

The fullscreen planner includes a featured Thirteen Martyrs of Cavite Monument destination. Its name is supported by the City Government's cultural-mapping project; its point uses OSM node 8280402597 and remains inside the disclosed community-mapped boundary. Typing part of that name also surfaces the featured option.

## Acceptance criteria

- `/shade-map` is available from site navigation in English and Filipino and has a responsive, accessible map interface.
- Stage 1 displays a MapLibre map visually masked to the disclosed OSM boundary, 3D buildings, estimated building and tree-canopy shadows, current Philippine local date/time, and a time slider for today. It reports visible height coverage and discloses uncertainty and source age.
- The UI identifies shade as modeled, attributes its open map sources, dates the downloaded OSM display geometry and canopy imagery, and marks building-height coverage gaps and uncertainty.
- Stage 2 accepts citywide OSM place-name/category search and map-tap endpoints plus optional user-triggered GPS, automatically compares shortest and more-shaded connected routes when both endpoints are set, renders shaded/exposed segments and each route's estimated shaded-distance percentage for the selected time, and animates the selected route in the pitched 3D view focused on point A.
- Start, destination, and calculated route are not sent to BetterTrece or a geocoding/routing service. Only public basemap tile requests leave the browser; those can expose IP and viewed area to that provider.
- The OSM outline is disclosed as non-official; endpoints, route edges, and GPS start are rejected outside it. Explicit private/no-access and motorway/trunk ways are excluded.
- If building, tree-canopy, place, or walking-network data is absent, the page reports the gap instead of inventing coverage. Place search states that business coverage may be incomplete or outdated.

## Verification seams

User-approved seams:

- Deterministic sun/shadow estimation behavior using known geometry and sun-angle fixtures.
- Shortest connected mapped route, access and boundary exclusions, and sampled shade distance using synthetic graph fixtures.
- Manual browser checks for fullscreen, local search, map-tap endpoints, opt-in geolocation, boundary enforcement, keyboard/accessibility basics, and responsive layouts.

The repository has no configured browser-test setup. The sun/shadow and walking-route behavior checks use Node's built-in test runner without adding a dependency. Manual browser checks cover fullscreen, landmark and loaded-map autocomplete, a route between a loaded map place and the featured landmark, and Esc to close fullscreen. Geolocation and rejection of an outside-boundary point were not exercised in the browser.

## Implementation status

- Implemented the pure local sun-position and building-shadow geometry calculations in `src/lib/sunPosition.ts`, with deterministic fixtures in `tests/sunPosition.test.ts`.
- Stage 1 provides a responsive MapLibre page at `/shade-map`, 3D map buildings, local sun/time controls, and estimated building/canopy shadows. The prepared 2023 building asset has 29,772 patches. The browser models up to 5,000 visible features per layer (10,000 total) per refresh and shows modeled/visible counts; the cap keeps browser work bounded, so a share of visible buildings and canopy patches may not cast a modeled shadow at once.
- The user approved the OSM outline for route eligibility after the earlier boundary gate was written. The page labels it community-mapped and not City-approved; the geometry contains routes and endpoints but does not prove the legal city boundary.
- OSM Trece Martires relation 1491128 is stored as `public/data/trece-boundary-osm.geojson` with ODbL attribution and retrieval date; its geometry is not City-approved.
- `scripts/prepare-trece-canopy.py` extracts the public Meta/WRI CHMv2 tiles intersecting Trece, pools the 1.19 m source to a roughly 6 m grid, and writes a compressed CC BY 4.0 canopy-patch layer at `public/data/trece-canopy-6m.geojson.gz`. It excludes canopy below 3 m and patches smaller than one output grid cell.
- `scripts/prepare-trece-buildings.py` downloads the intersecting 2023 tiles from Google's anonymous public bucket and writes 4 m, CC BY 4.0 building-height patches at `public/data/trece-buildings-google-2023.geojson.gz`. The generated layer currently contains 29,772 patches across eight source tiles; no Google account is used or needed by the script.
- Fullscreen A/B planning searches a locally served citywide OSM places snapshot by name and category, combines results with currently loaded map features, and includes a featured Thirteen Martyrs Monument destination. Map taps, optional GPS, route calculations, and shade segment rendering run in the browser. Routes use the locally served OSM walking-network snapshot rather than only roads in visible map tiles. Place, road, and shade coverage can be incomplete; disconnected streets and venues far from mapped paths may not produce a route. The snapshot cannot include businesses missing from OpenStreetMap.
- Route choices compare the shortest path with a more-shaded path that penalizes exposed mapped road segments using modeled shade for the selected time. The selected option animates into the pitched 3D view and flies closer to point A with the camera bearing along the route. The shade preference is an estimate and not a safety guarantee.
- `scripts/prepare-trece-places.mjs` fetches named OSM nodes, ways, and relations and highway ways inside the city boundary box, splits requests when the OSM API's 50,000-node limit is reached, and writes `public/data/trece-places-osm.json` plus compressed `public/data/trece-walking-network-osm.geojson.gz`. The app filters results and route geometry against the displayed boundary. The current snapshot contains 571 named entries in the bounding box; 499 fall inside the current displayed OSM geometry, including 15 tagged cafes, 3 malls, 2 resorts, 7 fitness/sports centers, and 136 shops. These are mapped-feature counts, not a complete business census.
- Manual browser review confirmed the desktop map and controls, English/Filipino navigation and page text, daytime time-slider updates, canopy/shadow coverage disclosure, and responsive layout at a 390 px viewport. Earlier, a loaded-tile `Trece Martires` search routed to the featured monument (about 375 m) and Esc closed fullscreen. Browser review does not validate measured local building heights, current tree cover, legal boundaries, current business status, or route completeness. Geolocation and outside-boundary rejection were not browser-tested.
- Local verification for the route work: `node --test tests/*.test.ts`, focused ESLint/Prettier checks, `npm run build`, `npm run lint`, and `git diff --check`. The production build still warns about the existing large application bundle and the separate MapLibre page chunk.

## Out of scope

- Other cities, shade-optimized routing, address search/geocoding, traffic, weather/clouds, measured air temperature, heat-health advice, offline maps, accounts, and sending route data to a server.
- Migrating existing Leaflet maps, including the fuel station map.
- Exact photogrammetric building/tree models or claims that the route is guaranteed shaded.

## Sources checked

- [MapLibre 3D building example](https://maplibre.org/maplibre-gl-js/docs/examples/display-buildings-in-3d/)
- [OpenFreeMap](https://openfreemap.org/)
- [OpenFreeMap quick start and keyless Liberty style](https://openfreemap.org/quick_start/)
- [OSM Trece Martires administrative relation 1491128](https://www.openstreetmap.org/relation/1491128) (display mask only; retrieved 2026-10-25 under ODbL)
- [OpenStreetMap read-only map API](https://api.openstreetmap.org/api/0.6/map) (named place snapshot; ODbL 1.0)
- [Meta and WRI Canopy Height Maps v2 announcement](https://ai.meta.com/blog/world-resources-institute-dino-canopy-height-maps-v2/)
- [Meta and WRI CHMv2 AWS Open Data Registry](https://registry.opendata.aws/dataforgood-fb-forestsv2/) (CC BY 4.0; source includes GeoTIFFs and imagery-date metadata)
- [Google Research Open Buildings 2.5D Temporal](https://sites.research.google/gr/open-buildings/temporal/) and [Google Earth Engine catalog](https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_Research_open-buildings-temporal_v1) (2023 height/presence estimates; CC BY 4.0 or ODbL; source evaluation and spatial-shift caveats)
- [Meta/WRI canopy-height release](https://sustainability.atmeta.com/blog/2024/04/22/using-artificial-intelligence-to-map-the-earths-forests/)
- [Trece Martires City profile and map](https://trecemartirescity.gov.ph/profile/)
- [Trece Martires EO No. 122 territorial description](https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/5/74465)
- [Trece Martires RA No. 1912 boundary amendment](https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/10485)
- [Trece Martires City Cultural Mapping project (official City document)](https://trecemartirescity.gov.ph/wp-content/uploads/forminator/26383_5001ac8bba8cc816bca27a0501c4cad9/uploads/HeY9LhB2QAD4-09182024-Technical-Services-Fee-for-Trece-Martires-City-Cultural-Mapping.docx.pdf) (names Bantayog ng Labintatlong Martir among cultural properties)
- [OSM Thirteen Martyrs of Cavite node 8280402597](https://www.openstreetmap.org/node/8280402597) (name and point used by the featured destination; retrieved 2026-10-25)
- [City Planning Office contact listing](https://trecemartirescity.gov.ph/wp-content/uploads/2025/03/CITIZENS-CHARTER-2025_compressed.pdf)
- [Current Citizen Charter listing](https://trecemartirescity.gov.ph/citizen-charter/)

Regenerate the Trece canopy layer with Python plus `numpy`, `rasterio`, and `shapely` installed, then run `python scripts/prepare-trece-canopy.py`. Build the Google Open Buildings layer with `numpy`, `rasterio`, `shapely`, `s2sphere`, and `google-cloud-storage`; the script uses anonymous public bucket access and no Google account. Run `python scripts/prepare-trece-buildings.py --self-check` to verify its height-threshold conversion without network access, or `python scripts/prepare-trece-buildings.py` to download and prepare the Trece extract. These packages are build-time only; the static site does not need Python at runtime.
