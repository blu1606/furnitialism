import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Center, useGLTF } from '@react-three/drei'
import { useStore, FURNITURE_DATA } from './store'
import { ArQRCodeModal } from './ArQRCodeModal'
import { CartOrb } from './CartOrb'
import { isWebGLAvailable, WebGLFallback, WebGLBoundary, formatWebglMessage } from './components/WebGLHelper'

function Model({ id }) {
    let glbPath = "/white_modern_living_room-transformed.glb"
    if (['KNOXHULT', 'BRÖNDEN', 'SKAFTET', 'FANBYN', 'VOXLÖV', 'LIVSVERK'].includes(id)) {
        glbPath = "/kitchen-transformed.glb"
    }

    const { nodes } = useGLTF(glbPath)

    const nodeMapping = {
        'BRÖNDEN': [nodes.carpet],
        'VOXLÖV': [nodes.table],
        'FANBYN': [nodes.chairs_1, nodes.chairs_2],
        'LIVSVERK': [nodes.vase],
        'SKAFTET': [nodes.lamp_socket, nodes.lamp, nodes.lamp_cord],
        'KNOXHULT': [nodes.kitchen],
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
    const { standaloneView, setStandaloneView, addToCart } = useStore()
    const [showAR, setShowAR] = useState(false)
    const [webglSupported, setWebglSupported] = useState(() => isWebGLAvailable())
    const [webglError, setWebglError] = useState(null)
    const item = FURNITURE_DATA[standaloneView]

    useEffect(() => {
        if (!standaloneView) return
        setWebglSupported(isWebGLAvailable())
        setWebglError(null)
    }, [standaloneView])

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

            {!webglSupported || webglError ? (
                <WebGLFallback
                    message={webglError || 'WebGL is not available on this device.'}
                    onClose={() => setStandaloneView(null)}
                    onOpenAR={item?.hasAR ? () => setShowAR(true) : null}
                    onRetry={() => {
                        setWebglSupported(isWebGLAvailable())
                        setWebglError(null)
                    }}
                />
            ) : (
                <WebGLBoundary
                    message={webglError || 'WebGL failed to initialize.'}
                    onClose={() => setStandaloneView(null)}
                    onOpenAR={item?.hasAR ? () => setShowAR(true) : null}
                    onRetry={() => {
                        setWebglSupported(isWebGLAvailable())
                        setWebglError(null)
                    }}
                    onError={(error) => setWebglError(formatWebglMessage(error))}
                >
                    <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "high-performance" }} camera={{ position: [0, 0, 4], fov: 40 }}>
                        <color attach="background" args={['#111']} />
                        <Suspense fallback={null}>
                            <Stage intensity={0.5} environment="city" shadows="contact" adjustCamera={1.5}>
                                <Center>
                                    <Model id={standaloneView} />
                                </Center>
                            </Stage>
                        </Suspense>
                        <CartOrb />
                        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
                    </Canvas>
                </WebGLBoundary>
            )}

            <ArQRCodeModal isOpen={showAR} onClose={() => setShowAR(false)} productName={item.name} productId={standaloneView} />
            
            <div style={{ position: 'absolute', top: '32px', right: '180px', zIndex: 100, display: 'flex', gap: '12px' }}>
                {item?.hasAR && (
                    <button 
                        onClick={() => setShowAR(true)}
                        className="glass-panel hover-pulse"
                        style={{
                            padding: '10px 24px', borderRadius: '30px', fontWeight: 700, 
                            display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                            border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(0,0,0,0.5)', color: '#fff'
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
                        AR View
                    </button>
                )}
                <button 
                    onClick={() => addToCart(item, [0, 0, 0])}
                    className="glass-panel hover-pulse"
                    style={{
                        padding: '10px 24px', borderRadius: '30px', fontWeight: 700, 
                        display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                        border: '1px solid #7C3AED', background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', color: '#fff'
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
