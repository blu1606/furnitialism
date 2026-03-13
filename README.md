# Furnitialism: Next-Gen 3D & AR E-commerce

A high-end, interactive 3D furniture catalog showcasing modular furniture in immersive digital environments. Furnitialism redefines the e-commerce shopping experience through the power of WebGL and Augmented Reality (AR).

## 🏗 Modular Architecture (Dual-App)

The project is split into two specialized applications to maximize SEO performance and 3D rendering capabilities simultaneously:

### 1. The Gateway (`/furnitialism`)
- **Role**: Marketing Landing Page & SEO Gateway.
- **Tech Stack**: Next.js 15 (App Router), React 19, Tailwind CSS v4, TypeScript.
- **Features**: Ultra-fast load times, Server-Side Rendering (SSR), Curated aesthetic sections designed to convert traffic.

### 2. The 3D Engine (`/furnitialism-dashboard`)
- **Role**: Immersive E-commerce Dashboard & 3D Viewer.
- **Tech Stack**: Vite, React 18, React Three Fiber (R3F), Zustand, React Router.
- **Features**:
  - **Immersive 3D Scenes**: Walk through Curated Rooms (Kitchen, Living Room).
  - **Native AR Experience**: Deep-linked QR Codes to bring furniture directly into your physical space via `@google/model-viewer` (Android Scene Viewer & iOS AR Quick Look).
  - **Dynamic E-commerce Flow**: Interact with products, fly-in cart animations, and checkout overlay.
  - **AI Tooling**: AI Scene Scanner, AI Furniture Forge representation.
  - **Glassmorphism UI**: Sleek interface integrated smoothly with 3D post-processing effects (N8AO, TiltShift, ToneMapping).

## 🚀 Getting Started

Because of the dual-app architecture, you need to run both applications simultaneously for the full experience.

### Terminal 1: Next.js Landing Page (Port 3000)
```bash
cd furnitialism
npm install
npm run dev
```

### Terminal 2: Vite 3D Dashboard (Port 5173)
```bash
cd furnitialism-dashboard
npm install
npm run dev -- --host
```
*Note: The `--host` flag exposes the Vite server to your local network, enabling your mobile phone to scan QR codes and access the AR features directly.*

## 📂 Project Structure

- `furnitialism/`: Next.js marketing gateway and SEO backbone.
- `furnitialism-dashboard/`: The core 3D application, WebXR implementation, and global state management.
- `docs/`: Technical documentation, code standards, and system architecture.
- `plans/`: Implementation plans and agent workflows.

## 🤝 Development & Workflows
This project is continually evolved using advanced Agentic AI workflows (ClaudeKit/Antigravity) emphasizing semantic commits, independent repos, and strict Git conventions.
