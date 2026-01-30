import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Center, useGLTF, Environment } from '@react-three/drei'
import { useStore, FURNITURE_DATA } from './store'

function Model({ id }) {
    // Determine which GLB to load based on the item ID
    let glbPath = "/white_modern_living_room-transformed.glb"
    if (['KNOXHULT', 'BRÖNDEN', 'SKAFTET', 'FANBYN', 'VOXLÖV', 'LIVSVERK'].includes(id)) {
        glbPath = "/kitchen-transformed.glb"
    }

    const { nodes } = useGLTF(glbPath)

    // Mapping of furniture ID to their mesh nodes
    const nodeMapping = {
        'BRÖNDEN': [nodes.carpet],
        'VOXLÖV': [nodes.table],
        'FANBYN': [nodes.chairs_1, nodes.chairs_2],
        'LIVSVERK': [nodes.vase],
        'SKAFTET': [nodes.lamp_socket, nodes.lamp, nodes.lamp_cord],
        'KNOXHULT': [nodes.kitchen],
        // Living room mappings
        'SOFA': [nodes.Sofa_Sofa_0],
        'COFFEE_TABLE': [nodes.CoffeeTable_CoffeeTable_0],
        'TV': [nodes.TV_TV_0, nodes.TVStand_TVStand_0],
        'ABSTRACT_ART': [nodes.AbstractArt_AbstractArt_0, nodes.PictureFrame_Material_0],
        'LAMP': [nodes.Lamp_Lamp_0],
        'PLANT': [nodes.Plant__0]
    }

    const meshes = nodeMapping[id] || []

    if (meshes.length === 0) return null

    return (
        <group>
            {meshes.map((mesh, i) => (
                <mesh
                    key={i}
                    geometry={mesh.geometry}
                    material={mesh.material}
                    castShadow
                    receiveShadow
                />
            ))}
        </group>
    )
}

export const ObjectViewer = () => {
    const { standaloneView, setStandaloneView } = useStore()
    const item = FURNITURE_DATA[standaloneView]

    if (!standaloneView || !item) return null

    return (
        <div className="object-viewer-overlay">
            <button className="close-viewer-btn" onClick={() => setStandaloneView(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                <span>Close Viewer</span>
            </button>

            <div className="viewer-info">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
            </div>

            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 40 }}>
                <color attach="background" args={['#111']} />
                <Suspense fallback={null}>
                    <Stage intensity={0.5} environment="city" shadows="contact" adjustCamera={1.5}>
                        <Center>
                            <Model id={standaloneView} />
                        </Center>
                    </Stage>
                </Suspense>
                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
            </Canvas>
        </div>
    )
}
