import React, { useState } from 'react';
import { useStore, FURNITURE_DATA } from '../store';
import Rating from './Rating';
import { ChevronLeft, QrCode } from 'lucide-react';
import { ArQRCodeModal } from '../ArQRCodeModal';
import { useTranslation } from '../i18n';

const ProductDetail = () => {
  const { selected, setView, addToCart, setStandaloneView, setScanning } = useStore();
  const { t } = useTranslation();
  const product = FURNITURE_DATA[selected] || FURNITURE_DATA.FANBYN; // Fallback
  const [activeTab, setActiveTab] = useState('description');
  const [showQR, setShowQR] = useState(false);

  const handleAddToCart = (e) => {
    const rect = e.target.getBoundingClientRect();
    addToCart(product, [rect.left, rect.top]);
  };

  const handleAISearch = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setView('home')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] font-body pt-12 pb-20 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => setView('products')}
          className="flex items-center gap-2 text-slate-400 hover:text-[#d4a373] transition-all mb-10 group font-bold text-[10px] tracking-[0.2em] uppercase"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t('product_detail.back_to_collection')}
        </button>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: Visual Experience */}
          <div className="lg:w-3/5 space-y-8">
            <div className="relative aspect-[4/5] md:aspect-[16/10] bg-white rounded-3xl overflow-hidden border border-[#d4a373]/5 flex items-center justify-center p-12 group shadow-sm hover:shadow-xl transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4a373]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000 ease-out drop-shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
              />

              {product.hasAR && (
                <div className="absolute top-8 right-8 z-10 animate-in fade-in zoom-in duration-700 delay-300">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-[#d4a373]/10 shadow-2xl flex flex-col items-center gap-3 group/qr cursor-pointer hover:bg-white transition-all duration-300" onClick={() => setShowQR(true)}>
                    <div className="relative">
                      <img 
                        src={product.qrImage || `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(window.location.origin + '/ar/' + (product.id || product.name.replace(/\s+/g, '-')))}`}
                        alt="AR QR"
                        className="w-20 h-20 rounded-xl"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover/qr:opacity-100 transition-opacity rounded-xl">
                        <span className="material-symbols-outlined text-[#d4a373]">fullscreen</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-900">{t('product_detail.scan_for_ar')}</p>
                      <p className="text-[8px] font-bold text-[#d4a373] uppercase tracking-tighter">{t('product_detail.view_in_room')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images?.map((img, i) => (
                <div key={i} className="aspect-square bg-white rounded-2xl border border-[#d4a373]/5 cursor-pointer hover:border-[#d4a373]/20 transition-all p-4 group flex items-center justify-center">
                  <img src={img} className="w-full h-full object-contain opacity-30 group-hover:opacity-100 transition-all duration-300" />
                </div>
              )) || [1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-white rounded-2xl border border-[#d4a373]/5 cursor-pointer hover:border-[#d4a373]/20 transition-all p-4 group flex items-center justify-center">
                  <img src={product.image} className="w-full h-full object-contain opacity-30 group-hover:opacity-100 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Definition */}
          <div className="lg:w-2/5 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black tracking-[0.2em] text-[#d4a373] uppercase">{product.category}</span>
                <div className="w-1 h-1 rounded-full bg-slate-200" />
                <div className="flex items-center text-[#d4a373]">
                  <span className="material-symbols-outlined text-xs fill-1">star</span>
                  <span className="text-[10px] font-bold ml-1 text-slate-900">{product.rating}</span>
                </div>
              </div>
              
              <h1 className="font-display text-4xl font-bold text-slate-900 tracking-tight leading-tight uppercase">{product.name}</h1>
              <p className="text-2xl font-bold text-slate-900 font-display">${product.price.toLocaleString()}</p>
              
              <div className="pt-4 border-t border-[#d4a373]/10">
                <p className="text-slate-500 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                className="w-full py-5 bg-[#d4a373] hover:bg-slate-900 text-white font-black tracking-[0.2em] text-[11px] uppercase transition-all shadow-xl shadow-[#d4a373]/10 active:scale-[0.98] flex items-center justify-center gap-3 rounded-full"
              >
                <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                {t('product_detail.add_to_cart')}
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  className="w-full py-4 border border-slate-200 hover:border-[#d4a373] hover:text-[#d4a373] text-slate-400 font-black tracking-[0.2em] text-[11px] uppercase transition-all rounded-full"
                  onClick={() => setStandaloneView(product.id)}
                >
                  {t('product_detail.3d_standalone')}
                </button>
                <button
                  className="w-full py-4 border border-slate-200 hover:border-[#d4a373] hover:text-[#d4a373] text-slate-400 font-black tracking-[0.2em] text-[11px] uppercase transition-all rounded-full"
                  onClick={() => setView('home')}
                >
                  {t('product_detail.view_in_showroom')}
                </button>
              </div>
              <button className="w-full py-4 border border-slate-200 hover:border-[#d4a373] hover:text-[#d4a373] text-slate-400 font-black tracking-[0.2em] text-[11px] uppercase transition-all rounded-full" onClick={handleAISearch}>
                {t('product_detail.ai_search')}
              </button>
            </div>

            {/* Service Icons */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#d4a373]/5">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-slate-400">local_shipping</span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-900">{t('product_detail.white_glove')}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{t('product_detail.delivery_included')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-slate-400">verified</span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-900">{t('product_detail.lifetime')}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{t('product_detail.limited_warranty')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-32">
          <div className="flex gap-16 border-b border-black/[0.05] mb-12">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-8 text-[10px] font-black tracking-[0.3em] transition-all relative uppercase ${
                  activeTab === tab ? 'text-[#d4a373]' : 'text-black/30 hover:text-black'
                }`}
              >
                {t(`product_detail.tabs.${tab}`)}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#d4a373] rounded-full"></div>}
              </button>
            ))}
          </div>

          <div className="min-h-[300px] text-black/60 leading-relaxed text-lg font-medium">
            {activeTab === 'description' && (
              <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <p>{t('product_detail.description_p1', { name: product.name })}</p>
                <p>{t('product_detail.description_p2')}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-6 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                {product.specifications?.map((spec, i) => (
                  <div key={i} className="flex justify-between py-6 border-b border-black/[0.05]">
                    <span className="font-black text-black/20 tracking-wider text-[10px] uppercase">{spec.label}</span>
                    <span className="text-[#1c1917] font-bold">{spec.value}</span>
                  </div>
                ))}
                <div className="flex justify-between py-6 border-b border-black/[0.05]">
                  <span className="font-black text-black/20 tracking-wider text-[10px] uppercase">{t('product_detail.dimensions')}</span>
                  <span className="text-[#1c1917] font-bold">{product.dimensions}</span>
                </div>
                <div className="flex justify-between py-6 border-b border-black/[0.05]">
                  <span className="font-black text-black/20 tracking-wider text-[10px] uppercase">{t('product_detail.model_code')}</span>
                  <span className="text-[#1c1917] font-bold">FRN-2024-{product.id}-X</span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-16 bg-white border border-black/5 p-12 rounded-[40px] shadow-sm">
                   <div className="text-center">
                      <p className="text-7xl font-black text-[#1c1917] mb-4 tracking-tighter">{product.rating}</p>
                      <Rating value={product.rating} showCount={false} />
                      <p className="text-[10px] font-black text-black/30 mt-6 tracking-[0.2em]">{t('product_detail.based_on_reviews', { count: product.reviewCount })}</p>
                   </div>
                   <div className="flex-1 space-y-4">
                      {[5,4,3,2,1].map(s => (
                        <div key={s} className="flex items-center gap-6">
                          <span className="text-[10px] font-black text-black/20 w-6">{s}★</span>
                          <div className="flex-1 h-2 bg-black/5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#d4a373] rounded-full" style={{ width: `${s === 5 ? '85%' : s === 4 ? '10%' : '5%'}` }}></div>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ArQRCodeModal isOpen={showQR} onClose={() => setShowQR(false)} productName={product.name} productId={product.id} />
    </div>
  );
};

export default ProductDetail;
