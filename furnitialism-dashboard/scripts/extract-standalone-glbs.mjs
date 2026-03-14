/**
 * extract-standalone-glbs.mjs
 * 
 * Extracts individual furniture meshes from room GLB files into standalone GLB files.
 * Uses three.js GLTFLoader + GLTFExporter + DRACOLoader.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Blob } from 'buffer';

// Polyfill globals needed by three.js in Node
globalThis.Blob = Blob;
globalThis.self = globalThis;
globalThis.document = { createElementNS: () => ({}) };
globalThis.window = globalThis;

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, '../public');
const OUTPUT_DIR = resolve(PUBLIC_DIR, 'models');

// Dynamic import three.js and loaders
const THREE = await import('three');
const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
const { DRACOLoader } = await import('three/addons/loaders/DRACOLoader.js');
const { GLTFExporter } = await import('three/addons/exporters/GLTFExporter.js');

// Import draco decoder
let DRACO;
try {
  const dracoModule = await import('draco3dgltf');
  DRACO = dracoModule.default || dracoModule;
} catch (e) {
  console.warn('⚠ Could not find draco3dgltf, if the GLBs rely on it extraction might fail.');
}

// Node mapping: product ID -> { sourceGlb, nodeNames[] }
const PRODUCT_NODE_MAP = {
  'BRONDEN': {
    sourceGlb: 'kitchen-transformed.glb',
    nodeNames: ['carpet'],
  },
  'VOXLOV': {
    sourceGlb: 'kitchen-transformed.glb',
    nodeNames: ['table'],
  },
  'FANBYN': {
    sourceGlb: 'kitchen-transformed.glb',
    nodeNames: ['chairs_1', 'chairs_2'],
  },
  'LIVSVERK': {
    sourceGlb: 'kitchen-transformed.glb',
    nodeNames: ['vase'],
  },
  'SKAFTET': {
    sourceGlb: 'kitchen-transformed.glb',
    nodeNames: ['lamp_socket', 'lamp', 'lamp_cord'],
  },
  'KNOXHULT': {
    sourceGlb: 'kitchen-transformed.glb',
    nodeNames: ['kitchen'],
  },
  'SOFA': {
    sourceGlb: 'white_modern_living_room-transformed.glb',
    nodeNames: ['Sofa_Sofa_0'],
  },
  'COFFEE_TABLE': {
    sourceGlb: 'white_modern_living_room-transformed.glb',
    nodeNames: ['CoffeeTable_CoffeeTable_0'],
  },
  'TV': {
    sourceGlb: 'white_modern_living_room-transformed.glb',
    nodeNames: ['TV_TV_0', 'TVStand_TVStand_0'],
  },
  'ABSTRACT_ART': {
    sourceGlb: 'white_modern_living_room-transformed.glb',
    nodeNames: ['AbstractArt_AbstractArt_0', 'PictureFrame_Material_0'],
  },
};

// Load a GLB file and return the parsed GLTF scene
function loadGLB(filePath) {
  return new Promise((resolve, reject) => {
    const data = readFileSync(filePath);
    const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    
    const loader = new GLTFLoader();
    
    // Setup DRACOLoader if DRACO is available
    if (DRACO) {
      const dracoLoader = new DRACOLoader();
      // In Node, we need to pass a decoder instance or skip paths
      // Note: DRACOLoader in three.js usually expects a web worker path.
      // For Node, we might need a custom approach or just hope it's not compressed.
      // But since we can't easily run the WASM decoder in Node without more setup,
      // we'll try to use the draco3dgltf decoder if possible.
      dracoLoader.setDracoDecoderInstance(DRACO.createDecoderModule());
      loader.setDRACOLoader(dracoLoader);
    }
    
    loader.parse(arrayBuffer, '', (gltf) => resolve(gltf), reject);
  });
}

// Export a scene/group to GLB binary
function exportToGLB(object) {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    exporter.parse(object, (result) => {
      resolve(Buffer.from(result));
    }, reject, { binary: true });
  });
}

// Find nodes by name recursively in a scene
function findNodesByName(root, names) {
  const found = [];
  const nameSet = new Set(names);
  
  root.traverse((child) => {
    if (nameSet.has(child.name)) {
      found.push(child);
    }
  });
  
  return found;
}

async function extractProduct(productId, config, glbCache) {
  const sourcePath = resolve(PUBLIC_DIR, config.sourceGlb);
  
  if (!existsSync(sourcePath)) {
    console.warn(`  ⚠ Source GLB not found: ${config.sourceGlb}, skipping ${productId}`);
    return false;
  }

  try {
    // Load GLB
    if (!glbCache[config.sourceGlb]) {
      console.log(`  📦 Loading ${config.sourceGlb}...`);
      glbCache[config.sourceGlb] = await loadGLB(sourcePath);
    }
    
    const gltf = glbCache[config.sourceGlb];
    
    // Find matching nodes
    const matchedNodes = findNodesByName(gltf.scene, config.nodeNames);
    
    if (matchedNodes.length === 0) {
      console.warn(`  ⚠ No matching nodes for ${productId}`);
      return false;
    }

    // Create a new scene with only the matched nodes (cloned)
    const exportScene = new THREE.Scene();
    for (const node of matchedNodes) {
      exportScene.add(node.clone(true));
    }

    // Export to GLB
    const glbBuffer = await exportToGLB(exportScene);
    const outputPath = resolve(OUTPUT_DIR, `${productId}.glb`);
    writeFileSync(outputPath, glbBuffer);
    
    console.log(`  ✓ ${productId}.glb extracted`);
    return true;
  } catch (err) {
    console.error(`  ✗ Failed to extract ${productId}:`, err.message);
    return false;
  }
}

async function main() {
  console.log('🔧 Extracting standalone GLBs from room models...\n');
  
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const glbCache = {};
  let successCount = 0;
  let failCount = 0;

  for (const [productId, config] of Object.entries(PRODUCT_NODE_MAP)) {
    const success = await extractProduct(productId, config, glbCache);
    if (success) successCount++;
    else failCount++;
  }

  console.log(`\n✅ Done! ${successCount} extracted, ${failCount} failed.`);
}

main().catch(console.error);
