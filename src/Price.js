import { useRef } from "react"
import { easing } from "maath"
import { useFrame } from "@react-three/fiber"
import { Text, Mask, useMask } from "@react-three/drei"

export const Price = ({ value, currency = "$", color, maskHeight = 1.55, step = 4, ...props }) => (
  <group {...props}>
    {[...`✨✨✨${value}`.slice(-4)].map((num, index) => (
      <Counter index={index} value={num === "✨" ? -1 : num} key={index} speed={0.1 * (4 - index)} step={step} color={color} />
    ))}
    <Text children={currency} anchorY="bottom" position={[4 * 1.1, -0.25, 0]} fontSize={1} font="Inter-Regular.woff" color={color}>
      <meshBasicMaterial color={color} toneMapped={false} />
    </Text>
    <Mask id={1}>
      <planeGeometry args={[10, maskHeight]} />
    </Mask>
  </group>
)

function Counter({ index, value, speed = 0.1, step = 2, color }) {
  const ref = useRef()
  const stencil = useMask(1)
  useFrame((state, delta) => easing.damp(ref.current.position, "y", value * -step, speed, delta))
  return (
    <group position-x={index * 1.1} ref={ref}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <Text key={number} position={[0, number * step, 0]} fontSize={2} font="Inter-Regular.woff" color={color}>
          {number}
          <meshBasicMaterial {...stencil} color={color} toneMapped={false} />
        </Text>
      ))}
    </group>
  )
}
