import React, { useState, useEffect, useRef } from 'react';
import { useStore } from './store';

const FORGE_MESSAGES = [
    { step: 1, text: "> Analyzing reference image..." },
    { step: 1, text: "> Detecting object boundary..." },
    { step: 1, text: "> Removing background..." },
    { step: 2, text: "> Initializing Neural Radiance Field..." },
    { step: 2, text: "> Generating sparse point cloud..." },
    { step: 2, text: "> Optimizing vertex positions..." },
    { step: 3, text: "> Projecting textures into UV space..." },
    { step: 3, text: "> Baking material properties..." },
    { step: 3, text: "> Refining mesh topology..." },
    { step: 4, text: "> Finalizing GLB export..." },
    { step: 4, text: "> Reconstruction complete." }
];

const AIForge = () => {
    const { showForge, setShowForge, forgeStep, setForgeStep, setStandaloneView } = useStore();
    const [terminalLines, setTerminalLines] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    // Use a ref to keep track of the current line index and interval to survive re-renders
    const currentLineIdx = useRef(0);
    const intervalRef = useRef(null);

    // Reset everything when forge modal closes or resets
    useEffect(() => {
        if (!showForge || forgeStep === 0) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setTerminalLines([]);
            currentLineIdx.current = 0;
            intervalRef.current = null;
        }
    }, [showForge, forgeStep]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Start processing when forgeStep moves to 1
    useEffect(() => {
        if (forgeStep === 1 && !intervalRef.current) {
            intervalRef.current = setInterval(() => {
                if (currentLineIdx.current < FORGE_MESSAGES.length) {
                    const nextLine = FORGE_MESSAGES[currentLineIdx.current];
                    setTerminalLines(prev => [...prev, nextLine]);

                    // Advance visual steps in sidebar
                    if (currentLineIdx.current === 2) setForgeStep(2);
                    if (currentLineIdx.current === 5) setForgeStep(3);
                    if (currentLineIdx.current === 8) setForgeStep(4);

                    currentLineIdx.current++;

                    // End of sequence
                    if (currentLineIdx.current === FORGE_MESSAGES.length) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        setTimeout(() => {
                            setShowForge(false);
                            setStandaloneView('VOXLÖV');
                        }, 2000);
                    }
                } else {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            }, 800);
        }
    }, [forgeStep, setForgeStep, setShowForge, setStandaloneView]);

    const handleUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            setForgeStep(1);
        }, 1000);
    };

    if (!showForge) return null;

    return (
        <div className={`forge-overlay ${showForge ? 'active' : ''}`}>
            <div className="forge-window glass-panel">
                <div className="forge-sidebar">
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#000', letterSpacing: '0.05em' }}>AI FORGE</h2>
                    <p style={{ fontSize: '0.85rem', opacity: 0.5, color: '#333' }}>VOXLÖV RECONSTRUCTION</p>

                    <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div className={`forge-step ${forgeStep === 1 ? 'active' : forgeStep > 1 ? 'completed' : ''}`}>
                            <div className="step-dot" />
                            <span className="hub-label">SCAN</span>
                        </div>
                        <div className={`forge-step ${forgeStep === 2 ? 'active' : forgeStep > 2 ? 'completed' : ''}`}>
                            <div className="step-dot" />
                            <span className="hub-label">RECONSTRUCT</span>
                        </div>
                        <div className={`forge-step ${forgeStep === 3 ? 'active' : forgeStep > 3 ? 'completed' : ''}`}>
                            <div className="step-dot" />
                            <span className="hub-label">MATERIAL</span>
                        </div>
                        <div className={`forge-step ${forgeStep === 4 ? 'active' : ''}`}>
                            <div className="step-dot" />
                            <span className="hub-label">DEPLOY</span>
                        </div>
                    </div>
                </div>

                <div className="forge-main">
                    <button className="forge-close-btn" onClick={() => setShowForge(false)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>

                    {forgeStep === 0 ? (
                        <div className="upload-zone" onClick={handleUpload}>
                            {isUploading ? (
                                <span className="hub-label" style={{ color: '#000' }}>INITIALIZING ENGINE...</span>
                            ) : (
                                <>
                                    <div style={{ padding: '20px', borderRadius: '50%', background: 'rgba(0, 0, 0, 0.05)', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                                    </div>
                                    <span className="hub-label" style={{ fontSize: '1rem', color: '#000' }}>Drop Reference Image</span>
                                    <span style={{ fontSize: '0.75rem', opacity: 0.4, color: '#000' }}>AI Reconstructs in Seconds</span>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="terminal-output">
                            {terminalLines.map((line, i) => (
                                <div key={i} className="terminal-line" style={{ display: 'flex', gap: '15px' }}>
                                    <span style={{ opacity: 0.2, minWidth: '40px' }}>{String(i + 1).padStart(2, '0')}</span>
                                    <span style={{ color: line && line.step === forgeStep ? '#000' : '#444', fontWeight: line && line.step === forgeStep ? '700' : '400' }}>
                                        {line ? line.text : ''}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIForge;
