import { useState, useCallback } from "react"
import { debounce } from "lodash"
import { useGLTF, useEnvironment, Text } from "@react-three/drei"
import { Select } from "@react-three/postprocessing"
import { Price } from "./Price"
import { useStore, FURNITURE_DATA } from "./store"

export function SimpleLivingRoom(props) {
  const setSelected = useStore((state) => state.setSelected)
  const { nodes, materials } = useGLTF("/simple_modern_living_room.glb")

  const [hovered, hover] = useState(null)
  const debouncedHover = useCallback(debounce(hover, 30), [])
  const over = (name) => (e) => (e.stopPropagation(), debouncedHover(name))
  const select = (name) => (e) => (e.stopPropagation(), setSelected(name))

  const price = FURNITURE_DATA[hovered]?.price ?? 0

  return (
    <>
      <group {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={1}>
            {/* Environmental Meshes */}
            <mesh geometry={nodes['Modern Living Room_Walls_0'].geometry} material={materials.Walls} />
            <mesh geometry={nodes['Modern Living Room_Planks_0'].geometry} material={materials.Planks} />
            <mesh geometry={nodes['Modern Living Room_Floor_0'].geometry} material={materials.Floor} />
            <mesh geometry={nodes['Modern Living Room_Window_0'].geometry} material={materials.Window} />
            <mesh geometry={nodes['Modern Living Room_Door_0'].geometry} material={materials.Door} />
            <mesh geometry={nodes['Modern Living Room_Backdrop_0'].geometry} material={materials.Backdrop} />
            <mesh geometry={nodes['Modern Living Room_Lights_0'].geometry} material={materials.Lights} />

            {/* Interactive Items */}
            <Select enabled={hovered === "MODERN_SOFA"} onPointerOver={over("MODERN_SOFA")} onPointerOut={() => debouncedHover(null)} onClick={select("MODERN_SOFA")}>
              <mesh geometry={nodes['Modern Living Room_Sofa_0'].geometry} material={materials.Sofa} />
            </Select>

            <Select enabled={hovered === "MODERN_COFFEE_TABLE"} onPointerOver={over("MODERN_COFFEE_TABLE")} onPointerOut={() => debouncedHover(null)} onClick={select("MODERN_COFFEE_TABLE")}>
              <mesh geometry={nodes['Modern Living Room_CoffeeTable_0'].geometry} material={materials.CoffeeTable} />
            </Select>

            <Select enabled={hovered === "MODERN_END_TABLE"} onPointerOver={over("MODERN_END_TABLE")} onPointerOut={() => debouncedHover(null)} onClick={select("MODERN_END_TABLE")}>
              <mesh geometry={nodes['Modern Living Room_EndTable_0'].geometry} material={materials.EndTable} />
            </Select>

            <Select enabled={hovered === "MODERN_CARPET"} onPointerOver={over("MODERN_CARPET")} onPointerOut={() => debouncedHover(null)} onClick={select("MODERN_CARPET")}>
              <mesh geometry={nodes['Modern Living Room_Carpet_0'].geometry} material={materials.Carpet} />
            </Select>

            <Select enabled={hovered === "MODERN_POT"} onPointerOver={over("MODERN_POT")} onPointerOut={() => debouncedHover(null)} onClick={select("MODERN_POT")}>
              <mesh geometry={nodes['Modern Living Room_Pot_0'].geometry} material={materials.Pot} />
              <mesh geometry={nodes['Modern Living Room_Pebbles_0'].geometry} material={materials.Pebbles} />
              <mesh geometry={nodes['Modern Living Room_Leaves_0'].geometry} material={materials.Leaves} />
              <mesh geometry={nodes['Modern Living Room_Bark_0'].geometry} material={materials.Bark} />
            </Select>

            <Select enabled={hovered === "MODERN_PAINTING"} onPointerOver={over("MODERN_PAINTING")} onPointerOut={() => debouncedHover(null)} onClick={select("MODERN_PAINTING")}>
              <mesh geometry={nodes['Modern Living Room_Painting_0'].geometry} material={materials.Painting} />
              <mesh geometry={nodes['Modern Living Room_Frame_0'].geometry} material={materials.Frame} />
            </Select>

            <Select enabled={hovered === "MODERN_TV"} onPointerOver={over("MODERN_TV")} onPointerOut={() => debouncedHover(null)} onClick={select("MODERN_TV")}>
              <mesh geometry={nodes['Modern Living Room_TVScreen_0'].geometry} material={materials.TVScreen} />
            </Select>
        </group>
      </group>
      <Text position={[0, 2.5, -2]} color="black" fontSize={0.2} font="Inter-Regular.woff" letterSpacing={-0.05}>
        {hovered ? FURNITURE_DATA[hovered].name : "MODERN LIVING ROOM"}
      </Text>
      <Price value={price} position={[1, 0.5, -2]} scale={0.8} maskHeight={1.4} step={3} />
    </>
  )
}

useGLTF.preload('/simple_modern_living_room.glb')
