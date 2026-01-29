# Phase 3: UI Integration

## Context Links
- [Plan Overview](./plan.md)
- `src/CoreHub.js`

## Overview
- Priority: P2
- Status: completed
- Brief description: Update the user interface to allow switching to the new room and ensure the product collection view reflects the new items.

## Implementation Steps

1.  **Update `src/CoreHub.js`**:
    *   Add "MODERN ROOM" (or similar) to the room selection dropdown.
    *   Update the `activeRoomLabel` logic.
    *   Ensure clicking the new room sets the `room` state to `modern-living-room`.

2.  **Verify Collection View**:
    *   Ensure the `product-grid` in `App.js` correctly displays the new items from `FURNITURE_DATA`.
    *   Verify "AI Search" and "View 3D" buttons work from the collection view.

## Todo List
- [x] Add new room option to `CoreHub.js`.
- [x] Verify room switching functionality.
- [x] Final end-to-end test of the catalog system.

## Success Criteria
- Users can toggle between Kitchen, Living Room, and Modern Room via the UI.
- All new items are visible in the "COLLECTION" view.
- Room transitions are smooth and correctly handle state changes.
