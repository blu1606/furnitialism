import { create } from 'zustand'

export const useStore = create((set) => ({
  view: 'landing', // 'landing', 'home' (3D), 'products' (Grid)
  room: 'kitchen', // 'kitchen' or 'living-room'
  locale: 'en', // 'en' or 'vi'
  setLocale: (locale) => set({ locale }),
  isScanning: false,
  selected: null,
  orbitEnabled: false,
  cart: [],
  showCart: false,
  standaloneView: null, // null or item ID
  isSelecting: false, // For AI chat object selection
  showForge: false,
  forgeStep: 0, // 0: Idle, 1: Uploaded/Analyzing, 2: Reconstructing, 3: Texturing, 4: Done
  isLoggedIn: false,
  userEmail: '',
  setForgeStep: (step) => set({ forgeStep: step }),
  setShowForge: (show) => set({ showForge: show, forgeStep: show ? 0 : 0 }),
  setIsSelecting: (isSelecting) => set({ isSelecting }),
  setShowCart: (show) => set({ showCart: show }),
  setStandaloneView: (id) => set({ standaloneView: id }),
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setUserEmail: (userEmail) => set({ userEmail }),
  logout: () => set({ isLoggedIn: false, userEmail: '' }),
  animState: { active: false, startPos: [0, 0], endPos: [0, 0], image: null },
  triggerAnimation: (start, end, image) => set({ animState: { active: true, startPos: start, endPos: end, image: image } }),
  endAnimation: () => set({ animState: { active: false, startPos: [0, 0], endPos: [0, 0], image: null } }),
  setView: (view) => set({ view }),
  setRoom: (room) => set({ room, selected: null }),
  setScanning: (isScanning) => set({ isScanning }),
  setOrbitEnabled: (orbitEnabled) => set({ orbitEnabled }),
  setSelected: (id) => set({ selected: id }), // Just set selection, don't force view change
  addToCart: (item, startPos) => {
    set((state) => ({
      cart: [...state.cart, { ...item, timestamp: Date.now() }]
    }));
    // Trigger Animation if startPos is provided
    if (startPos) {
      const endPos = window.getCartPosition ? window.getCartPosition() : [window.innerWidth - 50, 50];
      set({ animState: { active: true, startPos: startPos, endPos: endPos, image: item.image } });
    }
  },
  removeFromCart: (timestamp) => set((state) => ({
    cart: state.cart.filter((item) => item.timestamp !== timestamp)
  })),
  clearSelected: () => set({ selected: null }),
  checkoutStep: 'none',
  setCheckoutStep: (step) => set({ checkoutStep: step }),
  clearCart: () => set({ cart: [] }),
  // Filter & Sort State
  filters: { category: 'All', priceRange: [0, 6000], searchQuery: '', has3D: false },
  sortBy: 'newest',
  setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  setSortBy: (sortBy) => set({ sortBy }),
}))

