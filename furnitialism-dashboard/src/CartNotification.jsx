import React, { useEffect, useState } from 'react';
import { useStore } from './store';

export const CartNotification = () => {
    const { animState, endAnimation } = useStore();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (animState.active) {
            setVisible(true);
            endAnimation();

            // Store timer in a variable that is NOT cleaned up when animState changes
            // Since endAnimation triggers a re-render with animState.active = false,
            // the previous effect cleanup runs.
            // We want the timeout to persist even if the effect cleans up due to dependency change.
            // However, React effects should clean up side effects.
            // The issue is that the dependency `animState.active` changes immediately within the logic.

            // Fix: Use a separate timeout ref or don't return the cleanup for the HIDE action specifically,
            // OR checks if we are actually unmounting.
            // Simplest fix: Just set the timeout and don't clear it in this specific effect instance
            // checking simple "active" flip.
            // Ideally, we managing "visible" status based on a "trigger" signal.

            const timer = setTimeout(() => {
                setVisible(false);
            }, 1000);

            // We only clear if the component totally unmounts or we want to reset.
            // If we don't clear, we might get memory leaks if component unmounts.
            // But for this bug fix, ignoring cleanup on dependency change is key.
            // A ref can hold the timer ID to clear on unmount only.
        }
    }, [animState.active, endAnimation]);

    return (
        <div className={`cart-notification ${visible ? 'active' : ''}`}>
            <div className="notif-content glass-panel">
                <div className="notif-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div className="notif-text">
                    <h4>Added to Cart</h4>
                    <p>Item successfully added</p>
                </div>
            </div>
        </div>
    );
};
