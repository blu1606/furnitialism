# System Architecture: Furnitialism

## High-Level Architecture
**Furnitialism** is a Single Page Application (SPA) that seamlessly integrates a high-performance 3D gaming environment with a modern E-commerce interface.

## Technology Stack
- **Frontend Framework:** React (Vite-powered)
- **3D Engine:** React Three Fiber (R3F) / Three.js
- **State Management:** Zustand (Single source of truth)
- **Animations:** Framer Motion (2D), `maath/easing` (3D)
- **Post-Processing:** `@react-three/postprocessing` (N8AO, Bloom, TiltShift)
- **AI Simulation:** Custom state machines and reactive logic for AI Assistant and AI Forge.
- **AR Implementation:** WebXR-compatible mobile AR viewer.

## Core Modules

### 1. Scene Orchestrator
- **Responsibility:** Manages the lifecycle of 3D environments.
- **Dynamic Mounting:** Loads and unloads rooms (Living Room, Kitchen) based on user navigation.
- **Global Environment:** Coordinates lighting, environment maps, and post-processing effects.

### 2. State Store (`store.js`)
- **Single Source of Truth:** Centralizes all application states.
- **Navigation:** Tracks `view` (Home/3D), `room`, and `standaloneView`.
- **Commerce:** Manages `cart` items, totals, and selection states.
- **AI State:** Controls `isScanning`, `forgeStep`, and `chatHistory`.
- **Hybrid Coordination:** Synchronizes 3D events (clicks) with 2D UI updates.

### 3. AI Services Layer
- **AI Assistant:** Processes natural language queries to trigger in-scene actions (e.g., "Show me blue sofas").
- **AI Forge:** A sequential state machine that simulates an image-to-3D reconstruction pipeline through a series of UI steps and 3D visual feedback.
- **Mesh Analysis:** Simulated "scanning" logic that interacts with the 3D scene graph.

## Data Flow
1. **Interaction:** User interacts with a 3D furniture item (e.g., clicks a Sofa).
2. **Event:** R3F event handler updates the Zustand store (`setSelected('sofa-1')`).
3. **Reactive UI:** The React UI layer detects the store change and renders the relevant detail panel.
4. **Reactive 3D:** The 3D layer adjusts (e.g., camera focus, spotlight activation) in response to the state change.
5. **Animation:** Complex animations (like adding to cart) are coordinated across both 2D and 3D layers using shared state.

## Performance Optimization
- **Asset Optimization:** Use of compressed GLTF models and `useGLTF.preload`.
- **Raycasting:** `Bvh` (Bounding Volume Hierarchy) for ultra-fast selection in complex scenes.
- **Rendering:** Frustum culling, geometry instancing, and adaptive resolution scaling.
