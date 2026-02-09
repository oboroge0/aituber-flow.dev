/**
 * Post-build script for Cloudflare Pages deployment
 *
 * Copies demo page HTML to non-conflicting paths so that
 * _redirects can rewrite /editor/* without infinite loops.
 *
 * Problem: /editor/* → /editor/demo/index.html causes an infinite loop
 *          because Cloudflare normalizes the target back to /editor/demo/
 *          which re-matches /editor/*.
 *
 * Solution: Copy to /_spa/editor.html etc., then rewrite to those paths.
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

const copies = [
  { src: 'editor/demo/index.html', dest: '_spa/editor.html' },
  { src: 'preview/demo/index.html', dest: '_spa/preview.html' },
  { src: 'overlay/demo/index.html', dest: '_spa/overlay.html' },
];

// Create _spa directory
fs.mkdirSync(path.join(outDir, '_spa'), { recursive: true });

for (const { src, dest } of copies) {
  const srcPath = path.join(outDir, src);
  const destPath = path.join(outDir, dest);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} → ${dest}`);
  } else {
    console.warn(`Warning: ${src} not found, skipping`);
  }
}

console.log('Post-build complete.');
