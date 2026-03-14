import React from 'react';
import { useStore } from '../store';

const Header = () => {
    const { view, setView, setShowCart, cart, setShowForge, filters, setFilters } = useStore();

    const categories = [
        { id: 'All', label: 'All' },
        { id: 'Living Room', label: 'Living Room' },
        { id: 'Chairs', label: 'Chairs' },
        { id: 'Dining Tables', label: 'Dining Tables' },
        { id: 'Kitchen', label: 'Kitchen' },
        { id: 'Decor', label: 'Decor' },
        { id: 'Lighting', label: 'Lighting' }
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#d4a373]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-8">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
                        <span className="material-symbols-outlined text-[#d4a373] text-3xl">chair</span>
                        <h1 className="font-display text-xl font-bold tracking-tight text-slate-900 leading-none">
                            FURNITIALISM<br /><span className="text-[#d4a373] text-sm tracking-[0.2em]">Smart 3D Interior</span>
                        </h1>
                    </div>

                    {view !== 'home' && (
                        <div className="flex-1 max-w-xl hidden md:block">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                <input
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#fafaf9] border-none rounded-xl focus:ring-2 focus:ring-[#d4a373]/50 transition-all placeholder:text-slate-400 text-sm"
                                    placeholder="Search curated collections..."
                                    type="text"
                                    value={filters.searchQuery}
                                    onChange={(e) => setFilters({ searchQuery: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-6">
                        <button className="hidden lg:flex items-center gap-1 hover:text-[#d4a373] transition-colors" onClick={() => setView('home')}>
                            <span className="material-symbols-outlined">explore</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">Showroom</span>
                        </button>
                        <button className="hidden lg:flex items-center gap-1 hover:text-[#d4a373] transition-colors" onClick={() => setShowForge(true)}>
                            <span className="material-symbols-outlined">auto_awesome</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">AI Forge</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-[#d4a373] transition-colors group" onClick={() => setView('products')}>
                            <span className="material-symbols-outlined">person</span>
                            <span className="text-xs font-semibold hidden lg:block uppercase tracking-wider">Account</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-[#d4a373] transition-colors" onClick={() => setView('products')}>
                            <span className="material-symbols-outlined">package</span>
                            <span className="text-xs font-semibold hidden lg:block uppercase tracking-wider">Orders</span>
                        </button>
                        <button 
                            className="flex items-center gap-1 hover:text-[#d4a373] transition-colors relative"
                            onClick={() => setShowCart(true)}
                        >
                            <span className="material-symbols-outlined">shopping_cart</span>
                            <span className="text-xs font-semibold hidden lg:block uppercase tracking-wider">Cart</span>
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#d4a373] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Sub-menu (Only show when in shop view) */}
            {(view === 'products' || view === 'pdp') && (
                <nav className="bg-white/50 border-t border-[#d4a373]/5 py-3">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-center gap-10 text-sm font-medium uppercase tracking-widest text-slate-600 overflow-x-auto no-scrollbar whitespace-nowrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`pb-1 transition-all ${
                                        (cat.id === filters.category) ? 'text-[#d4a373] border-b-2 border-[#d4a373]' : 'hover:text-[#d4a373]'
                                    }`}
                                    onClick={() => {
                                        setFilters({ category: cat.id });
                                        setView('products');
                                    }}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
