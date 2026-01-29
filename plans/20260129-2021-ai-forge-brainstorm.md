# Brainstorm Report: AI Image-to-3D Workflow

## Problem Statement
The user wants to implement a feature where they can upload an image (e.g., a photo of a piece of furniture) and have an AI convert it into a 3D GLB model that can be viewed in the R3F scene. For the current scope, we will **mock** this process using a pre-existing GLB file while simulating the AI processing steps.

## Technical Research: Image-to-3D Reality (2025)
Based on current AI standards (TripoSR, Meshy, Hunyuan3D-V2, Rodin):

### 1. Direct Conversion (Single Image)
- **Input**: 1 high-resolution image (1024x1024+).
- **Pros**: Low friction for the user.
- **Cons**: "Hallucinated" back-side geometry (AI guesses what the back looks like).
- **Processing Time**: 30 seconds - 2 minutes (Cloud API).

### 2. Multi-View Reconstruction
- **Input**: 3-6 images from different angles (Front, Side, Back).
- **Pros**: Much higher topology accuracy and texture consistency.
- **Cons**: High user friction (hard to take perfect photos).

### 3. Requirements for "Production Ready" Output
- **Background Removal**: Essential for clean edge detection.
- **Denoising**: AI models struggle with grainy low-light photos.
- **Format**: GLB is preferred for web-based AR and R3F due to self-containment.

---

## Proposed Mock Implementation Plan

### Phase 1: UI/UX (The "Magic" Experience)
1. **Trigger**: An "AI Laboratory" button in the `CoreHub` or an "Upload" button in `AIChat`.
2. **Uploading UI**: A sleek drag-and-drop zone with glassmorphism styling.
3. **Processing Simulation**:
   - Step 1: "Removing Background..."
   - Step 2: "Generating Point Cloud..."
   - Step 3: "Reconstructing Mesh (Splatting)..."
   - Step 4: "Baking Textures & Exporting GLB..."
4. **Visual Feedback**: A terminal-like status log or a circular progress ring with gold/cyan accents.

### Phase 2: Mock Logic
1. **FileUpload Simulation**: When a user selects a file, we trigger a loading state for ~5-8 seconds.
2. **Result Visualization**: After "processing", we inject the pre-existing `chair.glb` (or similar) into the `ObjectViewer` or spawn it directly in the room.

## Next Steps
- [ ] Create a dedicated `AIForge.js` component for the upload interface.
- [ ] Integrate the forge trigger into the `CoreHub`.
- [ ] Implement the "Processing" micro-animations using Framer Motion or vanilla CSS.
- [ ] Hook the success state to the existing `ObjectViewer`.

---
**Next Actions**:
- Create the implementation plan in `./plans/20260129-2021-ai-forge-mockup.md`.
- Implement the `AIForge` UI.
