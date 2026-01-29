# Phase 2: Scene Implementation

## Context Links
- [Plan Overview](./plan.md)
- `src/SimpleLivingRoom.js` (to be created)
- `src/Scene.js`
- `src/App.js`

## Overview
- Priority: P1
- Status: pending
- Brief description: Create the 3D scene component for the new room and integrate it into the main scene manager.

## Architecture
- `SimpleLivingRoom`: A functional component that loads the GLB, maps nodes to `Select` components for highlighting, and handles hover/click events.
- `Scene`: Orchestrates which room component to render based on the `room` state in the store.

## Related Code Files
- `src/SimpleLivingRoom.js`: Create from scratch (copy pattern from `LivingRoom.js`).
- `src/Scene.js`: Import and use `SimpleLivingRoom`.
- `src/App.js`: Adjust `Effects` for camera positioning in the new room.

## Implementation Steps

1.  **Create `src/SimpleLivingRoom.js`**:
    *   Use `useGLTF` to load `/simple_modern_living_room.glb`.
    *   Implement hover and click handlers using `Select` and `setSelected`.
    *   Map discovered nodes:
        - `Modern Living Room_Sofa_0` -> `MODERN_SOFA`
        - `Modern Living Room_CoffeeTable_0` -> `MODERN_COFFEE_TABLE`
        - `Modern Living Room_EndTable_0` -> `MODERN_END_TABLE`
        - `Modern Living Room_Carpet_0` -> `MODERN_CARPET`
        - `Modern Living Room_Pot_0` -> `MODERN_POT`
        - `Modern Living Room_Painting_0` -> `MODERN_PAINTING`
        - `Modern Living Room_TVScreen_0` -> `MODERN_TV`
    *   Add pricing logic for the hover display.

2.  **Update `src/Scene.js`**:
    *   Import `SimpleLivingRoom`.
    *   Update the conditional rendering to support `room === 'modern-living-room'`.

3.  **Update `src/App.js`**:
    *   In `Effects` component, add a new camera positioning logic for `room === 'modern-living-room'`.

## Todo List
- [ ] Create `SimpleLivingRoom.js`.
- [ ] Register `SimpleLivingRoom` in `Scene.js`.
- [ ] Implement camera damping logic for the new room in `App.js`.

## Success Criteria
- The 3D scene loads correctly when the room state is changed.
- Items highlight on hover and open the detail panel on click.
- The floating price tag displays the correct price for each item.
