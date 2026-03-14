/**
 * extract-standalone-glbs-v3.mjs
 * 
 * Re-attempts extraction using @gltf-transform/core but with a more robust
 * approach to avoid version conflicts and handling the Draco data if present.
 */

import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune, dedup } from '@gltf-transform/functions';
import fs from 'fs';
import path from 'path';

// Note: To handle Draco in Node with @gltf-transform, we need a draco decoder.
// But as we've seen, adding it manually is tricky. 
// However, maybe we can just use the CLI tool to decompress first?
// Let's try to run `npx gltf-pipeline -i input.glb -o output.glb -d` 
// (wait, I tried that and it failed).

const PUBLIC_DIR = './public';
const OUTPUT_DIR = './public/models';

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
  console.log('🔧 Starting Extraction (v3)...');
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // We'll use a very simple NodeIO without Draco registered 
  // to see if the files can be read without it. 
  // If they really don't have Draco data (just the header), it might work.
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
  const cache = {};

  for (const [productId, config] of Object.entries(PRODUCT_NODE_MAP)) {
    try {
      const sourcePath = path.join(PUBLIC_DIR, config.sourceGlb);
      if (!fs.existsSync(sourcePath)) continue;

      if (!cache[config.sourceGlb]) {
        console.log(`  📦 Loading ${config.sourceGlb}...`);
        cache[config.sourceGlb] = await io.read(sourcePath);
      }

      const doc = cache[config.sourceGlb].clone();
      const scene = doc.getRoot().listScenes()[0];
      const allNodes = doc.getRoot().listNodes();
      const targetNodes = allNodes.filter(n => config.nodeNames.includes(n.getName()));

      if (targetNodes.length === 0) {
        console.warn(`  ⚠ Nodes not found for ${productId}`);
        continue;
      }

      // Isolate logic
      const nodesToKeep = new Set();
      const mark = (node) => { nodesToKeep.add(node); node.listChildren().forEach(mark); };
      targetNodes.forEach(mark);

      scene.listChildren().forEach(child => {
        if (!nodesToKeep.has(child)) scene.removeChild(child);
      });

      await doc.transform(prune(), dedup());

      const outputPath = path.join(OUTPUT_DIR, `${productId}.glb`);
      await io.write(outputPath, doc);
      console.log(`  ✓ Created ${productId}.glb`);

    } catch (err) {
      console.error(`  ✗ Failed ${productId}:`, err.message);
    }
  }
}

main();
