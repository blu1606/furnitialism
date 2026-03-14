# Project Overview & PDR: Furnitialism

## Purpose
**Furnitialism** is an AI-powered 3D furniture e-commerce platform designed to revolutionize the online shopping experience. By merging immersive 3D visualization with intelligent design assistance, it bridges the gap between digital browsing and physical reality.

## Core Identity
- **Name:** Furnitialism
- **Core:** 3D Furniture E-commerce + AI-assisted design
- **Key USPs:** Immersive 3D viewing, Augmented Reality (AR) Preview, AI Scanning/Forge, Glassmorphism UI, Weightless UX.

## Target Audience
- **High-end Homeowners:** Seeking premium, modular furniture and spatial visualization.
- **Interior Designers:** Professional tool for visualizing furniture arrangements and lighting.
- **Retailers:** A platform to showcase high-fidelity digital twins of products.
- **Tech-savvy Consumers:** Users looking for an intelligent, frictionless design experience.

## Product Development Requirements (PDR)

### Functional Requirements
1. **Multi-Scene Environment:** Support dynamic switching between different room environments (Living Room, Kitchen, Bedroom) without page reloads.
2. **Intelligent Object Interaction:**
   - Visual highlighting (Outline) on hover.
   - Detailed information, pricing, and "Add to Cart" functionality on selection.
3. **AI-Driven Features:**
   - **AI Scanning:** Simulated real-time mesh analysis of the 3D scene.
   - **AI Assistant:** Natural language chat interface capable of selecting and manipulating objects.
   - **AI Forge:** A multi-step pipeline for reconstructing 3D models from user-uploaded images.
4. **Augmented Reality (AR):**
   - QR code generation for mobile AR viewing.
   - Mobile-optimized AR viewer for placing furniture in physical spaces.
5. **Interactive Shopping Cart:**
   - Persistent state management via Zustand.
   - Hybrid 2D/3D animations (e.g., "Cart Orb" flying from 3D space to UI icon).
6. **Dynamic 3D Hub:** Centralized navigation for room switching, view toggling (3D vs Grid), and tool access.

### Non-Functional Requirements
1. **Performance & Optimization:**
   - Target 60FPS for 3D interactions.
   - Use `Bvh` for optimized raycasting and `useGLTF` for efficient asset loading.
2. **Visual Aesthetics:**
   - Consistent **Glassmorphism** UI theme (#7C3AED violet accent).
   - High-fidelity lighting (AO, Tilt-shift, Tone Mapping) and volumetric effects.
3. **User Experience (Weightless UX):**
   - Application of UX laws (Occam's Razor, Hick's Law, Peak-End Rule) to minimize cognitive load.
   - Smooth camera sway and physics-based drift for an "alive" feel.

## Key Features
- **3D Digital Twins:** Photorealistic, interactive models of furniture.
- **Interactive Price Tags:** Floating 3D text showing real-time pricing within the scene.
- **Neural Rendering Mockups:** Custom shaders for realistic materials and AI-driven glows.
- **AI-Curated Selection:** Intelligent filtering to eliminate decision paralysis.
