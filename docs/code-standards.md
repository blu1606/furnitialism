# Code Standards: Smart 3D Interior

## Core Principles
- **KISS (Keep It Simple, Stupid):** Prioritize readable, straightforward logic over complex abstractions.
- **DRY (Don't Repeat Yourself):** Extract common patterns into reusable hooks and components.
- **YAGNI (You Aren't Gonna Need It):** Avoid over-engineering features before they are required.

## React & R3F Guidelines
- **Functional Components:** Use functional components with hooks (React 18+ patterns).
- **R3F Performance:**
  - Wrap interactive meshes in `<Select />` for post-processing selection effects.
  - Use `useGLTF` with `transformed` flag for optimized loading.
  - Implement `Bvh` for complex geometry to ensure high-performance raycasting.
  - Use `maath/easing` for smooth, frame-loop based animations rather than heavy state updates.
- **State Management:**
  - **Zustand:** Use for all global application states (Cart, Navigation, AI state).
  - **Local State:** Use `useState` only for transient, component-specific UI states.
  - **Ref-based State:** Use `useRef` for high-frequency 3D values (rotations, positions) updated in `useFrame`.

## Directory & File Naming
- **Filenames:** Use kebab-case for all files (e.g., `furniture-item.js`, `store.js`).
- **Directories:** Use meaningful, lowercase directory names.
- **Components:** Export components with PascalCase names matching the filename's logical intent.

## Coding Style
- **TypeScript:** Strict mode enabled. Define interfaces/types for all store states and component props.
- **No `any`:** Use specific types or `unknown` where types are truly dynamic.
- **ASCII Only:** No emojis in code, comments, or terminal logs.
- **Naming:**
  - Variables/Functions: `camelCase`.
  - Constants: `UPPER_SNAKE_CASE`.
  - Interfaces/Types: `PascalCase` (prefixed with `I` or `T` if required by team style).

## Git & Workflow
- **Conventional Commits:** Use standard prefixes:
  - `feat:` (new features)
  - `fix:` (bug fixes)
  - `docs:` (documentation changes)
  - `refactor:` (code restructuring)
  - `chore:` (dependency updates, build changes)
- **Small Commits:** Commit often and keep each commit focused on a single logical change.
- **Validation:** Ensure `npm run lint` and `npm test` pass before pushing.
