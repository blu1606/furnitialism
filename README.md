# Web 3D Furniture Catalog

A high-end, interactive 3D furniture catalog built with React Three Fiber, showcasing modular furniture in immersive digital twin environments.

## Features
- **Immersive 3D Scenes**: Toggle between different room environments (Kitchen, Living Room, Simple Modern Living Room).
- **Interactive Catalog**: Hover and select furniture items to see details, pricing, and 3D highlights.
- **AI-Powered Integration**:
    - **AI Search/Scanning**: Simulated AI analysis of 3D models to locate furniture.
    - **AI Chat**: Context-aware assistant for furniture selection and interior design.
    - **AI Forge**: Mockup of image-to-3D reconstruction technology.
- **Seamless E-commerce Flow**: Add items to cart with 3D animation, manage selections, and proceed to checkout.
- **Glassmorphism UI**: Modern, sleek interface with blur effects and clean typography.
- **Developer Tools**: Real-time camera tracker HUD for scene composition.

## Tech Stack
- **Frontend**: React 18
- **3D Engine**: React Three Fiber (R3F)
- **3D Utilities**: @react-three/drei
- **State Management**: Zustand
- **Post-processing**: @react-three/postprocessing (N8AO, Outline, TiltShift, ToneMapping)
- **Styling**: CSS (Modern layout, Glassmorphism)
- **Workflow**: ClaudeKit (Agentic development)

## Getting Started
1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Build for production: `npm run build`

## Project Structure
- `src/`: Core logic and R3F components.
- `public/`: 3D models (.glb), textures, and static assets.
- `docs/`: Technical documentation and architecture guides.
- `plans/`: Implementation plans and progress reports.
- `agy-ck/`: ClaudeKit agent configurations and workflows.
