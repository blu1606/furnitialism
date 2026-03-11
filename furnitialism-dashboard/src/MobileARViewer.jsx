import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '@google/model-viewer';
import { FURNITURE_DATA } from './store';

export default function MobileARViewer() {
  const { modelId } = useParams();
  const navigate = useNavigate();

  // Extract model ID from pathname if not using Routes wrapper
  const currentPath = window.location.pathname;
  let extractedId = modelId || currentPath.split('/ar/')[1];
  
  // Decode URI components so spaces and foreign characters (like Ö) match store keys
  if (extractedId) {
    extractedId = decodeURIComponent(extractedId).replace(/-/g, ' ');
  }

  const item = FURNITURE_DATA[extractedId];

  if (!item) {
    return (
      <div style={{ padding: '20px', color: 'white', background: '#111', height: '100vh', fontFamily: 'sans-serif' }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/')} style={{ padding: '10px 20px' }}>Return to Store</button>
      </div>
    );
  }

  // Determine GLB path (using full room GLB for demo purposes)
  // In production, you would upload isolated .glb files for each product
  let glbPath = "/white_modern_living_room-transformed.glb";
  if (['KNOXHULT', 'BRÖNDEN', 'SKAFTET', 'FANBYN', 'VOXLÖV', 'LIVSVERK'].includes(extractedId)) {
      glbPath = "/kitchen-transformed.glb";
  }

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#f0f0f0', position: 'relative', overflow: 'hidden' }}>
      {/* 
        Using @google/model-viewer for natively invoked AR on mobile iOS/Android.
        Note: Safari/iOS requires an ios-src (usdz format) to launch AR Quick Look.
        Android will use WebXR Scene Viewer with the .glb file.
      */}
      <model-viewer
        src={glbPath}
        alt={`A 3D model of ${item.name}`}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
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
      
      {/* Product Information Overlay */}
      <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', background: 'rgba(255,255,255,0.95)', padding: '20px', borderRadius: '16px', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontFamily: 'sans-serif' }}>
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
    </div>
  );
}
