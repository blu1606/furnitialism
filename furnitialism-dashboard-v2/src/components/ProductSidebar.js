import React from 'react';
import { useStore } from '../store';
import { Filter, ChevronRight, Box, Camera, Coins } from 'lucide-react';
import { useTranslation } from '../i18n';

const ProductSidebar = () => {
  const { filters, setFilters } = useStore();
  const { t } = useTranslation();

  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category });
  };

  const categories = [
    { id: 'All', label: t('sidebar.categories.all') },
    { id: 'Living Room', label: t('sidebar.categories.living_room') },
    { id: 'Chairs', label: t('sidebar.categories.chairs') },
    { id: 'Dining Tables', label: t('sidebar.categories.dining_tables') },
    { id: 'Kitchen', label: t('sidebar.categories.kitchen') },
    { id: 'Decor', label: t('sidebar.categories.decor') },
    { id: 'Lighting', label: t('sidebar.categories.lighting') }
  ];

  return (
    <aside className="lg:w-1/5 space-y-8">
      <div className="glass p-6 rounded-xl space-y-8 sticky top-32 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]">
        <h2 className="font-display text-lg font-bold border-b border-[#d4a373]/10 pb-4 text-[#1c1917]">{t('sidebar.filters')}</h2>
        
        {/* Category */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#d4a373]">{t('sidebar.category')}</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-3 cursor-pointer group w-full text-left transition-all ${
                  filters.category === cat.id ? "text-[#d4a373] font-bold" : "text-slate-500 hover:text-[#d4a373]"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  filters.category === cat.id ? "bg-[#d4a373] scale-150" : "bg-slate-300"
                }`} />
                <span className="text-sm transition-colors">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#d4a373]">{t('sidebar.price_range')}</h3>
          <div className="relative pt-6 px-2">
            <input 
              type="range" 
              min="0" 
              max="6000" 
              step="100"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
              className="w-full accent-[#d4a373] bg-[#d4a373]/20 h-1 rounded-full appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-xs font-medium text-slate-500">
            <span>$0</span>
            <span>${filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Experience / 3D Toggle */}
        <div className="flex items-center justify-between pt-4 border-t border-[#d4a373]/5">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#d4a373]">{t('sidebar.3d_ready')}</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={filters.has3D}
              onChange={() => setFilters({ ...filters, has3D: !filters.has3D })}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4a373]"></div>
          </label>
        </div>
      </div>

      {/* Concierge Card */}
      <div className="glass p-6 rounded-xl border border-[#d4a373]/10 flex items-center gap-4 group cursor-help transition-all hover:shadow-lg">
        <div className="w-11 h-11 rounded-xl bg-[#d4a373]/10 flex items-center justify-center text-[#d4a373] group-hover:bg-[#d4a373] group-hover:text-white transition-all duration-500">
          <ChevronRight size={20} />
        </div>
        <div>
          <p className="text-[11px] font-black text-[#1c1917] uppercase tracking-wider">{t('sidebar.concierge')}</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{t('sidebar.instant_analysis')}</p>
        </div>
      </div>
    </aside>
  );
};

export default ProductSidebar;
