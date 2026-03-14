import React from 'react';
import { FURNITURE_DATA } from './store';

export const ArQRCodeModal = ({ isOpen, onClose, productName, productId }) => {
    if (!isOpen) return null;

    const product = FURNITURE_DATA[productId];
    const qrSrc = (product && product.qrImage) || `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.origin + '/ar/' + (productId || productName.replace(/\s+/g, '-')))}`;

    return (
        <div 
            className="ar-modal-overlay" 
            style={{
                position: 'fixed', inset: 0, zIndex: 3000, 
                backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            onClick={onClose}
        >
            <div 
                className="ar-modal-content glass-panel" 
                style={{
                    width: '90%', maxWidth: '400px', padding: '32px',
                    borderRadius: '24px', textAlign: 'center', position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '16px', right: '16px',
                        background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit'
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>View in Your Space</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
                    Scan this QR code with your mobile device to see <strong>{productName}</strong> in Augmented Reality.
                </p>
                
                <div style={{ background: '#fff', padding: '16px', borderRadius: '16px', display: 'inline-block' }}>
                    <img 
                        src={qrSrc} 
                        alt="AR QR Code" 
                        style={{ width: '250px', height: '250px', display: 'block' }}
                    />
                </div>
                
                <p style={{ marginTop: '24px', fontSize: '0.8rem', opacity: 0.6, fontWeight: 600, letterSpacing: '0.05em' }}>
                    Works on supported iOS and Android devices
                </p>
            </div>
        </div>
    );
};
