import create from 'zustand'

export const useStore = create((set) => ({
  view: 'home', // 'home' (3D), 'products' (Grid)
  room: 'kitchen', // 'kitchen' or 'living-room'
  isScanning: false,
  selected: null,
  orbitEnabled: false,
  cart: [],
  showCart: false,
  standaloneView: null, // null or item ID
  isSelecting: false, // For AI chat object selection
  showForge: false,
  forgeStep: 0, // 0: Idle, 1: Uploaded/Analyzing, 2: Reconstructing, 3: Texturing, 4: Done
  setForgeStep: (step) => set({ forgeStep: step }),
  setShowForge: (show) => set({ showForge: show, forgeStep: show ? 0 : 0 }),
  setIsSelecting: (isSelecting) => set({ isSelecting }),
  setShowCart: (show) => set({ showCart: show }),
  setStandaloneView: (id) => set({ standaloneView: id }),
  animState: { active: false, startPos: [0, 0], endPos: [0, 0], image: null },
  triggerAnimation: (start, end, image) => set({ animState: { active: true, startPos: start, endPos: end, image: image } }),
  endAnimation: () => set({ animState: { active: false, startPos: [0, 0], endPos: [0, 0], image: null } }),
  setView: (view) => set({ view }),
  setRoom: (room) => set({ room, selected: null }),
  setScanning: (isScanning) => set({ isScanning }),
  setOrbitEnabled: (orbitEnabled) => set({ orbitEnabled }),
  setSelected: (id) => set({ selected: id, view: 'home' }), // Auto-switch to 3D when item selected
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
  checkoutStep: 'none', // 'none', 'details', 'payment', 'success'
  setCheckoutStep: (step) => set({ checkoutStep: step }),
  clearCart: () => set({ cart: [] }),
}))

export const FURNITURE_DATA = {
  BRÖNDEN: {
    id: 'BRÖNDEN',
    name: "BRÖNDEN Rug",
    price: 433,
    image: "/images/products/rug.jpg",
    description: "Handmade, low pile rug. Durable and soil-resistant.",
    dimensions: "200x300 cm",
    stock: 12
  },
  VOXLÖV: {
    id: 'VOXLÖV',
    name: "VOXLÖV Dining Table",
    price: 349,
    image: "/images/products/table.jpg",
    description: "Solid bamboo dining table with a natural, light aesthetic.",
    dimensions: "180x90 cm",
    stock: 5
  },
  FANBYN: {
    id: 'FANBYN',
    name: "FANBYN Chair",
    price: 255,
    image: "/images/products/chair.jpg",
    description: "White chair with wooden legs. Comfortable and stylish.",
    dimensions: "58x61x84 cm",
    stock: 24
  },
  LIVSVERK: {
    id: 'LIVSVERK',
    name: "LIVSVERK Vase",
    price: 44,
    image: "/images/products/vase.jpg",
    description: "Stoneware vase, gray. Perfect for minimal interiors.",
    dimensions: "21 cm height",
    stock: 45
  },
  SKAFTET: {
    id: 'SKAFTET',
    name: "SKAFTET Floor Lamp",
    price: 77,
    image: "/images/products/lamp.jpg",
    description: "Modern floor lamp base with textile cord.",
    dimensions: "153 cm height",
    stock: 8
  },
  KNOXHULT: {
    id: 'KNOXHULT',
    name: "KNOXHULT Kitchen",
    price: 5999,
    image: "/images/products/kitchen.jpg",
    description: "Complete modular kitchen setup with sink and storage.",
    dimensions: "220x61x220 cm",
    stock: 3
  },
  COFFEE_TABLE: {
    id: 'COFFEE_TABLE',
    name: "Modern Coffee Table",
    price: 499,
    image: "/images/products/table.jpg",
    description: "Minimalist coffee table with a sleek white finish.",
    dimensions: "120x60x40 cm",
    stock: 15
  },
  SOFA: {
    id: 'SOFA',
    name: "Premium White Sofa",
    price: 2499,
    image: "/images/products/rug.jpg", // Using rug as placeholder if sofa thumb missing
    description: "Luxurious 3-seater sofa with premium fabric.",
    dimensions: "240x100x85 cm",
    stock: 4
  },
  TV: {
    id: 'TV',
    name: "OLED Smart TV 65\"",
    price: 1299,
    image: "/images/products/lamp.jpg",
    description: "High-end OLED TV with immersive picture quality.",
    dimensions: "145x83 cm",
    stock: 7
  },
  ABSTRACT_ART: {
    id: 'ABSTRACT_ART',
    name: "Abstract Canvas Art",
    price: 350,
    image: "/images/products/vase.jpg",
    description: "Contemporary abstract painting for modern spaces.",
    dimensions: "80x100 cm",
    stock: 10
  }
}

