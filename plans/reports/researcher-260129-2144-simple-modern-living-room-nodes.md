# Research Report: Simple Modern Living Room Mesh Nodes

## Overview
Identified mesh node names in `public/simple_modern_living_room.glb` to support standalone object viewing for the new "Modern" furniture line.

## Mesh Node Analysis
The GLB file contains 18 meshes (indices 0-17). Below is the mapping from furniture IDs to their constituent nodes.

### 1. MODERN_SOFA
- `Modern Living Room_Sofa_0` (Mesh 8)

### 2. MODERN_COFFEE_TABLE
- `Modern Living Room_CoffeeTable_0` (Mesh 11)

### 3. MODERN_END_TABLE
- `Modern Living Room_EndTable_0` (Mesh 10)

### 4. MODERN_CARPET
- `Modern Living Room_Carpet_0` (Mesh 9)

### 5. MODERN_POT (Architectural Planter)
- `Modern Living Room_Pot_0` (Mesh 12)
- `Modern Living Room_Pebbles_0` (Mesh 13)
- `Modern Living Room_Leaves_0` (Mesh 16)
- `Modern Living Room_Bark_0` (Mesh 17)

### 6. MODERN_PAINTING (Contemporary Canvas)
- `Modern Living Room_Painting_0` (Mesh 14)
- `Modern Living Room_Frame_0` (Mesh 5)

### 7. MODERN_TV (Ultra Slim 4K TV)
- `Modern Living Room_TVScreen_0` (Mesh 7)

## Environment Nodes (Not mapped to products)
- `Modern Living Room_Planks_0` (Floor planks)
- `Modern Living Room_Walls_0` (Walls)
- `Modern Living Room_Lights_0` (Light fixtures)
- `Modern Living Room_Window_0` (Window frame)
- `Modern Living Room_Floor_0` (Base floor)
- `Modern Living Room_Backdrop_0` (Likely the view outside or a wall feature)
- `Modern Living Room_Door_0` (Door)

## Implementation Notes
- Use bracket notation `nodes['Node Name']` in React Three Fiber because node names contain spaces.
- Ensure `useGLTF` is called with the correct path: `/simple_modern_living_room.glb`.

## Unresolved Questions
- Does `MODERN_TV` need a stand? The GLB doesn't have a dedicated "TV Stand" node; it might be part of the Backdrop or Wall nodes.
- Should `MODERN_PAINTING` include the frame (Node 9)? Assuming yes for a complete look.
