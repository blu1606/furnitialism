"use client";

import React, { useState, useEffect } from 'react';

const LandingPage = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-background-light " />;
    }

    const handleNavigation = (e: React.MouseEvent) => {
        e.preventDefault();
        // Placeholder for navigation/store actions
    };

    const handleCTA = (e: React.MouseEvent) => {
        e.preventDefault();
        const forwardUrl = process.env.NEXT_PUBLIC_FORWARD_URL;
        if (forwardUrl) {
            window.location.href = forwardUrl;
        } else {
            console.log("Redirect URL is not configured. Please set NEXT_PUBLIC_FORWARD_URL in .env.local");
        }
    };

    return (
        <div className="bg-background-light text-stone-900 overflow-x-hidden overflow-y-auto h-full">
            {/* TopNavBar - Floating Rounded Design */}
            <div className="fixed top-6 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none">
                <header className="w-full max-w-4xl glass-card border border-stone-200/50 rounded-full py-3 px-8 shadow-premium pointer-events-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="size-8 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-2xl">view_in_ar</span>
                            </div>
                            <h2 className="text-stone-900 text-lg font-black tracking-tighter">Furnitialism</h2>
                        </div>
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-stone-600 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors"
                                href="#showrooms">Showrooms</a>
                            <a className="text-stone-600 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors"
                                href="#ai-forge">AI Forge</a>
                            <a className="text-stone-600 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors"
                                href="#features">Technology</a>
                            <a className="text-stone-600 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors"
                                href="#roadmap">Roadmap</a>
                        </nav>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleCTA}
                                className="bg-stone-900 text-white rounded-full h-9 px-5 text-xs font-black shadow-lg shadow-black/10 hover:scale-105 transition-transform"
                            >
                                Shop Now
                            </button>
                        </div>
                    </div>
                </header>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] w-full flex items-center justify-center pt-20 px-4 md:px-6 bg-stone-50/30">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]"></div>
                </div>
                <div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center gap-12 text-center py-20">
                    <div className="flex flex-col gap-6 max-w-4xl mx-auto z-10">
                        <h1 className="text-stone-900 text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
                            Experience <span className="text-glow-primary">Interiors.</span><br />
                            <span className="text-primary">Don&apos;t Just View Them.</span>
                        </h1>
                        <p className="text-stone-600 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                            Step into the future of furniture shopping with immersive 3D technology and AI-driven interior
                            design simulations.
                        </p>
                        <div className="pt-4 flex justify-center">
                            <button
                                onClick={handleCTA}
                                className="flex items-center gap-2 bg-primary text-white h-14 px-8 rounded-full text-base font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
                            >
                                <span>Enter Showroom</span>
                                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                    {/* Cinematic Glass Container */}
                    <div className="w-full max-w-5xl glass-card p-2 md:p-3 rounded-[2rem] shadow-2xl relative group overflow-hidden isolation-auto">
                        <div className="relative w-full aspect-video rounded-[1.5rem] overflow-hidden bg-stone-700 isolation-isolate transform translate-z-0">
                            {/* VIDEO: 3D Kitchen Navigation Demo */}
                            <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
                                <source src="/video/hero-1.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>

                            <div className="absolute bottom-6 left-6 text-white text-left z-20">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                    <span className="text-xs font-medium tracking-wide uppercase">Live Demo</span>
                                </div>
                                <p className="font-medium text-lg drop-shadow-md">3D Kitchen Navigation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Curated Rooms Section (NEW) */}
            <section id="showrooms" className="py-24 md:py-32 px-4 md:px-6 relative overflow-hidden bg-stone-100/50 ">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center gap-4 text-center mb-16">
                        <span className="px-4 py-1.5 rounded-full bg-stone-200 text-stone-600 text-xs font-bold uppercase tracking-widest text-primary">Virtual Showrooms</span>
                        <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
                            Explore <span className="text-glow-primary">Curated Spaces</span>
                        </h2>
                        <p className="text-stone-600 text-lg max-w-2xl">
                            Immerse yourself in our designer-curated 3D rooms. Discover premium pieces in their natural habitat and shop the look instantly.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Room 1 */}
                        <div className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-stone-200 cursor-pointer" onClick={handleCTA}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300"></div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80" alt="Nordic Minimalist" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Nordic Minimalist</h3>
                                <div className="flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    <span className="text-sm font-medium">Explore 3D Room</span>
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </div>

                        {/* Room 2 */}
                        <div className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-stone-200 cursor-pointer md:-translate-y-8" onClick={handleCTA}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300"></div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80" alt="Modern Sanctuary" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Modern Sanctuary</h3>
                                <div className="flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    <span className="text-sm font-medium">Explore 3D Room</span>
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </div>

                         {/* Room 3 */}
                        <div className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-stone-200 cursor-pointer" onClick={handleCTA}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300"></div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80" alt="Urban Industrial" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Urban Industrial</h3>
                                <div className="flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    <span className="text-sm font-medium">Explore 3D Room</span>
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 flex justify-center">
                        <button onClick={handleCTA} className="group flex items-center gap-2 text-primary font-bold hover:text-stone-900 :text-white transition-colors">
                            View All Collections
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">east</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Feature Section B (Zig-zag 1) */}
            <section id="features" className="py-24 md:py-32 px-4 md:px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
                        {/* Text Content */}
                        <div className="flex-1 flex flex-col gap-8 order-2 md:order-1">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
                                    <span className="material-symbols-outlined text-lg">texture</span>
                                    <span>Ultra-High Fidelity</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight mb-6">
                                    Precision in <br /><span className="text-glow-primary">Every Pixel</span>
                                </h2>
                                <p className="text-stone-600 text-lg leading-relaxed max-w-lg">
                                    Experience true-to-life textures and lighting. Our engine renders materials with
                                    sub-millimeter accuracy, allowing you to feel the grain of the wood and the weave of the
                                    fabric before you buy.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-xl bg-stone-100 text-primary">
                                        <span className="material-symbols-outlined">light_mode</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Ray-Traced Lighting</h3>
                                        <p className="text-stone-600 text-sm">See how natural light interacts
                                            with surfaces at any time of day.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-xl bg-stone-100 text-primary">
                                        <span className="material-symbols-outlined">zoom_in</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Micro-Texture Analysis</h3>
                                        <p className="text-stone-600 text-sm">Zoom in up to 400% without losing
                                            visual fidelity.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Media Content */}
                        <div className="flex-1 w-full order-1 md:order-2">
                            <div className="glass-card p-2 rounded-[2rem] gold-glow transform md:rotate-2 hover:rotate-0 transition-transform duration-500 isolation-auto">
                                <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-stone-800 isolation-isolate transform" style={{ transform: 'translateZ(0)' }}>
                                    {/* VIDEO: Standalone Object Viewer */}
                                    <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
                                        <source src="/video/Standalone-1.mp4" type="video/mp4" />
                                    </video>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                                    {/* Overlay UI elements to simulate viewer */}
                                    <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
                                        <button className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition shadow-lg">
                                            <span className="material-symbols-outlined text-sm">360</span>
                                        </button>
                                        <button className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition shadow-lg">
                                            <span className="material-symbols-outlined text-sm">zoom_in</span>
                                        </button>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6 z-20">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Product</p>
                                                <p className="text-white text-xl font-medium">Velvet Lounge Chair</p>
                                            </div>
                                            <div
                                                onClick={handleCTA}
                                                className="h-10 px-4 rounded-full bg-primary/90 text-white flex items-center text-sm font-bold cursor-pointer hover:bg-primary transition-colors"
                                            >
                                                View Details
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Section C (Zig-zag 2) */}
            <section id="ai-forge" className="py-24 md:py-32 px-4 md:px-6 bg-white ">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
                        {/* Media Content */}
                        <div className="lg:flex-1 w-full max-w-4xl">
                            <div className="glass-card p-2 rounded-[2rem] cyan-glow transform md:-rotate-2 hover:rotate-0 transition-transform duration-500 isolation-auto">
                                <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-stone-900 isolation-isolate transform" style={{ transform: 'translateZ(0)' }}>
                                    {/* VIDEO: AI Forge - 2D to 3D Conversion */}
                                    <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
                                        <source src="/video/Ai-forge-1.mp4" type="video/mp4" />
                                    </video>
                                    {/* Tech Overlay */}
                                    <div className="absolute inset-0 border-2 border-arctic-cyan/30 rounded-[1.5rem] m-2 pointer-events-none z-5"></div>

                                    <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-md border border-arctic-cyan/30 px-3 py-1.5 rounded-lg z-20 shadow-xl">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-arctic-cyan text-sm animate-spin">autorenew</span>
                                            <span className="text-arctic-cyan text-xs font-mono">AI_PROCESSING...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Text Content */}
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-arctic-cyan font-bold text-sm tracking-widest uppercase">
                                    <span className="material-symbols-outlined text-lg">psychology</span>
                                    <span>AI Forge Technology</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight mb-6">
                                    From Photo<br />to <span className="text-glow-primary">Reality</span>
                                </h2>
                                <p className="text-stone-600 text-lg leading-relaxed max-w-lg">
                                    Our proprietary AI Forge technology converts simple 2D images into fully realized 3D
                                    models instantly. Upload a sketch or a photo, and watch it come to life in our virtual
                                    showroom.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 ">
                                    <p className="text-3xl font-black text-stone-900 mb-1">2s</p>
                                    <p className="text-sm text-stone-500">Render Time</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 ">
                                    <p className="text-3xl font-black text-stone-900 mb-1">4k</p>
                                    <p className="text-sm text-stone-500">Output Quality</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCTA}
                                className="w-fit mt-2 text-stone-900 font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors flex items-center gap-2 group"
                            >
                                Try AI Forge Beta
                                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Context Section D */}
            <section className="py-24 md:py-32 px-4 md:px-6">
                <div className="max-w-5xl mx-auto flex flex-col gap-16 text-center">
                    <div className="flex flex-col gap-4 items-center">
                        <span className="px-4 py-1.5 rounded-full bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-widest">Augmented Reality</span>
                        <h2 className="text-4xl md:text-6xl font-black text-stone-900 mb-6">
                            Find It In <span className="text-glow-primary">Context</span>
                        </h2>
                        <p className="text-lg text-stone-600 max-w-xl mx-auto">
                            Unsure if it fits? Use our AI Contextual Search to project furniture directly into your living space
                            through your camera.
                        </p>
                    </div>
                    <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden bg-stone-700 shadow-2xl group isolation-isolate transform translate-z-0">
                        {/* VIDEO: AI Contextual Search */}
                        <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
                            <source src="/video/Collections-AI-Detect-1.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
                        {/* UI Overlay for context */}
                        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 pointer-events-none z-20">
                            <div className="flex justify-between items-start">
                                <div className="bg-white/90 backdrop-blur text-stone-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                                    AR View Active
                                </div>
                                <div className="flex gap-2">
                                    <div className="size-3 bg-red-500 rounded-full"></div>
                                    <div className="size-3 bg-yellow-500 rounded-full"></div>
                                    <div className="size-3 bg-green-500 rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={handleCTA}
                                    className="pointer-events-auto bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 h-16 w-16 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                >
                                    <span className="material-symbols-outlined text-4xl">view_in_ar</span>
                                </button>
                            </div>
                            <div className="flex justify-center">
                                <div className="bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium">
                                    Scan your room to begin
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={handleCTA}
                            className="bg-stone-900 text-white h-12 px-8 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                            Launch AR Experience
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32 px-4 md:px-6 bg-stone-100 ">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="space-y-6">
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-3 py-1 rounded-full border border-[#d4a373] text-[#d4a373] text-[10px] font-bold uppercase tracking-widest bg-[#d4a373]/5">Hybrid Animation</span>
                                    <span className="px-3 py-1 rounded-full border border-[#d4a373] text-[#d4a373] text-[10px] font-bold uppercase tracking-widest bg-[#d4a373]/5">Persistent State</span>
                                    <span className="px-3 py-1 rounded-full border border-[#d4a373] text-[#d4a373] text-[10px] font-bold uppercase tracking-widest bg-[#d4a373]/5">Secure Overlay</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
                                    Seamless <span className="text-glow-primary">Conversion</span>
                                </h2>
                                <p className="text-stone-600 text-lg leading-relaxed max-w-lg">
                                    Experience our &quot;Hybrid Context Model&quot;. Watch as 3D objects transform into 2D UI elements via
                                    the signature &quot;CartOrb&quot; animation. Includes persistent state and a secure, multi-step
                                    checkout overlay.
                                </p>
                            </div>
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={handleCTA}
                                    className="bg-stone-900 text-white h-12 px-8 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                                >
                                    View Commerce Flow
                                </button>
                                <div className="flex items-center gap-2 text-stone-500">
                                    <span className="material-symbols-outlined">lock</span>
                                    <span className="text-xs font-medium uppercase tracking-tighter">PCI-DSS Compliant</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="bg-white/45 backdrop-blur-2xl border border-white/40 shadow-2xl p-2 rounded-[2rem] transition-all duration-500 video-glow-hover isolation-auto">
                                <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-stone-700 flex items-center justify-center isolation-isolate transform translate-z-0">
                                    {/* VIDEO: Seamless Conversion */}
                                    <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
                                        <source src="/video/cart-payment-1.mp4" type="video/mp4" />
                                    </video>
                                    <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-200 shadow-sm flex items-center gap-2 z-10">
                                        <span className="material-symbols-outlined text-stone-900 text-sm">shopping_cart</span>
                                        <span className="text-stone-900 text-xs font-bold">1 Item</span>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none z-10">
                                        <div className="w-24 h-24 rounded-full border-4 border-dashed border-[#d4a373]/40 animate-spin"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* User Flow Section: From Scan to Sanctuary */}
            <section className="py-24 md:py-32 bg-white border-y border-stone-100 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-stone-900 ">From Scan to <span className="text-glow-primary">Sanctuary</span></h2>
                        <p className="text-stone-600 mt-4 max-w-2xl mx-auto">A streamlined process designed for
                            efficiency and elegance.</p>
                    </div>
                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-stone-100 -translate-y-1/2 z-0"></div>
                        <div className="hidden md:block absolute top-1/2 left-0 w-3/4 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2 z-0"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-primary shadow-lg shadow-primary/10 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300">
                                    <span className="material-symbols-outlined text-primary text-3xl">center_focus_strong</span>
                                </div>
                                <h3 className="text-lg font-bold text-stone-900 mb-2">Scan Room</h3>
                                <p className="text-sm text-stone-600 px-4">Use your phone to capture a 360° scan
                                    of your space.</p>
                            </div>
                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-primary shadow-lg shadow-primary/10 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 delay-75">
                                    <span className="material-symbols-outlined text-primary text-3xl">auto_fix_high</span>
                                </div>
                                <h3 className="text-lg font-bold text-stone-900 mb-2">AI Analysis</h3>
                                <p className="text-sm text-stone-600 px-4">Our engine identifies dimensions,
                                    lighting, and style.</p>
                            </div>
                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-primary shadow-lg shadow-primary/10 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 delay-150">
                                    <span className="material-symbols-outlined text-primary text-3xl">view_in_ar</span>
                                </div>
                                <h3 className="text-lg font-bold text-stone-900 mb-2">Custom 3D Model</h3>
                                <p className="text-sm text-stone-600 px-4">Generate and tweak your new interior
                                    in real-time.</p>
                            </div>
                            {/* Step 4 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-stone-900 text-white shadow-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 delay-200">
                                    <span className="material-symbols-outlined text-primary text-3xl">shopping_bag</span>
                                </div>
                                <h3 className="text-lg font-bold text-stone-900 mb-2">One-Click Purchase</h3>
                                <p className="text-sm text-stone-600 px-4">Buy all generated furniture items
                                    directly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section id="roadmap" className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-16 items-start">
                    {/* Left: Header & Current Status */}
                    <div className="flex-1 md:sticky md:top-32">
                        <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">Product <span className="text-glow-primary">Roadmap</span></h2>
                        <p className="text-stone-600 mb-8 text-lg">We are building the future of commerce. See
                            where we are headed.</p>
                        <div className="p-8 rounded-3xl glass-card border border-stone-200 shadow-sm hover-pulse">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Current Status</p>
                                    <h4 className="text-2xl font-bold text-stone-900 ">Phase 2: Acceleration</h4>
                                </div>
                                <span className="text-4xl font-black text-primary">66%</span>
                            </div>
                            <div className="h-4 w-full bg-stone-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '66%' }}></div>
                            </div>
                            <p className="text-xs text-stone-400 mt-4 text-right font-medium">Estimated Completion: Q3 2024</p>
                        </div>
                    </div>
                    {/* Right: Timeline Items */}
                    <div className="flex-1 w-full space-y-10 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-6 top-4 bottom-4 w-px bg-stone-200 "></div>
                        {/* Item 1: Done */}
                        <div className="relative flex gap-8">
                            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-green-500 text-white z-10 flex items-center justify-center shadow-lg shadow-green-500/20">
                                <span className="material-symbols-outlined text-sm">check</span>
                            </div>
                            <div className="flex-1 pt-1">
                                <h4 className="text-xl font-bold text-stone-900 line-through opacity-50">Foundation
                                    & AI Core</h4>
                                <p className="text-stone-500 mt-2">Initial release of the 3D rendering engine
                                    and basic furniture database.</p>
                            </div>
                        </div>
                        {/* Item 2: Active */}
                        <div className="relative flex gap-8">
                            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-primary border-4 border-background-light shadow-lg shadow-primary/30 z-10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-xl">construction</span>
                            </div>
                            <div className="flex-1 pt-1 glass-card p-6 rounded-2xl border-l-4 border-l-primary hover-pulse transition-all">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-xl font-bold text-stone-900 ">Smart Recommendation Engine</h4>
                                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">In Progress</span>
                                </div>
                                <p className="text-stone-600 leading-relaxed">Training models on 50k+ designer
                                    portfolios to suggest personalized layouts based on space and lighting.</p>
                            </div>
                        </div>
                        {/* Item 3: Future */}
                        <div className="relative flex gap-8">
                            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-stone-100 border-2 border-stone-200 z-10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-stone-400 text-xl font-bold">schedule</span>
                            </div>
                            <div className="flex-1 pt-1 opacity-60">
                                <h4 className="text-xl font-bold text-stone-900 ">AR Glasses Integration</h4>
                                <p className="text-stone-500 mt-2 leading-relaxed">Native support for Apple
                                    Vision Pro and Meta Quest 3 for mixed-reality spatial designs.</p>
                            </div>
                        </div>
                        {/* Item 4: Future */}
                        <div className="relative flex gap-8">
                            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-stone-100 border-2 border-stone-200 z-10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-stone-400 text-xl font-bold">schedule</span>
                            </div>
                            <div className="flex-1 pt-1 opacity-60">
                                <h4 className="text-xl font-bold text-stone-900 ">Global Marketplace Expansion</h4>
                                <p className="text-stone-500 mt-2 leading-relaxed">Connecting 3D models directly
                                    with logistics from over 500+ international artisan furniture brands.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join the Revolution CTA */}
            <section className="py-24 md:py-32 bg-stone-900 relative overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute top-0 left-0 w-full h-full -z-0 opacity-30">
                    <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px]"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[140px]"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <span className="material-symbols-outlined text-primary text-5xl">rocket_launch</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">Join the <span className="text-glow-primary">Revolution</span></h2>
                    <p className="text-xl text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed">Ready to transform your space with
                        the most advanced interior design AI ever built? Early access slots are limited.</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                        <input
                            className="flex-1 bg-white/5 border border-white/10 text-white placeholder-stone-500 px-6 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary backdrop-blur-md transition-all text-base"
                            placeholder="Email address" type="email" />
                        <button
                            onClick={handleCTA}
                            className="bg-primary hover:bg-white hover:text-stone-900 text-stone-900 px-6 py-4 rounded-xl font-bold text-base transition-all duration-500 shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                        >
                            Get Early Access
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                    <p className="text-stone-600 text-sm mt-8 uppercase tracking-widest font-bold">Limited slots available for Q1
                        2024</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-stone-200 pt-20 pb-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                        <div className="flex flex-col gap-6 max-w-sm">
                            <div className="flex items-center gap-2">
                                <div className="size-6 text-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined">view_in_ar</span>
                                </div>
                                <h2 className="text-stone-900 font-bold tracking-tight">Furnitialism</h2>
                            </div>
                            <p className="text-stone-500 text-sm leading-relaxed">
                                Redefining luxury interiors with spatial computing and artificial intelligence. Experience the
                                impossible from the comfort of your home.
                            </p>
                        </div>
                        <div className="flex gap-16 flex-wrap">
                            <div className="flex flex-col gap-4">
                                <h4 className="font-bold text-stone-900 ">Product</h4>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">Collections</a>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">Showroom</a>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">Custom Orders</a>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="font-bold text-stone-900 ">Technology</h4>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">AI Forge</a>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">AR Viewer</a>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">Developers</a>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="font-bold text-stone-900 ">Company</h4>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">About</a>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">Careers</a>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-stone-400 text-xs">© 2024 Furnitialism. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a className="text-stone-400 hover:text-stone-600 :text-stone-200 transition-colors" href="#">
                                <span className="sr-only">Twitter</span>
                                <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                </svg>
                            </a>
                            <a className="text-stone-400 hover:text-stone-600 :text-stone-200 transition-colors" href="#">
                                <span className="sr-only">Instagram</span>
                                <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 4.005c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
