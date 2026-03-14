import { useStore } from "./store"
import { useTranslation } from "./i18n"

export const Landing = () => {
    const { setView, setLocale } = useStore()
    const { t, locale } = useTranslation()

    return (
        <div className="bg-background-light dark:bg-background-dark text-stone-900 dark:text-white overflow-x-hidden overflow-y-auto h-full">
            {/* TopNavBar */}
            <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-card border-b border-stone-200/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">view_in_ar</span>
                        </div>
                        <h2 className="text-stone-900 dark:text-white text-xl font-bold tracking-tight">{t('landing.brand') || 'Smart 3D Interior'}</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <button className="text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white text-sm font-medium transition-colors" onClick={() => setView('products')}>{t('landing.nav.shop') || 'Shop'}</button>
                        <button className="text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white text-sm font-medium transition-colors" onClick={() => setView('home')}>{t('landing.nav.showroom') || 'Showroom'}</button>
                        <button className="text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white text-sm font-medium transition-colors" onClick={() => setView('products')}>{t('landing.nav.collections') || 'Collections'}</button>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setLocale(locale === 'en' ? 'vi' : 'en')}
                            className="text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white text-sm font-bold transition-colors px-2"
                        >
                            {locale === 'en' ? 'VI' : 'EN'}
                        </button>
                        <button className="hidden sm:block text-stone-900 dark:text-white text-sm font-medium hover:opacity-70 transition-opacity" onClick={() => setView('products')}>{t('landing.nav.signIn') || 'Sign In'}</button>
                        <button
                            onClick={() => setView('products')}
                            className="bg-stone-900 text-white dark:bg-white dark:text-stone-900 rounded-full h-10 px-6 text-sm font-bold hover:scale-105 transition-transform"
                        >
                            {t('landing.nav.shopNow') || 'Shop Now'}
                        </button>
                    </div>
                </div>
            </header>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] w-full flex items-center justify-center pt-20 px-4 md:px-6">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]">
                    </div>
                </div>
                <div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center gap-12 text-center py-20">
                    <div className="flex flex-col gap-6 max-w-4xl mx-auto z-10">
                        <h1 className="text-stone-900 dark:text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
                            {t('landing.hero.title1') || 'Experience'} <span className="text-glow-primary">{t('landing.hero.title2') || 'Interiors.'}</span><br />
                            <span className="text-primary">{t('landing.hero.title3') || "Don't Just View Them."}</span>
                        </h1>
                        <p
                            className="text-stone-600 dark:text-stone-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                            {t('landing.hero.subtitle') || 'Step into the future of furniture shopping with immersive 3D technology and AI-driven interior design simulations.'}
                        </p>
                        <div className="pt-4 flex justify-center">
                            <button
                                onClick={() => setView('home')}
                                className="flex items-center gap-2 bg-primary text-white h-14 px-8 rounded-full text-base font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
                            >
                                <span>{t('landing.hero.cta') || 'Enter Showroom'}</span>
                                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                    {/* Cinematic Glass Container */}
                    <div
                        className="w-full max-w-5xl glass-card p-2 md:p-3 rounded-[2rem] shadow-2xl relative group overflow-hidden">
                        <div
                            className="relative w-full aspect-video rounded-[1.5rem] overflow-hidden bg-stone-200 dark:bg-stone-800">
                            {/* VIDEO: 3D Kitchen Navigation Demo */}
                            <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                                <source src="/video/hero-1.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500">
                            </div>

                            <div className="absolute bottom-6 left-6 text-white text-left">
                                <div
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                    <span className="text-xs font-medium tracking-wide uppercase">{t('landing.hero.demo.badge') || 'Live Demo'}</span>
                                </div>
                                <p className="font-medium text-lg drop-shadow-md">{t('landing.hero.demo.title') || '3D Kitchen Navigation'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Feature Section B (Zig-zag 1) */}
            <section className="py-24 md:py-32 px-4 md:px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
                        {/* Text Content */}
                        <div className="flex-1 flex flex-col gap-8 order-2 md:order-1">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
                                    <span className="material-symbols-outlined text-lg">texture</span>
                                    <span>{t('landing.feature1.badge') || 'Ultra-High Fidelity'}</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white leading-tight">
                                    {t('landing.feature1.title1') || 'Precision in'} <br /><span className="text-glow-primary">{t('landing.feature1.title2') || 'Every Pixel'}</span>
                                </h2>
                                <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed max-w-lg">
                                    {t('landing.feature1.desc') || 'Experience true-to-life textures and lighting. Our engine renders materials with sub-millimeter accuracy, allowing you to feel the grain of the wood and the weave of the fabric before you buy.'}
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-primary">
                                        <span className="material-symbols-outlined">light_mode</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{t('landing.feature1.point1.title') || 'Ray-Traced Lighting'}</h3>
                                        <p className="text-stone-600 dark:text-stone-400 text-sm">{t('landing.feature1.point1.desc') || 'See how natural light interacts with surfaces at any time of day.'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-primary">
                                        <span className="material-symbols-outlined">zoom_in</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{t('landing.feature1.point2.title') || 'Micro-Texture Analysis'}</h3>
                                        <p className="text-stone-600 dark:text-stone-400 text-sm">{t('landing.feature1.point2.desc') || 'Zoom in up to 400% without losing visual fidelity.'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Media Content */}
                        <div className="flex-1 w-full order-1 md:order-2">
                            <div
                                className="glass-card p-2 rounded-[2rem] gold-glow transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-stone-800">
                                    {/* VIDEO: Standalone Object Viewer */}
                                    <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                                        <source src="/video/Standalone-1.mp4" type="video/mp4" />
                                    </video>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                                    </div>
                                    {/* Overlay UI elements to simulate viewer */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                                        <button
                                            className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition">
                                            <span className="material-symbols-outlined text-sm">360</span>
                                        </button>
                                        <button
                                            className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition">
                                            <span className="material-symbols-outlined text-sm">zoom_in</span>
                                        </button>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-white/60 text-xs uppercase tracking-wider mb-1">{t('landing.feature1.demo.label') || 'Product'}</p>
                                                <p className="text-white text-xl font-medium">{t('landing.feature1.demo.product') || 'Velvet Lounge Chair'}</p>
                                            </div>
                                            <div
                                                onClick={() => setView('products')}
                                                className="h-10 px-4 rounded-full bg-primary/90 text-white flex items-center text-sm font-bold cursor-pointer"
                                            >
                                                {t('landing.feature1.demo.cta') || 'View Details'}
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
            <section className="py-24 md:py-32 px-4 md:px-6 bg-white dark:bg-stone-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
                        {/* Media Content */}
                        <div className="lg:flex-1 w-full max-w-4xl">
                            <div
                                className="glass-card p-2 rounded-[2rem] cyan-glow transform md:-rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-stone-900">
                                    {/* VIDEO: AI Forge - 2D to 3D Conversion */}
                                    <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                                        <source src="/video/Ai-forge-1.mp4" type="video/mp4" />
                                    </video>
                                    {/* Tech Overlay */}
                                    <div
                                        className="absolute inset-0 border-2 border-arctic-cyan/30 rounded-[1.5rem] m-2 pointer-events-none">
                                    </div>

                                    <div
                                        className="absolute top-6 left-6 bg-black/60 backdrop-blur-md border border-arctic-cyan/30 px-3 py-1.5 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="material-symbols-outlined text-arctic-cyan text-sm animate-spin">autorenew</span>
                                            <span className="text-arctic-cyan text-xs font-mono">AI_PROCESSING...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Text Content */}
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="space-y-4">
                                <div
                                    className="flex items-center gap-2 text-arctic-cyan font-bold text-sm tracking-widest uppercase">
                                    <span className="material-symbols-outlined text-lg">psychology</span>
                                    <span>{t('landing.feature2.badge') || 'AI Forge Technology'}</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white leading-tight">
                                    {t('landing.feature2.title1') || 'From Photo'}<br />{t('landing.feature2.title2') || 'to'} <span className="text-glow-primary">{t('landing.feature2.title3') || 'Reality'}</span>
                                </h2>
                                <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed max-w-lg">
                                    {t('landing.feature2.desc') || 'Our proprietary AI Forge technology converts simple 2D images into fully realized 3D models instantly. Upload a sketch or a photo, and watch it come to life in our virtual showroom.'}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    className="p-4 rounded-2xl bg-stone-50 border border-stone-100 dark:bg-stone-800 dark:border-stone-700">
                                    <p className="text-3xl font-black text-stone-900 dark:text-white mb-1">{t('landing.feature2.stat1.value') || '2s'}</p>
                                    <p className="text-sm text-stone-500">{t('landing.feature2.stat1.label') || 'Render Time'}</p>
                                </div>
                                <div
                                    className="p-4 rounded-2xl bg-stone-50 border border-stone-100 dark:bg-stone-800 dark:border-stone-700">
                                    <p className="text-3xl font-black text-stone-900 dark:text-white mb-1">{t('landing.feature2.stat2.value') || '4k'}</p>
                                    <p className="text-sm text-stone-500">{t('landing.feature2.stat2.label') || 'Output Quality'}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setView('home')}
                                className="w-fit mt-2 text-stone-900 dark:text-white font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors flex items-center gap-2 group"
                            >
                                {t('landing.feature2.cta') || 'Try AI Forge Beta'}
                                <span
                                    className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* Context Section D */}
            <section className="py-24 md:py-32 px-4 md:px-6">
                <div className="max-w-5xl mx-auto flex flex-col gap-16 text-center">
                    <div className="flex flex-col gap-4 items-center">
                        <span
                            className="px-4 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold uppercase tracking-widest">{t('landing.feature3.badge') || 'Augmented Reality'}</span>
                        <h2 className="text-4xl md:text-6xl font-black text-stone-900 dark:text-white">{t('landing.feature3.title1') || 'Find It In'} <span
                            className="text-glow-primary">{t('landing.feature3.title2') || 'Context'}</span></h2>
                        <p className="text-lg text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
                            {t('landing.feature3.desc') || 'Unsure if it fits? Use our AI Contextual Search to project furniture directly into your living space through your camera.'}
                        </p>
                    </div>
                    <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl group">
                        {/* VIDEO: AI Contextual Search */}
                        <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                            <source src="/video/Collections-AI-Detect-1.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                        {/* UI Overlay for context */}
                        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 pointer-events-none">
                            <div className="flex justify-between items-start">
                                <div
                                    className="bg-white/90 backdrop-blur text-stone-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                                    {t('landing.feature3.demo.badge') || 'AR View Active'}
                                </div>
                                <div className="flex gap-2">
                                    <div className="size-3 bg-red-500 rounded-full"></div>
                                    <div className="size-3 bg-yellow-500 rounded-full"></div>
                                    <div className="size-3 bg-green-500 rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setView('home')}
                                    className="pointer-events-auto bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 h-16 w-16 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                >
                                    <span className="material-symbols-outlined text-4xl">view_in_ar</span>
                                </button>
                            </div>
                            <div className="flex justify-center">
                                <div className="bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium">
                                    {t('landing.feature3.demo.instruction') || 'Scan your room to begin'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={() => setView('home')}
                            className="bg-stone-900 text-white dark:bg-white dark:text-stone-900 h-12 px-8 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                            {t('landing.feature3.cta') || 'Launch AR Experience'}
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32 px-4 md:px-6 bg-[#fafaf9] dark:bg-stone-900">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="space-y-6">
                                <div className="flex flex-wrap gap-3">
                                    <span
                                        className="px-3 py-1 rounded-full border border-[#d4a373] text-[#d4a373] text-[10px] font-bold uppercase tracking-widest bg-[#d4a373]/5">{t('landing.feature4.badge1') || 'Hybrid Animation'}</span>
                                    <span
                                        className="px-3 py-1 rounded-full border border-[#d4a373] text-[#d4a373] text-[10px] font-bold uppercase tracking-widest bg-[#d4a373]/5">{t('landing.feature4.badge2') || 'Persistent State'}</span>
                                    <span
                                        className="px-3 py-1 rounded-full border border-[#d4a373] text-[#d4a373] text-[10px] font-bold uppercase tracking-widest bg-[#d4a373]/5">{t('landing.feature4.badge3') || 'Secure Overlay'}</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white leading-tight">
                                    {t('landing.feature4.title1') || 'Seamless'} <span className="text-glow-primary">{t('landing.feature4.title2') || 'Conversion'}</span>
                                </h2>
                                <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed max-w-lg">
                                    {t('landing.feature4.desc') || 'Experience our "Hybrid Context Model". Watch as 3D objects transform into 2D UI elements via the signature "CartOrb" animation. Includes persistent state and a secure, multi-step checkout overlay.'}
                                </p>
                            </div>
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={() => setView('home')}
                                    className="bg-stone-900 text-white dark:bg-white dark:text-stone-900 h-12 px-8 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                                >
                                    {t('landing.feature4.cta') || 'View Commerce Flow'}
                                </button>
                                <div className="flex items-center gap-2 text-stone-500">
                                    <span className="material-symbols-outlined">lock</span>
                                    <span className="text-xs font-medium uppercase tracking-tighter">{t('landing.feature4.security') || 'PCI-DSS Compliant'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <div
                                className="bg-white/45 backdrop-blur-2xl border border-white/40 shadow-2xl p-2 rounded-[2rem] transition-all duration-500 video-glow-hover">
                                <div
                                    className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
                                    {/* VIDEO: Seamless Conversion */}
                                    <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                                        <source src="/video/cart-payment-1.mp4" type="video/mp4" />
                                    </video>
                                    <div
                                        className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-200 shadow-sm flex items-center gap-2">
                                        <span className="material-symbols-outlined text-stone-900 text-sm">shopping_cart</span>
                                        <span className="text-stone-900 text-xs font-bold">{t('landing.feature4.demo.cart') || '1 Item'}</span>
                                    </div>
                                    <div
                                        className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                                        <div
                                            className="w-24 h-24 rounded-full border-4 border-dashed border-[#d4a373]/40 animate-spin">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* User Flow Section: From Scan to Sanctuary */}
            <section className="py-24 md:py-32 bg-white dark:bg-stone-900 border-y border-stone-100 dark:border-stone-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-white">{t('landing.flow.title1') || 'From Scan to'} <span
                            className="text-glow-primary">{t('landing.flow.title2') || 'Sanctuary'}</span></h2>
                        <p className="text-stone-600 dark:text-stone-400 mt-4 max-w-2xl mx-auto">{t('landing.flow.desc') || 'A streamlined process designed for efficiency and elegance.'}</p>
                    </div>
                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div
                            className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-stone-100 dark:bg-stone-800 -translate-y-1/2 z-0">
                        </div>
                        <div
                            className="hidden md:block absolute top-1/2 left-0 w-3/4 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2 z-0">
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center group">
                                <div
                                    className="w-16 h-16 rounded-2xl bg-white dark:bg-stone-800 border-2 border-primary shadow-lg shadow-primary/10 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300">
                                    <span className="material-symbols-outlined text-primary text-3xl">center_focus_strong</span>
                                </div>
                                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">{t('landing.flow.step1.title') || 'Scan Room'}</h3>
                                <p className="text-sm text-stone-600 dark:text-stone-400 px-4">{t('landing.flow.step1.desc') || 'Use your phone to capture a 360° scan of your space.'}</p>
                            </div>
                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center group">
                                <div
                                    className="w-16 h-16 rounded-2xl bg-white dark:bg-stone-800 border-2 border-primary shadow-lg shadow-primary/10 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 delay-75">
                                    <span className="material-symbols-outlined text-primary text-3xl">auto_fix_high</span>
                                </div>
                                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">{t('landing.flow.step2.title') || 'AI Analysis'}</h3>
                                <p className="text-sm text-stone-600 dark:text-stone-400 px-4">{t('landing.flow.step2.desc') || 'Our engine identifies dimensions, lighting, and style.'}</p>
                            </div>
                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center group">
                                <div
                                    className="w-16 h-16 rounded-2xl bg-white dark:bg-stone-800 border-2 border-primary shadow-lg shadow-primary/10 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 delay-150">
                                    <span className="material-symbols-outlined text-primary text-3xl">view_in_ar</span>
                                </div>
                                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">{t('landing.flow.step3.title') || 'Custom 3D Model'}</h3>
                                <p className="text-sm text-stone-600 dark:text-stone-400 px-4">{t('landing.flow.step3.desc') || 'Generate and tweak your new interior in real-time.'}</p>
                            </div>
                            {/* Step 4 */}
                            <div className="flex flex-col items-center text-center group">
                                <div
                                    className="w-16 h-16 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 delay-200">
                                    <span className="material-symbols-outlined text-primary text-3xl">shopping_bag</span>
                                </div>
                                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">{t('landing.flow.step4.title') || 'One-Click Purchase'}</h3>
                                <p className="text-sm text-stone-600 dark:text-stone-400 px-4">{t('landing.flow.step4.desc') || 'Buy all generated furniture items directly.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-16 items-start">
                    {/* Left: Header & Current Status */}
                    <div className="flex-1 md:sticky md:top-32">
                        <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-white mb-6">{t('landing.roadmap.title1') || 'Product'} <span
                            className="text-glow-primary">{t('landing.roadmap.title2') || 'Roadmap'}</span></h2>
                        <p className="text-stone-600 dark:text-stone-400 mb-8 text-lg">{t('landing.roadmap.desc') || 'We are building the future of commerce. See where we are headed.'}</p>
                        <div
                            className="p-8 rounded-3xl glass-card border border-stone-200 dark:border-stone-800 shadow-sm hover-pulse">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">{t('landing.roadmap.status.label') || 'Current Status'}</p>
                                    <h4 className="text-2xl font-bold text-stone-900 dark:text-white">{t('landing.roadmap.status.phase') || 'Phase 2: Acceleration'}</h4>
                                </div>
                                <span className="text-4xl font-black text-primary">66%</span>
                            </div>
                            <div className="h-4 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '66%' }}>
                                </div>
                            </div>
                            <p className="text-xs text-stone-400 mt-4 text-right font-medium">{t('landing.roadmap.status.eta') || 'Estimated Completion: Q3 2024'}</p>
                        </div>
                    </div>
                    {/* Right: Timeline Items */}
                    <div className="flex-1 w-full space-y-10 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-6 top-4 bottom-4 w-px bg-stone-200 dark:bg-stone-800"></div>
                        {/* Item 1: Done */}
                        <div className="relative flex gap-8">
                            <div
                                className="w-12 h-12 flex-shrink-0 rounded-full bg-green-500 text-white z-10 flex items-center justify-center shadow-lg shadow-green-500/20">
                                <span className="material-symbols-outlined text-sm">check</span>
                            </div>
                            <div className="flex-1 pt-1">
                                <h4 className="text-xl font-bold text-stone-900 dark:text-white line-through opacity-50">{t('landing.roadmap.item1.title') || 'Foundation & AI Core'}</h4>
                                <p className="text-stone-500 dark:text-stone-500 mt-2">{t('landing.roadmap.item1.desc') || 'Initial release of the 3D rendering engine and basic furniture database.'}</p>
                            </div>
                        </div>
                        {/* Item 2: Active */}
                        <div className="relative flex gap-8">
                            <div
                                className="w-12 h-12 flex-shrink-0 rounded-full bg-primary border-4 border-background-light dark:border-background-dark shadow-lg shadow-primary/30 z-10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-xl">construction</span>
                            </div>
                            <div
                                className="flex-1 pt-1 glass-card p-6 rounded-2xl border-l-4 border-l-primary hover-pulse transition-all">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-xl font-bold text-stone-900 dark:text-white">{t('landing.roadmap.item2.title') || 'Smart Recommendation Engine'}
                                    </h4>
                                    <span
                                        className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">{t('landing.roadmap.item2.badge') || 'In Progress'}</span>
                                </div>
                                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{t('landing.roadmap.item2.desc') || 'Training models on 50k+ designer portfolios to suggest personalized layouts based on space and lighting.'}</p>
                            </div>
                        </div>
                        {/* Item 3: Future */}
                        <div className="relative flex gap-8">
                            <div
                                className="w-12 h-12 flex-shrink-0 rounded-full bg-stone-100 dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 z-10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-stone-400 text-xl font-bold">schedule</span>
                            </div>
                            <div className="flex-1 pt-1 opacity-60">
                                <h4 className="text-xl font-bold text-stone-900 dark:text-white">{t('landing.roadmap.item3.title') || 'AR Glasses Integration'}</h4>
                                <p className="text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">{t('landing.roadmap.item3.desc') || 'Native support for Apple Vision Pro and Meta Quest 3 for mixed-reality spatial designs.'}</p>
                            </div>
                        </div>
                        {/* Item 4: Future */}
                        <div className="relative flex gap-8">
                            <div
                                className="w-12 h-12 flex-shrink-0 rounded-full bg-stone-100 dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 z-10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-stone-400 text-xl font-bold">schedule</span>
                            </div>
                            <div className="flex-1 pt-1 opacity-60">
                                <h4 className="text-xl font-bold text-stone-900 dark:text-white">{t('landing.roadmap.item4.title') || 'Global Marketplace Expansion'}</h4>
                                <p className="text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">{t('landing.roadmap.item4.desc') || 'Connecting 3D models directly with logistics from over 500+ international artisan furniture brands.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join the Revolution CTA */}
            <section className="py-24 md:py-32 bg-stone-900 dark:bg-black relative overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute top-0 left-0 w-full h-full -z-0 opacity-30">
                    <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px]"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[140px]">
                    </div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <span className="material-symbols-outlined text-primary text-5xl">rocket_launch</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">{t('landing.cta.title1') || 'Join the'} <span
                        className="text-glow-primary">{t('landing.cta.title2') || 'Revolution'}</span></h2>
                    <p className="text-xl text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed">{t('landing.cta.desc') || 'Ready to transform your space with the most advanced interior design AI ever built? Early access slots are limited.'}</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                        <input
                            className="flex-1 bg-white/5 border border-white/10 text-white placeholder-stone-500 px-6 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary backdrop-blur-md transition-all text-base"
                            placeholder={t('landing.cta.placeholder') || 'Email address'} type="email" />
                        <button
                            onClick={() => setView('home')}
                            className="bg-primary hover:bg-white hover:text-stone-900 text-stone-900 px-6 py-4 rounded-xl font-bold text-base transition-all duration-500 shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                        >
                            {t('landing.cta.button') || 'Get Early Access'}
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                    <p className="text-stone-600 text-sm mt-8 uppercase tracking-widest font-bold">{t('landing.cta.note') || 'Limited slots available for Q1 2024'}</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 pt-20 pb-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                        <div className="flex flex-col gap-6 max-w-sm">
                            <div className="flex items-center gap-2">
                                <div className="size-6 text-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined">view_in_ar</span>
                                </div>
                                <h2 className="text-stone-900 dark:text-white font-bold tracking-tight">{t('landing.footer.brand') || 'Smart 3D Interior'}</h2>
                            </div>
                            <p className="text-stone-500 text-sm leading-relaxed">
                                {t('landing.footer.desc') || 'Redefining luxury interiors with spatial computing and artificial intelligence. Experience the impossible from the comfort of your home.'}
                            </p>
                        </div>
                        <div className="flex gap-16 flex-wrap">
                            <div className="flex flex-col gap-4">
                                <h4 className="font-bold text-stone-900 dark:text-white">{t('landing.footer.col1.title') || 'Product'}</h4>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">{t('landing.footer.col1.link1') || 'Shop'}</a>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">{t('landing.footer.col1.link2') || 'Showroom'}</a>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">{t('landing.footer.col1.link3') || 'Custom Orders'}</a>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="font-bold text-stone-900 dark:text-white">{t('landing.footer.col2.title') || 'Technology'}</h4>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">{t('landing.footer.col2.link1') || 'AI Forge'}</a>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">{t('landing.footer.col2.link2') || 'AR Viewer'}</a>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">{t('landing.footer.col2.link3') || 'Developers'}</a>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="font-bold text-stone-900 dark:text-white">{t('landing.footer.col3.title') || 'Company'}</h4>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">{t('landing.footer.col3.link1') || 'About'}</a>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">{t('landing.footer.col3.link2') || 'Careers'}</a>
                                <a className="text-stone-500 hover:text-primary text-sm" href="#">{t('landing.footer.col3.link3') || 'Contact'}</a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="pt-8 border-t border-stone-100 dark:border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-stone-400 text-xs">{t('landing.footer.copyright') || '© 2024 Smart 3D Interior. All rights reserved.'}</p>
                        <div className="flex gap-6">
                            <a className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors" href="#">
                                <span className="sr-only">Twitter</span>
                                <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84">
                                    </path>
                                </svg>
                            </a>
                            <a className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors" href="#">
                                <span className="sr-only">Instagram</span>
                                <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 4.005c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
626:                                         clipRule="evenodd"></path>
627:                                 </svg>
628:                             </a>
629:                         </div>
630:                     </div>
631:                 </div>
632:             </footer>
633:         </div>
634:     )
635: }
