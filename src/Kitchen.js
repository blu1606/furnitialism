import { useState, useCallback } from "react"
import { debounce } from "lodash"
import { useGLTF, useEnvironment, Text } from "@react-three/drei"
import { Select } from "@react-three/postprocessing"
import { Price } from "./Price"
import { useStore } from "./store"

export function Kitchen(props) {
  const setSelected = useStore((state) => state.setSelected)
  // Load model
  const { nodes, materials } = useGLTF("/kitchen-transformed.glb")
  // Load environment
  const env = useEnvironment({ preset: "city" })
  // Hover state
  const [hovered, hover] = useState(null)
  // Debounce hover a bit
  const debouncedHover = useCallback(debounce(hover, 30), [])
  const over = (name) => (e) => (e.stopPropagation(), debouncedHover(name))

  // Click handler
  const select = (name) => (e) => (e.stopPropagation(), setSelected(name))

  // Get the priced item
  const price = { KNOXHULT: 5999, BRÖNDEN: 433, SKAFTET: 77, FANBYN: 255, VOXLÖV: 1699, LIVSVERK: 44 }[hovered] ?? 5999

  return (
    <>
      <group {...props}>
        <mesh geometry={nodes.vase1.geometry} material={materials.gray} material-envMap={env} />
        <mesh geometry={nodes.bottle.geometry} material={materials.gray} material-envMap={env} />
        <mesh geometry={nodes.walls_1.geometry} material={materials.floor} />
        <mesh geometry={nodes.walls_2.geometry} material={materials.walls} />
        <mesh geometry={nodes.plant_1.geometry} material={materials.potted_plant_01_leaves} />
        <mesh geometry={nodes.plant_2.geometry} material={materials.potted_plant_01_pot} />
        <mesh geometry={nodes.cuttingboard.geometry} material={materials.walls} />
        <mesh geometry={nodes.bowl.geometry} material={materials.walls} />
        <Select enabled={hovered === "BRÖNDEN"} onPointerOver={over("BRÖNDEN")} onPointerOut={() => debouncedHover(null)} onClick={select("BRÖNDEN")}>
          <mesh geometry={nodes.carpet.geometry} material={materials.carpet} />
        </Select>
        <Select enabled={hovered === "VOXLÖV"} onPointerOver={over("VOXLÖV")} onPointerOut={() => debouncedHover(null)} onClick={select("VOXLÖV")}>
          <mesh geometry={nodes.table.geometry} material={materials.walls} material-envMap={env} material-envMapIntensity={0.5} />
        </Select>
        <Select enabled={hovered === "FANBYN"} onPointerOver={over("FANBYN")} onPointerOut={() => debouncedHover(null)} onClick={select("FANBYN")}>
          <mesh geometry={nodes.chairs_1.geometry} material={materials.walls} />
          <mesh geometry={nodes.chairs_2.geometry} material={materials.plastic} material-color="#1a1a1a" material-envMap={env} />
        </Select>
        <Select enabled={hovered === "LIVSVERK"} onPointerOver={over("LIVSVERK")} onPointerOut={() => debouncedHover(null)} onClick={select("LIVSVERK")}>
          <mesh geometry={nodes.vase.geometry} material={materials.gray} material-envMap={env} />
        </Select>
        <Select enabled={hovered === "SKAFTET"} onPointerOver={over("SKAFTET")} onPointerOut={() => debouncedHover(null)} onClick={select("SKAFTET")}>
          <mesh geometry={nodes.lamp_socket.geometry} material={materials.gray} material-envMap={env} />
          <mesh geometry={nodes.lamp.geometry} material={materials.gray} />
          <mesh geometry={nodes.lamp_cord.geometry} material={materials.gray} material-envMap={env} />
        </Select>
        <mesh geometry={nodes.kitchen.geometry} material={materials.walls} onClick={select("KNOXHULT")} />
        <mesh geometry={nodes.sink.geometry} material={materials.chrome} material-envMap={env} />
      </group>
      <Text position={[1, 1.25, 0]} color="black" fontSize={0.15} font="Inter-Regular.woff" letterSpacing={-0.05}>
        {hovered ? hovered : "KNOXHULT"}
      </Text>
      <Price value={price} position={[-2, 0.3, -3.25]} />
    </>
  )
}
