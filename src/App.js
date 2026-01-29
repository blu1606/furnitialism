import * as THREE from "three"
import { useState, useEffect } from "react"
import { easing } from "maath"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sky, Bvh, OrbitControls } from "@react-three/drei"
import { EffectComposer, Selection, Outline, N8AO, TiltShift2, ToneMapping } from "@react-three/postprocessing"
import { Scene } from "./Scene"
import { useStore, FURNITURE_DATA } from "./store"
import { CheckoutOverlay } from "./CheckoutOverlay"
import AIChat from "./AIChat"
import { CoreHub } from "./CoreHub"
import { CartNotification } from "./CartNotification"
import { ObjectViewer } from "./ObjectViewer"
import AIForge from "./AIForge"

export const App = () => {
  const { view, setView, room, setRoom, isScanning, setScanning, orbitEnabled, setOrbitEnabled, selected, setSelected, clearSelected, addToCart, cart, removeFromCart, checkoutStep, setCheckoutStep, showCart, setShowCart, standaloneView, setStandaloneView, isSelecting } = useStore()
  const [isTransitioning, setTransitioning] = useState(false)
  const selectedData = selected ? FURNITURE_DATA[selected] : null

  const handleViewChange = (newView) => {
    if (newView === view) return
    setTransitioning(true)
    setTimeout(() => {
      setView(newView)
      setTransitioning(false)
    }, 600)
  }

  const handleRoomChange = (newRoom) => {
    if (newRoom === room) return
    setTransitioning(true)
    setTimeout(() => {
      setRoom(newRoom)
      setTransitioning(false)
    }, 600)
  }

  const handleAISearch = (id) => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setSelected(id)
      setView('home')
    }, 2500)
  }

  return (
    <>
      <div className={`app-container view-${view} ${isTransitioning ? 'view-transitioning' : ''}`}>
        {/* Navigation Header */}
        {/* Navigation Header - Replaced by CoreHub */}
        <CoreHub />
        <CartNotification />
        <ObjectViewer />

        {/* Main Content Area */}
        <div className="content-viewport">
          {view === 'home' ? (
            <Canvas flat dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [0, 1, 6], fov: 25, near: 1, far: 20 }}>
              <ambientLight intensity={1.5 * Math.PI} />
              <Sky />
              <Bvh firstHitOnly>
                <Selection>
                  <Effects />
                  <CameraTracker />
                  {orbitEnabled && <OrbitControls makeDefault enableDamping dampingFactor={0.05} />}
                  <Scene rotation={[0, Math.PI / 2, 0]} position={[0, -1, -0.85]} />
                </Selection>
              </Bvh>
            </Canvas>
          ) : (
            <div className="product-grid-container">
              <header className="grid-header">
                <h1>The Kitchen Collection</h1>
                <p>Explore our premium modular furniture designed for high-end living.</p>
              </header>
              <div className="product-grid">
                {Object.values(FURNITURE_DATA).map((product) => (
                  <div key={product.id} className="product-card glass-panel" onClick={() => setSelected(product.id)}>
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      <div className="product-image-actions">
                        <button className="ai-search-btn" onClick={(e) => { e.stopPropagation(); handleAISearch(product.id); }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
                          <span>AI Search</span>
                        </button>
                        <button className="view-3d-btn" onClick={(e) => { e.stopPropagation(); setStandaloneView(product.id); }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44a.97.97 0 0 1-.94 0l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.09.34-.14.52-.14s.36.05.52.14l7.9 4.44c.32.17.53.5.53.88v9z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                          <span>View 3D</span>
                        </button>
                      </div>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <span className="price">${product.price.toLocaleString()}</span>
                      <button className="add-btn-small" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Scanning Overlay */}
        {isScanning && (
          <div className="scanning-overlay">
            <div className="scanning-grid"></div>
            <div className="scanner-line"></div>
            <div className="scanning-text">
              <h2>AI Analyzing 3D Models...</h2>
              <p>Locating furniture in digital twin environment</p>
            </div>
          </div>
        )}

        {/* Detail Panel (only in home view) */}
        {view === 'home' && selectedData && !isSelecting && (
          <div className="overlay-panel glass-panel">
            <button className="close-btn" onClick={clearSelected} aria-label="Close panel">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="panel-header">
              <h2>{selectedData.name}</h2>
              <span className="price-tag">${selectedData.price.toLocaleString()}</span>
            </div>
            <div className="panel-image-container">
              <img src={selectedData.image} alt={selectedData.name} className="panel-thumb" />
            </div>
            <p className="desc">{selectedData.description}</p>
            <div className="specs">
              <div className="spec-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                <span>{selectedData.dimensions}</span>
              </div>
              <div className="spec-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                <span>{selectedData.stock} in stock</span>
              </div>
            </div>
            <button className="add-btn" onClick={(e) => {
              // Calculate screen position roughly for standard HTML elements
              // If this was 3D, we'd use e.point. Since this is the overlay, we use the button position.
              // However, ideally the "Orb" starts from the 3D model center.
              // Let's use the object center from the 3D projection if possible, OR just the button center.
              // Since selectedData doesn't give us the 3D position directly here easily without more wiring,
              // using the button center as the start point is a safe visual proxy.
              const rect = e.target.getBoundingClientRect();
              const startPos = [rect.left + rect.width / 2, rect.top + rect.height / 2];

              // But wait! The Orb is in the 3D canvas.
              // If we pass screen coords [x, y], the CartOrb (R3F) needs to know how to position itself.
              // Our CartOrb logic effectively expects a 3D Vector for startPos? 
              // NO, our CartOrb logic in store/CartOrb currently treats startPos as a 3D World Vector 
              // in the initialization: startVec.current.set(...animState.startPos);

              // Issue: "addToCart" in 2D overlay gives 2D coords. "addToCart" in 3D scene gives 3D coords.
              // We need to handle both cases or unify them.
              // Let's modify CartOrb to accept SCREEN COORDS for start and project them to 3D.
              // OR passing a 3D vector [0,0,0] (center) if triggered from 2D overlay.
              // Since we want the "Orb" to start from the object, let's assume [0,0,0] for now or use the button.

              // For this overlay (Detail Panel), let's just trigger it without position (no orb) OR
              // pass a dummy 3D position [0, 0, 0] assuming object is centered.
              addToCart(selectedData, [0, 1, 0], selectedData.image);
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              Add to Cart
            </button>
            <button className="view-3d-btn-large" onClick={() => setStandaloneView(selected)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44a.97.97 0 0 1-.94 0l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.09.34-.14.52-.14s.36.05.52.14l7.9 4.44c.32.17.53.5.53.88v9z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              Standalone 3D View
            </button>
          </div>
        )}

        {/* Cart UI */}
        <div className={`cart-container glass-panel ${showCart ? 'active' : ''}`}>
          <div className="cart-header">
            <div className="cart-header-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span>Cart ({cart.length})</span>
            </div>
            <button className="close-cart" onClick={() => setShowCart(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.timestamp} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">${item.price.toLocaleString()}</span>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.timestamp)} aria-label="Remove item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
              </div>
            ))}
            {cart.length === 0 && <p className="empty-msg">Your selection is empty</p>}
          </div>
          {cart.length > 0 && (
            <>
              <div className="cart-total">
                <span>Subtotal</span>
                <span className="total-amount">${cart.reduce((acc, item) => acc + item.price, 0).toLocaleString()}</span>
              </div>
              <button className="checkout-btn btn-primary" onClick={() => { setShowCart(false); setCheckoutStep('details'); }}>
                Secure Checkout
              </button>
            </>
          )}
        </div>
        {/* Dev Tool: Camera Tracker HUD */}
        {orbitEnabled && <CameraTrackerOverlay />}
        <CheckoutOverlay />
      </div>
      <AIChat />
      <AIForge />
    </>
  )
}

function CameraTrackerOverlay() {
  const [data, setData] = useState({ pos: [0, 0, 0], rot: [0, 0, 0], fov: 0, zoom: 1, mouse: [0, 0] })
  const [copiedKey, setCopiedKey] = useState(null)

  // We'll use a custom state update from the Canvas
  useEffect(() => {
    const handleUpdate = (e) => setData(e.detail)
    window.addEventListener('camera-update', handleUpdate)
    return () => window.removeEventListener('camera-update', handleUpdate)
  }, [])

  const handleCopy = (key, value) => {
    navigator.clipboard.writeText(value)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 1500)
  }

  const formatValue = (arr) => `[${arr.map(v => v.toFixed(2)).join(', ')}]`

  return (
    <div className="camera-tracker-hud">
      <div className={`tracker-row ${copiedKey === 'pos' ? 'copied' : ''}`} onClick={() => handleCopy('pos', formatValue(data.pos))}>
        <span className="tracker-label">{copiedKey === 'pos' ? '✓ Copied' : 'Position:'}</span>
        <span className="tracker-value">{formatValue(data.pos)}</span>
      </div>
      <div className={`tracker-row ${copiedKey === 'rot' ? 'copied' : ''}`} onClick={() => handleCopy('rot', formatValue(data.rot))}>
        <span className="tracker-label">{copiedKey === 'rot' ? '✓ Copied' : 'Rotation:'}</span>
        <span className="tracker-value">{formatValue(data.rot)}</span>
      </div>
      <div className={`tracker-row ${copiedKey === 'mouse' ? 'copied' : ''}`} onClick={() => handleCopy('mouse', formatValue(data.mouse))}>
        <span className="tracker-label">{copiedKey === 'mouse' ? '✓ Copied' : 'Mouse (NDC):'}</span>
        <span className="tracker-value">{formatValue(data.mouse)}</span>
      </div>
      <div className={`tracker-row ${copiedKey === 'zoom' ? 'copied' : ''}`} onClick={() => handleCopy('zoom', `${data.fov.toFixed(1)}, ${data.zoom.toFixed(2)}`)}>
        <span className="tracker-label">{copiedKey === 'zoom' ? '✓ Copied' : 'FOV / Zoom:'}</span>
        <span className="tracker-value">{data.fov.toFixed(1)}° / x{data.zoom.toFixed(2)}</span>
      </div>
    </div>
  )
}

function CameraTracker() {
  const { camera, mouse } = useThree()
  useFrame(() => {
    const event = new CustomEvent('camera-update', {
      detail: {
        pos: [camera.position.x, camera.position.y, camera.position.z],
        rot: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
        fov: camera.fov,
        zoom: camera.zoom,
        mouse: [mouse.x, mouse.y]
      }
    })
    window.dispatchEvent(event)
  })
  return null
}

function Effects() {
  const { size } = useThree()
  const { orbitEnabled, room } = useStore()

  useFrame((state, delta) => {
    if (!orbitEnabled) {
      const t = state.clock.elapsedTime
      const swayX = Math.sin(t * 0.5) * 0.05
      const swayY = Math.sin(t * 0.3) * 0.05

      if (room === 'living-room') {
        const targetZ = 8.44 + Math.atan(state.pointer.x * 1.5)
        easing.damp3(state.camera.position, [
          0.35 + state.pointer.x * 0.5 + swayX,
          0.41 + state.pointer.y * 0.2 + swayY,
          targetZ
        ], 0.3, delta)
        state.camera.lookAt(state.camera.position.x * 0.8, 0.3, -4)
        state.camera.zoom = 1.00
      } else if (room === 'modern-living-room') {
        easing.damp3(state.camera.position, [
          state.pointer.x * 0.5 + swayX,
          0.5 + state.pointer.y * 0.2 + swayY,
          6 + Math.atan(state.pointer.x)
        ], 0.3, delta)
        state.camera.lookAt(0, 0, -4)
        state.camera.zoom = 1.00
      } else {
        easing.damp3(state.camera.position, [
          state.pointer.x + swayX,
          1 + state.pointer.y / 2 + swayY,
          8 + Math.atan(state.pointer.x * 2)
        ], 0.3, delta)
        state.camera.lookAt(state.camera.position.x * 0.9, 0, -4)
      }
    }
  })
  return (
    <EffectComposer stencilBuffer disableNormalPass autoClear={false} multisampling={4}>
      <N8AO halfRes aoSamples={5} aoRadius={0.4} distanceFalloff={0.75} intensity={1} />
      <Outline visibleEdgeColor="white" hiddenEdgeColor="white" blur width={size.width * 1.25} edgeStrength={10} />
      <TiltShift2 samples={5} blur={0.1} />
      <ToneMapping />
    </EffectComposer>
  )
}

