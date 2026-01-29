import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { useStore } from "./store"
import { Kitchen } from "./Kitchen"
import { LivingRoom } from "./LivingRoom"
import { SimpleLivingRoom } from "./SimpleLivingRoom"

export function Scene({ rotation, position, scale, ...props }) {
  const room = useStore((state) => state.room)
  const selected = useStore((state) => state.selected)

  return (
    <group {...props}>

      {/* Dynamic Environment Lighting based on room context */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={room === 'living-room' ? 2 : 1.5}
        color={room === 'living-room' ? "#fff9ed" : "#ffffff"}
      />

      {room === 'living-room' ? (
        <LivingRoom rotation={[0, Math.PI * 1.5, 0]} position={[0, -1, 0]} scale={1.15} />
      ) : room === 'modern-living-room' ? (
        <SimpleLivingRoom rotation={[0, Math.PI, 0]} position={[0, -1, 0]} scale={1} />
      ) : (
        <Kitchen rotation={[0, Math.PI / 2, 0]} position={[0, -1, -0.85]} />
      )}

      {/* Selected Item Spotlight (AI Guided Navigation Feedback) */}
      {selected && (
        <spotLight
          position={[0, 10, 0]}
          angle={0.15}
          penumbra={1}
          intensity={50}
          castShadow
          color="#7C3AED"
        />
      )}
    </group>
  )
}
