import React, { useState, useEffect } from 'react';
import { useStore } from './store';

export const CoreHub = () => {
    const { view, setView, room, setRoom, setShowCart, cart, orbitEnabled, setOrbitEnabled, setCheckoutStep, showForge, setShowForge } = useStore();
    const [isGlitching, setIsGlitching] = useState(false);
    const [roomMenuOpen, setRoomMenuOpen] = useState(false);

    // Toggle Room Dropdown
    const toggleRoomMenu = (e) => {
        e.stopPropagation();
        setRoomMenuOpen(!roomMenuOpen);
    };

    // Glitch effect on view change
    useEffect(() => {
        setIsGlitching(true);
        const timer = setTimeout(() => setIsGlitching(false), 300);
        return () => clearTimeout(timer);
    }, [view, room]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setRoomMenuOpen(false);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const handleRoomSelect = (roomId) => {
        setView('home');
        setRoom(roomId);
        setRoomMenuOpen(false);
    };

    const ROOM_LABELS = {
        'kitchen': 'KITCHEN',
        'living-room': 'LIVING ROOM',
        'modern-living-room': 'MODERN ROOM'
    };

    const activeRoomLabel = ROOM_LABELS[room] || 'KITCHEN';

    return (
        <div className="core-hub-container-horizontal">
            {/* 1. ROOMS (Dropdown) */}
            <div className="hub-btn-group">
                <button
                    className={`hub-btn ${view === 'home' ? 'active' : ''}`}
                    onClick={toggleRoomMenu}
                >
                    <span className="hub-dot-indicator"></span>
                    <span className={`hub-label ${isGlitching ? 'glitch-text' : ''}`} data-text={activeRoomLabel}>
                        {view === 'home' ? activeRoomLabel : 'ROOMS'}
                    </span>
                    <svg className="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>

                {/* Visual Dropdown */}
                {roomMenuOpen && (
                    <div className="hub-dropdown">
                        <div
                            className={`dropdown-item ${room === 'kitchen' ? 'active' : ''}`}
                            onClick={(e) => { e.stopPropagation(); handleRoomSelect('kitchen'); }}
                        >
                            KITCHEN
                        </div>
                        <div
                            className={`dropdown-item ${room === 'living-room' ? 'active' : ''}`}
                            onClick={(e) => { e.stopPropagation(); handleRoomSelect('living-room'); }}
                        >
                            LIVING ROOM
                        </div>
                        <div
                            className={`dropdown-item ${room === 'modern-living-room' ? 'active' : ''}`}
                            onClick={(e) => { e.stopPropagation(); handleRoomSelect('modern-living-room'); }}
                        >
                            MODERN ROOM
                        </div>
                    </div>
                )}
            </div>

            {/* 2. COLLECTION */}
            <button
                className={`hub-btn ${view === 'products' ? 'active' : ''}`}
                onClick={() => setView('products')}
            >
                <span className="hub-dot-indicator secondary"></span>
                <span className="hub-label">COLLECTION</span>
            </button>

            {/* 3. ORBIT */}
            <button
                className={`hub-btn ${orbitEnabled ? 'active' : ''}`}
                onClick={() => setOrbitEnabled(!orbitEnabled)}
            >
                <span className={`hub-dot-indicator ${orbitEnabled ? '' : 'secondary'}`}></span>
                <span className="hub-label">ORBIT</span>
            </button>

            {/* 4. CART */}
            <button
                className="hub-btn"
                onClick={() => setShowCart(true)}
            >
                <span className="hub-dot-indicator secondary"></span>
                <span className="hub-label">CART ({cart.length})</span>
            </button>

            {/* 5. AI FORGE */}
            <button
                className={`hub-btn ${showForge ? 'active' : ''}`}
                onClick={() => setShowForge(true)}
            >
                <span className={`hub-dot-indicator ${showForge ? '' : 'secondary'}`}></span>
                <span className="hub-label">FORGE</span>
            </button>
        </div>
    );
};
