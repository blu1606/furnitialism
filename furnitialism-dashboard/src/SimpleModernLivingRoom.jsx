import React, { useState, useMemo } from 'react'
import { useGLTF, Text } from '@react-three/drei'
import { Select } from '@react-three/postprocessing'

/**
 * Recursive component to render GLTF nodes while preserving hierarchy 
 * and adding hover-highlight capabilities.
 */
function GltfNode({ node, hovered, setHovered }) {
    if (!node) return null

    const isMesh = node.isMesh || node.type === 'Mesh'
    const isSelected = hovered === node.name

    // If it's a mesh, we wrap it in Select for the Outline effect
    if (isMesh) {
        return (
            <Select enabled={isSelected}>
                <mesh
                    name={node.name}
                    geometry={node.geometry}
                    material={node.material}
                    position={node.position}
                    rotation={node.rotation}
                    scale={node.scale}
                    onPointerOver={(e) => {
                        e.stopPropagation()
                        setHovered(node.name)
                    }}
                    onPointerOut={(e) => {
                        setHovered(null)
                    }}
                >
                    {/* Meshes can sometimes have children too (though rare in basic GLBs) */}
                    {node.children && node.children.map((child) => (
                        <GltfNode key={child.uuid} node={child} hovered={hovered} setHovered={setHovered} />
                    ))}
                </mesh>
            </Select>
        )
    }

    // If it's a group or other object, we just group its children
    return (
        <group
            name={node.name}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
        >
            {node.children && node.children.map((child) => (
                <GltfNode key={child.uuid} node={child} hovered={hovered} setHovered={setHovered} />
            ))}
        </group>
    )
}

export function SimpleModernLivingRoom(props) {
    const { scene } = useGLTF('/simple_modern_living_room.glb')
    const [hovered, setHovered] = useState(null)

    return (
        <group {...props} dispose={null}>
            <GltfNode node={scene} hovered={hovered} setHovered={setHovered} />

            {hovered && (
                <Text
                    position={[0, 2.8, 0]}
                    fontSize={0.25}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000"
                >
                    {hovered}
                </Text>
            )}
        </group>
    )
}

useGLTF.preload('/simple_modern_living_room.glb')
