# Phase 1: Data Registration

## Context Links
- [Plan Overview](./plan.md)
- `src/store.js`
- `src/ObjectViewer.js`

## Overview
- Priority: P1
- Status: completed
- Brief description: Register the new furniture items from `simple_modern_living_room.glb` so they can be managed by the application's state and catalog.

## Functional Requirements
- Define unique IDs for all new furniture items.
- Populate `FURNITURE_DATA` with item metadata (name, price, etc.).
- Enable standalone 3D viewing for these items.

## Related Code Files
- `src/store.js`: Add entries to `FURNITURE_DATA`.
- `src/ObjectViewer.js`: Update `Model` component and `nodeMapping`.

## Implementation Steps

1.  **Update `src/store.js`**:
    *   Add the following items to `FURNITURE_DATA`:
        - `MODERN_SOFA`: "Modern Minimalist Sofa", $1,899
        - `MODERN_COFFEE_TABLE`: "Sleek Coffee Table", $450
        - `MODERN_END_TABLE`: "Minimal End Table", $220
        - `MODERN_CARPET`: "Geometric Area Rug", $350
        - `MODERN_POT`: "Architectural Planter", $120
        - `MODERN_PAINTING`: "Contemporary Canvas", $280
        - `MODERN_TV`: "Ultra Slim 4K TV", $1,100

2.  **Update `src/ObjectViewer.js`**:
    *   Modify the `glbPath` logic to include the new room's items.
    *   Update `nodeMapping` to map the new IDs to the corresponding meshes from `simple_modern_living_room.glb`.

## Todo List
- [x] Add new items to `FURNITURE_DATA` in `src/store.js`.
- [x] Add GLB path logic for new items in `ObjectViewer.js`.
- [x] Map nodes for new items in `ObjectViewer.js`.

## Success Criteria
- `FURNITURE_DATA` contains all 7 new items.
- Selecting a new item and clicking "View 3D" opens the `ObjectViewer` with the correct model.
