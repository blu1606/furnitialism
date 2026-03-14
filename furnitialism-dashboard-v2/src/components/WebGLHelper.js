import React, { Component } from 'react'

export function isWebGLAvailable() {
    try {
        if (typeof window === 'undefined') return false
        
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
        
        if (!gl) {
            console.error('WebGL context could not be initialized.')
            return false
        }
        
        // Check for specific extensions or parameters if needed
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
        if (debugInfo) {
            const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            console.info(`WebGL Initialized: ${vendor} - ${renderer}`)
        }
        
        // CRITICAL: Dispose the test context to avoid exhausting the browser's
        // WebGL context pool (typically limited to ~16 active contexts).
        // Without this, every HMR cycle leaks a context.
        const loseCtx = gl.getExtension('WEBGL_lose_context')
        if (loseCtx) loseCtx.loseContext()
        canvas.width = 0
        canvas.height = 0
        
        return true
    } catch (error) {
        console.error('WebGL availability check failed:', error)
        return false
    }
}

export function WebGLFallback({ message, onBrowse, onOpenAR, onRetry, onClose }) {
    return (
        <div className="glass-panel" style={{ 
            position: 'absolute', 
            inset: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '24px', 
            zIndex: 10,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)'
        }}>
            <div style={{ maxWidth: '420px', textAlign: 'center', color: '#fff' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>3D Viewer Unavailable</h2>
                <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '20px', lineHeight: 1.5 }}>{message}</p>
                
                <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.6, marginBottom: '24px', textAlign: 'left', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ marginBottom: '4px' }}>• Ensure "Hardware Acceleration" is enabled in browser settings.</div>
                    <div style={{ marginBottom: '4px' }}>• Update your graphics drivers to the latest version.</div>
                    <div>• AR viewing is available on supported mobile devices.</div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="glass-panel hover-pulse"
                            style={{
                                padding: '10px 24px',
                                borderRadius: '999px',
                                fontWeight: 700,
                                border: '1px solid rgba(255,255,255,0.4)',
                                background: 'rgba(255,255,255,0.15)',
                                color: '#fff',
                                cursor: 'pointer'
                            }}
                        >
                            Retry 3D
                        </button>
                    )}
                    {onOpenAR && (
                        <button
                            onClick={onOpenAR}
                            className="glass-panel hover-pulse"
                            style={{
                                padding: '10px 24px',
                                borderRadius: '999px',
                                fontWeight: 700,
                                border: '1px solid rgba(255,255,255,0.3)',
                                background: 'rgba(255,255,255,0.1)',
                                color: '#fff',
                                cursor: 'pointer'
                            }}
                        >
                            Open AR View
                        </button>
                    )}
                    {onBrowse && (
                        <button
                            onClick={onBrowse}
                            className="glass-panel hover-pulse"
                            style={{
                                padding: '10px 24px',
                                borderRadius: '999px',
                                fontWeight: 700,
                                border: '1px solid rgba(212, 163, 115, 0.5)',
                                background: 'linear-gradient(135deg, #d4a373, #a67c52)',
                                color: '#fff',
                                cursor: 'pointer'
                            }}
                        >
                            Back to Shop
                        </button>
                    )}
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="glass-panel hover-pulse"
                            style={{
                                padding: '10px 24px',
                                borderRadius: '999px',
                                fontWeight: 700,
                                border: '1px solid rgba(255,255,255,0.4)',
                                background: 'transparent',
                                color: '#fff',
                                cursor: 'pointer'
                            }}
                        >
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

class WebGLErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('WebGL Boundary caught an error:', error, errorInfo)
        if (this.props.onError) {
            this.props.onError(error)
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <WebGLFallback 
                    message={this.props.message || (this.state.error?.message) || "The 3D engine encountered an unexpected error."} 
                    onBrowse={this.props.onBrowse}
                    onOpenAR={this.props.onOpenAR}
                    onRetry={this.props.onRetry}
                    onClose={this.props.onClose}
                />
            )
        }
        return this.props.children
    }
}

export function WebGLBoundary({ children, ...props }) {
    return (
        <WebGLErrorBoundary {...props}>
            {children}
        </WebGLErrorBoundary>
    )
}

export function formatWebglMessage(error) {
    const raw = (error && error.message) ? error.message : ''
    const normalized = raw.toLowerCase()
    
    if (normalized.includes('context') && normalized.includes('lost')) {
        return 'The WebGL context was lost. This often happens when too many 3D tabs are open.'
    }
    if (normalized.includes('out of memory') || normalized.includes('oom')) {
        return 'The device ran out of graphics memory. Try closing other applications or tabs.'
    }
    if (normalized.includes('power-efficient') || normalized.includes('hardware acceleration')) {
        return 'Hardware acceleration appears to be disabled in your browser.'
    }
    
    return 'The 3D engine failed to initialize. Check your browser settings or graphics drivers.'
}