export const FURNITURE_DATA = {
  BEACH_CHAIR: {
    id: 'BEACH_CHAIR',
    name: "Coastal Beach Chair",
    category: "Chairs",
    price: 185,
    originalPrice: 220,
    rating: 4.7,
    reviewCount: 28,
    image: "/images/ar-products/beach-chair/beach-chair-1.jpeg",
    images: ["/images/ar-products/beach-chair/beach-chair-1.jpeg"],
    qrImage: "/images/ar-products/beach-chair/beach-chair-qr.png",
    description: "Ergonomic beach chair designed for ultimate relaxation. Weather-resistant and stylish.",
    specifications: [
      { label: "Material", value: "Reinforced Polymer" },
      { label: "Weatherproof", value: "Yes" }
    ],
    dimensions: "65x80x95 cm",
    stock: 18,
    has3D: true,
    hasAR: true
  },
  AR_CHAIR: {
    id: 'AR_CHAIR',
    name: "Modern Accent Chair",
    category: "Chairs",
    price: 320,
    originalPrice: 320,
    rating: 4.6,
    reviewCount: 42,
    image: "/images/ar-products/chair/chair-1.jpeg",
    images: ["/images/ar-products/chair/chair-1.jpeg"],
    qrImage: "/images/ar-products/chair/chair-qr.png",
    description: "A contemporary accent chair that blends comfort with high-end design.",
    specifications: [
      { label: "Upholstery", value: "Premium Fabric" },
      { label: "Legs", value: "Oak Wood" }
    ],
    dimensions: "70x75x85 cm",
    stock: 12,
    has3D: true,
    hasAR: true
  },
  AR_COFFEE_TABLE: {
    id: 'AR_COFFEE_TABLE',
    name: "Architectural Coffee Table",
    category: "Living Room",
    price: 550,
    originalPrice: 650,
    rating: 4.9,
    reviewCount: 15,
    image: "/images/ar-products/coffee-table/coffee-table-1.jpeg",
    images: [
      "/images/ar-products/coffee-table/coffee-table-1.jpeg",
      "/images/ar-products/coffee-table/coffee-table-2.jpeg",
      "/images/ar-products/coffee-table/coffee-table-3.jpeg"
    ],
    qrImage: "/images/ar-products/coffee-table/coffee-table-qr.png",
    description: "A stunning coffee table featuring clean lines and architectural influence.",
    specifications: [
      { label: "Surface", value: "Tempered Glass" },
      { label: "Base", value: "Powder-Coated Steel" }
    ],
    dimensions: "110x110x35 cm",
    stock: 7,
    has3D: true,
    hasAR: true
  },
  DRAWER: {
    id: 'DRAWER',
    name: "Minimalist Side Drawer",
    category: "Storage",
    price: 420,
    originalPrice: 420,
    rating: 4.4,
    reviewCount: 19,
    image: "/images/ar-products/drawer/drawer-1.jpeg",
    images: ["/images/ar-products/drawer/drawer-1.jpeg"],
    qrImage: "/images/ar-products/drawer/drawer-qr.png",
    description: "Sleek storage solution for modern living spaces. Silent-close drawers.",
    specifications: [
      { label: "Material", value: "MDF / Oak Veneer" },
      { label: "Drawers", value: "3 Units" }
    ],
    dimensions: "50x45x65 cm",
    stock: 25,
    has3D: true,
    hasAR: true
  },
  HOUSE_MODEL: {
    id: 'HOUSE_MODEL',
    name: "Architectural Model I",
    category: "Decor",
    price: 1200,
    originalPrice: 1500,
    rating: 5.0,
    reviewCount: 4,
    image: "/images/ar-products/house-model/house-model.jpeg",
    images: ["/images/ar-products/house-model/house-model.jpeg"],
    qrImage: "/images/ar-products/house-model/house-model-qr.png",
    description: "Detailed architectural model for collectors and designers.",
    specifications: [
      { label: "Scale", value: "1:50" },
      { label: "Material", value: "Resin / Acrylic" }
    ],
    dimensions: "40x40x30 cm",
    stock: 2,
    has3D: true,
    hasAR: true
  },
  HOUSE_MODEL_2: {
    id: 'HOUSE_MODEL_2',
    name: "Architectural Model II",
    category: "Decor",
    price: 1450,
    originalPrice: 1450,
    rating: 4.9,
    reviewCount: 7,
    image: "/images/ar-products/house-model-2/house-model-2.jpeg",
    images: ["/images/ar-products/house-model-2/house-model-2.jpeg"],
    qrImage: "/images/ar-products/house-model-2/house-model-2-qr.png",
    description: "A second variation of our signature architectural model series.",
    specifications: [
      { label: "Scale", value: "1:50" },
      { label: "Finish", value: "Matte White" }
    ],
    dimensions: "45x45x35 cm",
    stock: 3,
    has3D: true,
    hasAR: true
  },
  SOFA: {
    id: 'SOFA',
    name: "Urban Velvet Sofa",
    category: "Living Room",
    price: 2850,
    originalPrice: 3200,
    rating: 4.8,
    reviewCount: 65,
    image: "/images/ar-products/sofa/sofa-1.jpeg",
    images: ["/images/ar-products/sofa/sofa-1.jpeg"],
    qrImage: "/images/ar-products/sofa/sofa-qr.png",
    description: "Luxurious velvet sofa that brings elegance to any urban living room.",
    specifications: [
      { label: "Fabric", value: "Performance Velvet" },
      { label: "Filling", value: "High-Density Foam" }
    ],
    dimensions: "240x100x80 cm",
    stock: 5,
    has3D: true,
    hasAR: true
  },
  VASE: {
    id: 'VASE',
    name: "Artisan Ceramic Vase",
    category: "Decor",
    price: 125,
    originalPrice: 125,
    rating: 4.5,
    reviewCount: 34,
    image: "/images/ar-products/vase/vase-1.jpeg",
    images: ["/images/ar-products/vase/vase-1.jpeg"],
    qrImage: "/images/ar-products/vase/vase-qr.png",
    description: "Hand-crafted ceramic vase with a unique textural finish.",
    specifications: [
      { label: "Technique", value: "Hand-Thrown" },
      { label: "Finish", value: "Organic Glaze" }
    ],
    dimensions: "18x18x45 cm",
    stock: 22,
    has3D: true,
    hasAR: true
  },
  VICTORIAN_LOVESEAT: {
    id: 'VICTORIAN_LOVESEAT',
    name: "Victorian Style Loveseat",
    category: "Living Room",
    price: 1650,
    originalPrice: 1950,
    rating: 4.9,
    reviewCount: 11,
    image: "/images/ar-products/victorian-style-loveseat/victorian-style-loveseat-1.jpeg",
    images: ["/images/ar-products/victorian-style-loveseat/victorian-style-loveseat-1.jpeg"],
    qrImage: "/images/ar-products/victorian-style-loveseat/victorian-style-loveseat-qr.png",
    description: "Classical Victorian charm meet modern craftsmanship in this elegant loveseat.",
    specifications: [
      { label: "Style", value: "Neo-Victorian" },
      { label: "Frame", value: "Solid Mahogany" }
    ],
    dimensions: "160x85x95 cm",
    stock: 4,
    has3D: true,
    hasAR: true
  },
  BRÖNDEN: {
    id: 'BRÖNDEN',
    name: "BRÖNDEN Rug",
    category: "Living Room",
    price: 433,
    originalPrice: 499,
    rating: 4.8,
    reviewCount: 15,
    image: "/images/products/rug.jpg",
    images: ["/images/products/rug.jpg"],
    description: "Handmade, low pile rug. Durable and soil-resistant.",
    specifications: [
      { label: "Material", value: "100% Cotton" },
      { label: "Pile", value: "Low Pile" },
      { label: "Handmade", value: "Yes" }
    ],
    dimensions: "200x300 cm",
    stock: 12,
    has3D: true,
    hasAR: true
  },
  VOXLÖV: {
    id: 'VOXLÖV',
    name: "VOXLÖV Dining Table",
    category: "Dining Tables",
    price: 349,
    originalPrice: 349,
    rating: 4.5,
    reviewCount: 12,
    image: "/images/products/table.jpg",
    images: ["/images/products/table.jpg"],
    description: "Solid bamboo dining table with a natural, light aesthetic.",
    specifications: [
      { label: "Material", value: "Solid Bamboo" },
      { label: "Seats", value: "4-6 People" }
    ],
    dimensions: "180x90 cm",
    stock: 5,
    has3D: true,
    hasAR: false
  },
  FANBYN: {
    id: 'FANBYN',
    name: "FANBYN Chair",
    category: "Chairs",
    price: 255,
    originalPrice: 310,
    rating: 4.2,
    reviewCount: 24,
    image: "/images/products/chair.jpg",
    images: ["/images/products/chair.jpg"],
    description: "White chair with wooden legs. Comfortable and stylish.",
    specifications: [
      { label: "Leg Material", value: "Solid Eucalyptus" },
      { label: "Seat Material", value: "Polypropylene" }
    ],
    dimensions: "58x61x84 cm",
    stock: 24,
    has3D: true,
    hasAR: true
  },
  LIVSVERK: {
    id: 'LIVSVERK',
    name: "LIVSVERK Vase",
    category: "Decor",
    price: 44,
    originalPrice: 55,
    rating: 3.9,
    reviewCount: 31,
    image: "/images/products/vase.jpg",
    images: ["/images/products/vase.jpg"],
    description: "Stoneware vase, gray. Perfect for minimal interiors.",
    specifications: [
      { label: "Material", value: "Stoneware" },
      { label: "Color", value: "Gray" }
    ],
    dimensions: "21 cm height",
    stock: 45,
    has3D: true,
    hasAR: true
  },
  SKAFTET: {
    id: 'SKAFTET',
    name: "SKAFTET Floor Lamp",
    category: "Lighting",
    price: 77,
    originalPrice: 99,
    rating: 4.1,
    reviewCount: 56,
    image: "/images/products/lamp.jpg",
    images: ["/images/products/lamp.jpg"],
    description: "Modern floor lamp base with textile cord.",
    specifications: [
      { label: "Finish", value: "Gold" },
      { label: "Cord Length", value: "2.0 m" }
    ],
    dimensions: "153 cm height",
    stock: 8,
    has3D: true,
    hasAR: false
  },
  KNOXHULT: {
    id: 'KNOXHULT',
    name: "KNOXHULT Kitchen",
    category: "Kitchen",
    price: 5999,
    originalPrice: 5999,
    rating: 4.9,
    reviewCount: 5,
    image: "/images/products/kitchen.jpg",
    images: ["/images/products/kitchen.jpg"],
    description: "Complete modular kitchen setup with sink and storage.",
    specifications: [
      { label: "Modular", value: "Yes" },
      { label: "Finish", value: "White Gloss" }
    ],
    dimensions: "220x61x220 cm",
    stock: 3,
    has3D: true,
    hasAR: false
  },
  COFFEE_TABLE: {
    id: 'COFFEE_TABLE',
    name: "Modern Coffee Table",
    category: "Living Room",
    price: 499,
    originalPrice: 499,
    rating: 4.3,
    reviewCount: 8,
    image: "/images/products/table.jpg",
    images: ["/images/products/table.jpg"],
    description: "Minimalist coffee table with a sleek white finish.",
    specifications: [
      { label: "Material", value: "MDF / Lacquer" }
    ],
    dimensions: "120x60x40 cm",
    stock: 15,
    has3D: true,
    hasAR: false
  }
}
