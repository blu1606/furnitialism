import React, { useState } from 'react';
import { useStore } from '../store';
import Rating from './Rating';
import { Eye, Box, QrCode } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { setView, setSelected, addToCart, setStandaloneView, setScanning } = useStore();

  const handleAISearch = (e) => {
    e.stopPropagation();
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setSelected(product.id);
      setView('home');
    }, 2000);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    addToCart(product, [rect.left, rect.top]);
  };

  const goToPDP = () => {
    setSelected(product.id);
    setView('pdp');
  };

  return (
    <div 
      onClick={goToPDP}
      className="product-card group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#d4a373]/5 cursor-pointer flex flex-col h-full"
    >
      <div className="aspect-[3/2] bg-[#fafaf9] relative overflow-hidden flex items-center justify-center">
        {product.has3D && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-[#d4a373] text-[#1c1917] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg flex items-center gap-1.5 opacity-90 backdrop-blur-sm">
               <span className="material-symbols-outlined text-[14px]">view_in_ar</span>
               3D / AR
            </div>
          </div>
        )}
        
        <button 
          className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-900 hover:text-[#d4a373] transition-colors shadow-sm opacity-0 group-hover:opacity-100 duration-300"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <span className="material-symbols-outlined text-xl">favorite</span>
        </button>

        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out" 
        />
        
        <div className="product-image-actions opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button className="view-details-btn" onClick={goToPDP}>
            <Eye size={16} />
            View Details
          </button>
          
          {product.has3D && (
            <>
              <button
                className="view-3d-btn"
                onClick={(e) => { e.stopPropagation(); setSelected(product.id); setView('home'); }}
              >
                <span className="material-symbols-outlined text-base">layers</span>
                Showroom
              </button>
              <button
                className="view-3d-btn"
                onClick={(e) => { e.stopPropagation(); setStandaloneView(product.id); }}
              >
                <Box size={16} />
                3D View
              </button>
              <button className="ai-search-btn" onClick={handleAISearch}>
                <span className="material-symbols-outlined text-base">search</span>
                AI Search
              </button>
              {product.hasAR && (
                <button
                  className="view-3d-btn"
                  onClick={(e) => { e.stopPropagation(); setSelected(product.id); setView('pdp'); }}
                >
                  <QrCode size={16} />
                  QR AR
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="p-6 space-y-3 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-[#d4a373] transition-colors line-clamp-2 leading-tight">{product.name}</h3>
          <div className="flex items-center text-slate-900 shrink-0">
            <span className="material-symbols-outlined text-sm fill-1 text-[#d4a373]">star</span>
            <span className="text-xs font-bold ml-1">5.0</span>
          </div>
        </div>
        
        <div className="mt-auto pt-2">
          <p className="text-xl font-bold text-slate-900 font-display mb-4">${product.price.toLocaleString()}</p>
          <button 
            className="w-full py-3 bg-[#d4a373] text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-slate-900 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, [0, 0, 0], product.image);
            }}
          >
            <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
