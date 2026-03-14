/**
 * extract-standalone-glbs-v2.mjs
 * 
 * Uses @gltf-transform/core + all common extensions to extract meshes.
 * This is more robust than the three.js approach in Node because it doesn't
 * need a full DOM/Canvas polyfill.
 */

import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune, dedup } from '@gltf-transform/functions';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = './public';
const OUTPUT_DIR = './public/models';

// Node mapping: product ID -> { sourceGlb, nodeNames[] }
const PRODUCT_NODE_MAP = {
  'BRONDEN': { sourceGlb: 'kitchen-transformed.glb', nodeNames: ['carpet'] },
  'VOXLOV': { sourceGlb: 'kitchen-transformed.glb', nodeNames: ['table'] },
  'FANBYN': { sourceGlb: 'kitchen-transformed.glb', nodeNames: ['chairs_1', 'chairs_2'] },
  'LIVSVERK': { sourceGlb: 'kitchen-transformed.glb', nodeNames: ['vase'] },
  'SKAFTET': { sourceGlb: 'kitchen-transformed.glb', nodeNames: ['lamp_socket', 'lamp', 'lamp_cord'] },
  'KNOXHULT': { sourceGlb: 'kitchen-transformed.glb', nodeNames: ['kitchen'] },
  'SOFA': { sourceGlb: 'white_modern_living_room-transformed.glb', nodeNames: ['Sofa_Sofa_0'] },
  'COFFEE_TABLE': { sourceGlb: 'white_modern_living_room-transformed.glb', nodeNames: ['CoffeeTable_CoffeeTable_0'] },
  'TV': { sourceGlb: 'white_modern_living_room-transformed.glb', nodeNames: ['TV_TV_0', 'TVStand_TVStand_0'] },
  'ABSTRACT_ART': { sourceGlb: 'white_modern_living_room-transformed.glb', nodeNames: ['AbstractArt_AbstractArt_0', 'PictureFrame_Material_0'] },
};

async function main() {
  console.log('🔧 Starting Extraction (v2)...');
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
  const cache = {};

  for (const [productId, config] of Object.entries(PRODUCT_NODE_MAP)) {
    try {
      const sourcePath = path.join(PUBLIC_DIR, config.sourceGlb);
      if (!fs.existsSync(sourcePath)) {
        console.warn(`  ⚠ ${config.sourceGlb} not found`);
        continue;
      }

      if (!cache[config.sourceGlb]) {
        console.log(`  📦 Loading ${config.sourceGlb}...`);
        cache[config.sourceGlb] = await io.read(sourcePath);
      }

      const doc = cache[config.sourceGlb].clone();
      const root = doc.getRoot();
      const scene = root.listScenes()[0];

      // Keep only the target nodes (and their descendants)
      const nodesToKeep = new Set();
      const allNodes = doc.getRoot().listNodes();
      
      const targetNodes = allNodes.filter(n => config.nodeNames.includes(n.getName()));
      
      if (targetNodes.length === 0) {
        console.warn(`  ⚠ Nodes not found for ${productId}: ${config.nodeNames.join(', ')}`);
        continue;
      }

      // Mark target nodes and their children
      const mark = (node) => {
        nodesToKeep.add(node);
        node.listChildren().forEach(mark);
      };
      targetNodes.forEach(mark);

      // Remove all other root-level nodes from the scene
      scene.listChildren().forEach(child => {
        if (!nodesToKeep.has(child)) {
          scene.removeChild(child);
        }
      });

      // Cleanup unused assets (meshes, materials, textures, buffers)
      await doc.transform(
        prune(),
        dedup()
      );

      const outputPath = path.join(OUTPUT_DIR, `${productId}.glb`);
      await io.write(outputPath, doc);
      console.log(`  ✓ Created ${productId}.glb`);

    } catch (err) {
      console.error(`  ✗ Failed ${productId}:`, err.message);
    }
  }
}

main();
