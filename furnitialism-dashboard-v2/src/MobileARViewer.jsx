import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { FURNITURE_DATA } from './store';

export default function MobileARViewer() {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const modelViewerRef = useRef(null);
  const [arActivated, setArActivated] = useState(false);
  const [arSupported, setArSupported] = useState(true);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Extract model ID from pathname if not using Routes wrapper
  const currentPath = window.location.pathname;
  let extractedId = modelId || currentPath.split('/ar/')[1];
  
  // Decode URI components so spaces and foreign characters (like Ö) match store keys
  if (extractedId) {
    extractedId = decodeURIComponent(extractedId).replace(/-/g, ' ');
  }

  const item = FURNITURE_DATA[extractedId];

  // Auto-activate AR once model is loaded
  const handleActivateAR = useCallback(() => {
    const mv = modelViewerRef.current;
    if (mv && mv.activateAR) {
      try {
        mv.activateAR();
        setArActivated(true);
      } catch (err) {
        console.warn('AR activation failed:', err);
        setArActivated(true); // Hide prompt even on failure
      }
    }
  }, []);

  // Listen for model-viewer events
  useEffect(() => {
    const mv = modelViewerRef.current;
    if (!mv) return;

    const onLoad = () => setModelLoaded(true);
    const onArStatus = (e) => {
      if (e.detail.status === 'failed') {
        setArSupported(false);
        setArActivated(true); // Hide prompt
      }
    };

    mv.addEventListener('load', onLoad);
    mv.addEventListener('ar-status', onArStatus);

    // Check if AR is not supported
    // model-viewer sets canActivateAR after checking capabilities
    const checkAR = setTimeout(() => {
      if (mv && !mv.canActivateAR) {
        setArSupported(false);
        setArActivated(true);
      }
    }, 2000);

    return () => {
      mv.removeEventListener('load', onLoad);
      mv.removeEventListener('ar-status', onArStatus);
      clearTimeout(checkAR);
    };
  }, []);

  if (!item) {
    return (
      <div style={{ padding: '20px', color: 'white', background: '#111', height: '100vh', fontFamily: 'sans-serif' }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/')} style={{ padding: '10px 20px' }}>Return to Store</button>
      </div>
    );
  }

  // Use standalone GLB if available, otherwise fall back to room GLB
  let glbPath;
  if (item.standaloneGlb) {
    glbPath = item.standaloneGlb;
  } else {
    glbPath = "/white_modern_living_room-transformed.glb";
    if (['KNOXHULT', 'BRÖNDEN', 'SKAFTET', 'FANBYN', 'VOXLÖV', 'LIVSVERK'].includes(extractedId)) {
      glbPath = "/kitchen-transformed.glb";
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000', position: 'relative', overflow: 'hidden' }}>
      {/* model-viewer: handles AR for iOS (Quick Look) and Android (Scene Viewer) */}
      <model-viewer
        ref={modelViewerRef}
        src={glbPath}
        alt={`A 3D model of ${item.name}`}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        loading="eager"
        style={{ width: '100%', height: '100%' }}
      >
        <button 
          slot="ar-button" 
          style={{
            backgroundColor: 'white', borderRadius: '8px', border: '1px solid #ccc', 
            position: 'absolute', top: '16px', right: '16px', padding: '12px 20px',
            fontFamily: 'Inter, sans-serif', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            cursor: 'pointer', zIndex: 100
          }}
        >
          👀 View in your space
        </button>
      </model-viewer>

      {/* Full-screen AR Prompt Overlay — shown immediately on mobile */}
      {!arActivated && arSupported && (
        <div 
          onClick={handleActivateAR}
          style={{
            position: 'absolute', inset: 0, zIndex: 200,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(20,20,40,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontFamily: "'Inter', 'SF Pro', system-ui, sans-serif",
            animation: 'fadeIn 0.3s ease-out',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {/* Pulsing AR icon */}
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '28px', boxShadow: '0 0 40px rgba(79,70,229,0.4)',
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M2 12h4" /><path d="M18 12h4" />
              <path d="M12 2v4" /><path d="M12 18v4" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>

          <h2 style={{
            color: '#fff', fontSize: '1.6rem', fontWeight: '800',
            margin: '0 0 8px 0', textAlign: 'center',
            letterSpacing: '-0.02em'
          }}>
            Xem trong không gian của bạn
          </h2>
          
          <p style={{
            color: 'rgba(255,255,255,0.7)', fontSize: '1rem',
            margin: '0 0 6px 0', textAlign: 'center', fontWeight: '600'
          }}>
            {item.name}
          </p>

          <p style={{
            color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem',
            margin: '0', textAlign: 'center',
          }}>
            Chạm để mở AR
          </p>

          {/* Loading indicator when model not yet loaded */}
          {!modelLoaded && (
            <div style={{
              position: 'absolute', bottom: '60px',
              display: 'flex', alignItems: 'center', gap: '8px',
              color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem'
            }}>
              <div style={{
                width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.2)',
                borderTopColor: '#7C3AED', borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
              Đang tải mô hình 3D...
            </div>
          )}
        </div>
      )}
      
      {/* Product Information Overlay */}
      <div style={{ 
        position: 'absolute', bottom: '24px', left: '24px', right: '24px', 
        background: 'rgba(255,255,255,0.95)', padding: '20px', borderRadius: '16px', 
        backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
        fontFamily: 'sans-serif', zIndex: 50,
        transition: 'transform 0.4s ease, opacity 0.4s ease',
        transform: !arActivated && arSupported ? 'translateY(120%)' : 'translateY(0)',
        opacity: !arActivated && arSupported ? 0 : 1,
      }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '1.4rem', color: '#111', fontWeight: '800' }}>{item.name}</h2>
        <p style={{ margin: '0 0 16px 0', color: '#555', fontSize: '0.95rem', lineHeight: '1.4' }}>{item.description}</p>
        
        <div style={{ display: 'flex', gap: '12px' }}>
            <button 
                onClick={() => navigate('/shop')}
                style={{ flex: 1, padding: '14px', background: '#f5f5f5', color: '#111', border: '1px solid #ddd', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >
                Back to Shop
            </button>
            <button 
                onClick={() => navigate('/shop/showroom')}
                style={{ flex: 1, padding: '14px', background: '#111', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >
                Explore 3D Room
            </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(79,70,229,0.4); }
          50% { transform: scale(1.08); box-shadow: 0 0 60px rgba(124,58,237,0.6); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
