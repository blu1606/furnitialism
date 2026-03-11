import { useState, useCallback } from "react"
import { debounce } from "lodash"
import { useGLTF, useEnvironment, Text } from "@react-three/drei"
import { Select } from "@react-three/postprocessing"
import { Price } from "./Price"
import { useStore } from "./store"

export function LivingRoom(props) {
  const setSelected = useStore((state) => state.setSelected)
  const { nodes, materials } = useGLTF("/white_modern_living_room-transformed.glb")
  const env = useEnvironment({ preset: "city" })

  const [hovered, hover] = useState(null)
  const debouncedHover = useCallback(debounce(hover, 30), [])
  const over = (name) => (e) => (e.stopPropagation(), debouncedHover(name))
  const select = (name) => (e) => (e.stopPropagation(), setSelected(name))

  const price = {
    COFFEE_TABLE: 499,
    SOFA: 2499,
    LAMP: 199,
    TV: 1299,
    ABSTRACT_ART: 350,
    CARPET: 850,
    PLANT: 89
  }[hovered] ?? 0

  return (
    <>
      <group {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.228}>
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <mesh geometry={nodes.Structure_Structure_0.geometry} material={materials.Structure} position={[0, 800, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1174.8, 1076.9, 890]} />
            <mesh geometry={nodes.Windows_Windows_0.geometry} material={materials.Windows} position={[0, 800, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1174.8, 1076.9, 890]} />
            <mesh geometry={nodes.Pillows_Pillows_0.geometry} material={materials.Pillows} position={[-806.334, 147.046, 762.713]} rotation={[-Math.PI / 2, 1.396, 0]} scale={[80.676, 100, 99.456]} />

            <Select enabled={hovered === "COFFEE_TABLE"} onPointerOver={over("COFFEE_TABLE")} onPointerOut={() => debouncedHover(null)} onClick={select("COFFEE_TABLE")}>
              <mesh geometry={nodes.CoffeeTable_CoffeeTable_0.geometry} material={materials.CoffeeTable} position={[-100, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
            </Select>

            <Select enabled={hovered === "SOFA"} onPointerOver={over("SOFA")} onPointerOut={() => debouncedHover(null)} onClick={select("SOFA")}>
              <mesh geometry={nodes.Sofa_Sofa_0.geometry} material={materials.Sofa} position={[-900, -29.159, 847.786]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
            </Select>

            <Select enabled={hovered === "LAMP"} onPointerOver={over("LAMP")} onPointerOut={() => debouncedHover(null)} onClick={select("LAMP")}>
              <mesh geometry={nodes.Lamp_Lamp_0.geometry} material={materials.Lamp} position={[-900, 0, -900]} rotation={[-Math.PI / 2, 0, -Math.PI / 9]} scale={100} />
            </Select>

            <Select enabled={hovered === "TV"} onPointerOver={over("TV")} onPointerOut={() => debouncedHover(null)} onClick={select("TV")}>
              <mesh geometry={nodes.TVStand_TVStand_0.geometry} material={materials.TVStand} position={[200, 0, -1075.35]} rotation={[-Math.PI / 2, 0, 0]} scale={[470, 110, 100]} />
              <mesh geometry={nodes.TV_TV_0.geometry} material={materials.material} position={[200, 600, -1094.671]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[-450, 25, 250]} />
            </Select>

            <Select enabled={hovered === "ABSTRACT_ART"} onPointerOver={over("ABSTRACT_ART")} onPointerOut={() => debouncedHover(null)} onClick={select("ABSTRACT_ART")}>
              <mesh geometry={nodes.PictureFrame_Material_0.geometry} material={materials.Material} position={[-1216.286, 802.721, 480]} rotation={[-Math.PI / 2, -0.175, 0]} scale={60} />
              <mesh geometry={nodes.AbstractArt_AbstractArt_0.geometry} material={materials.AbstractArt} position={[-1334.376, 660, 10]} rotation={[-Math.PI / 2, 0, 0]} scale={[170, 170, 272]} />
            </Select>

            <Select enabled={hovered === "PLANT"} onPointerOver={over("PLANT")} onPointerOut={() => debouncedHover(null)} onClick={select("PLANT")}>
              <mesh geometry={nodes.Plant__0.geometry} material={materials.Plant__0} position={[-1136.271, 634.511, 698.702]} rotation={[-Math.PI / 2, 0, 0]} scale={26.88} />
            </Select>
          </group>
        </group>
      </group>
      <Text position={[1.5, 1, 1.2]} color="black" fontSize={0.2} letterSpacing={-0.05}>
        {hovered ? hovered.replace('_', ' ') : "LIVING ROOM"}
      </Text>
      <Price value={price} position={[-1, 0.25, -3]} scale={0.8} maskHeight={1.4} step={3} />
    </>
  )
}

useGLTF.preload('/white_modern_living_room-transformed.glb')
