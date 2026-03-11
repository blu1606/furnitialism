# Codebase Summary

## Overview
The project is a React-based 3D web application focused on furniture cataloging and AI-assisted interior design. It leverages React Three Fiber (R3F) for the 3D engine and Zustand for state management.

## Core Directories

### `src/` (Source Code)
- **`App.js`**: Main entry point, manages high-level UI overlays and the R3F `Canvas`.
- **`store.js`**: Central Zustand store managing UI state, cart, selected objects, and `FURNITURE_DATA`.
- **`Scene.js`**: Orchestrates the 3D scene, switching between room components based on store state.
- **Room Components**:
    - `Kitchen.js`: Modular kitchen scene with interactive elements.
    - `LivingRoom.js`: Living room scene (implementation-heavy).
    - `SimpleModernLivingRoom.js`: A streamlined, modern room variant.
- **UI Components**:
    - `CoreHub.js`: The primary navigation and control panel.
    - `AIChat.js`: AI assistant interface.
    - `AIForge.js`: Image-to-3D workflow mockup.
    - `ObjectViewer.js`: Standalone 3D model viewer.
    - `CheckoutOverlay.js`: Multi-step checkout process.

### `public/` (Assets)
- **3D Models**: `.glb` files for rooms and furniture (e.g., `kitchen-transformed.glb`, `simple_modern_living_room.glb`).
- **Images**: Product thumbnails located in `public/images/products/`.
- **Fonts**: `Inter-Regular.woff` used for 3D and 2D text.

### `agy-ck/` (ClaudeKit)
- Contains agentic workflow configurations.
- `.agent/rules/`: Guidelines for specialized agents (planner, git-manager, etc.).
- `workflows/`: Standardized procedures for coding, testing, and documentation.

### `plans/` (Project Management)
- **Reports**: Detailed logs of implementation phases, research findings, and verification tests.
- **Brainstorms**: Architectural and feature ideation documents.

## Key Implementation Patterns
- **State-Driven Rendering**: 3D scenes and UI visibility are tightly coupled to the Zustand store.
- **Interactive R3F Mesh**: Use of `onPointerOver`, `onPointerOut`, and `onClick` on meshes within `Select` components for post-processing effects.
- **Camera Effects**: `maath/easing` for smooth camera transitions and swaying.
- **Digital Twin Logic**: 3D objects are mapped to `FURNITURE_DATA` entries via IDs (e.g., `BRÖNDEN`, `VOXLÖV`).
