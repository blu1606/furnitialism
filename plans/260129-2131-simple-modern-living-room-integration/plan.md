---
title: "Simple Modern Living Room Integration"
description: "Integrate a new 3D room with interactive items into the catalog system."
status: completed
priority: P1
effort: 4h
branch: master
tags: [r3f, integration, 3d-catalog]
created: 2026-01-29
---

# Overview

This plan details the integration of the `simple_modern_living_room.glb` model into the application. It involves registering new furniture items, implementing the 3D scene component, and updating the UI to allow users to switch to this new room.

## Phases

1.  **Phase 1: Data Registration** (completed)
    *   Register new furniture items in `src/store.js`.
    *   Update `src/ObjectViewer.js` for standalone 3D viewing.
2.  **Phase 2: Scene Implementation** (pending)
    *   Create `src/SimpleLivingRoom.js`.
    *   Integrate into `src/Scene.js`.
    *   Configure interactions and highlighting.
3.  **Phase 3: UI Integration** (pending)
    *   Update `src/CoreHub.js` to include the new room.
    *   Verify room switching and camera transitions in `src/App.js`.

## Key Dependencies

- `simple_modern_living_room.glb` must be present in `/public`.
- `@react-three/fiber`, `@react-three/drei`, and `@react-three/postprocessing`.

## Success Criteria

- New room is selectable via the `CoreHub` dropdown.
- All items in the new room are interactive (hover/click).
- Standalone 3D view works for new items.
- Smooth camera transitions when switching rooms.
