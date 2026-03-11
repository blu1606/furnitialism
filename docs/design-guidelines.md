# Design Guidelines: Smart 3D Interior

## Visual Direction: Smart Glassmorphism
The aesthetic of Smart 3D Interior is defined as "Smart Glassmorphism"—a blend of high-end luxury and intelligent, digital-native design.

### UI Core Principles
- **Transparency:** Semi-transparent white backgrounds (`rgba(255, 255, 255, 0.7)`).
- **Blur:** Backdrop-filter blur ranging from `20px` to `40px` for a premium "frosted glass" feel.
- **Borders:** Ultra-thin `1px` white borders (`rgba(255, 255, 255, 0.3)`) to define edges.
- **Depth:** Soft, expansive shadows to create layering and hierarchy.

## Color Palette
- **Primary:** White / Light Gray (Base cleanliness and clarity).
- **Accent (AI):** **Electric Violet (#7C3AED)**. Used exclusively for AI highlights, scan lines, and primary CTA glows.
- **Feedback Colors:**
  - Success: Soft Mint Green.
  - Caution: Warm Amber.
  - Error: Clean Coral Red.

## Typography
- **Primary Font:** `Inter`. Modern, clean, and highly legible.
- **Hierarchies:** Strong use of weights (Bold for headers, Regular for body) to guide the eye.
- **In-Scene Text:** 3D text (Price tags) must use matching fonts (`Inter-Regular.woff`) to ensure cohesion between 2D and 3D layers.

## 3D Scene Aesthetics
- **Lighting:**
  - Soft "City" environment presets.
  - Warm localized lighting for residential vibes (Living Room).
  - Cool/Neutral lighting for modern utility (Kitchen).
  - Volumetric light rays for atmosphere.
- **Materials:** High-quality physical materials with realistic micro-roughness and environment reflections.
- **Camera Behavior:**
  - Subtle mouse-tracking sway.
  - Physics-based smooth damping for all camera transitions.

## Interaction & UX Laws
- **Occam's Razor:** Minimize UI elements; AI hides non-essential features until needed.
- **Hick's Law:** Use AI to curate selections, preventing decision paralysis.
- **Peak-End Rule:** Design high-quality "Wow" moments during AI scanning and product discovery.
- **Hybrid Animation:** Synchronized transitions that bridge 3D space and 2D UI (e.g., product orbs flying to the cart).

## Motion Design
- **Easing:** Use ease-in-out curves for all UI transitions.
- **Drift:** Objects in 3D should have a subtle, physics-based "weightless" drift to feel responsive.
- **AI Pulse:** The #7C3AED violet accent should pulse subtly during AI processing tasks.
