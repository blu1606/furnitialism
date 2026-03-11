import React, { useEffect, useState } from 'react';
import { useStore } from './store';

export const CartOrbAnimation = () => {
    const { animState, endAnimation } = useStore();
    const [style, setStyle] = useState(null);

    useEffect(() => {
        if (animState.active && animState.image) {
            // End target is the Cart button in CoreHub
            const cartBtns = document.querySelectorAll('.hub-btn'); // Find all hub buttons
            let cartBtn = null;
            cartBtns.forEach(btn => {
                if (btn.textContent.includes('CART')) cartBtn = btn;
            });

            let endPos = [window.innerWidth - 100, 40]; // Default top right
            if (cartBtn) {
                const rect = cartBtn.getBoundingClientRect();
                endPos = [rect.left + rect.width / 2, rect.top + rect.height / 2];
            }

            // Start position: center of screen (acting as proxy for 3D object center)
            const startPos = [window.innerWidth / 2, window.innerHeight / 2];

            setStyle({
                position: 'fixed',
                left: startPos[0],
                top: startPos[1],
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundImage: `url(${animState.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 0 30px rgba(212, 163, 115, 0.8), 0 0 10px rgba(255,255,255,1)',
                zIndex: 9999,
                transform: 'translate(-50%, -50%) scale(1)',
                transition: 'none',
                border: '2px solid white'
            });

            // Trigger animation frame
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setStyle(prev => ({
                        ...prev,
                        left: endPos[0],
                        top: endPos[1],
                        transform: 'translate(-50%, -50%) scale(0.1)',
                        opacity: 0,
                        transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
                    }));
                });
            });

            // End animation after transition finishes
            const timer = setTimeout(() => {
                endAnimation();
            }, 800);

            return () => clearTimeout(timer);
        }
    }, [animState, endAnimation]);

    if (!animState.active) return null;

    return <div style={style} className="cart-orb" />;
};
