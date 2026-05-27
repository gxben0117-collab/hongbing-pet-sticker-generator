import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outputDir = join(root, 'output');

if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

const html = readFileSync(join(root, 'index.html'), 'utf8');

// Validate required sections
const required = [
  '<div class="page">',
  'function combineAll()',
  'function initPresets()',
  'localStorage',
  'function showToast(',
  'script-panel',
  '@media (max-width',
  'fab-top',
];
const missing = required.filter(s => !html.includes(s));
if (missing.length) {
  console.error('Build failed — missing expected sections:');
  missing.forEach(s => console.error(`  ✗ ${s}`));
  process.exit(1);
}

// Validate no obvious JS bugs
const bugs = [];
if (html.includes('custom-color-item')) bugs.push('custom-color-item class without CSS definition');
if (!html.includes('layoutData[state.layoutStyle]||layoutData.random')) bugs.push('layoutData missing fallback');
if (!html.includes('bgData[state.bgStyle]||bgData.white')) bugs.push('bgData missing fallback');

if (bugs.length) {
  console.error('Build warnings — potential bugs:');
  bugs.forEach(b => console.error(`  ⚠ ${b}`));
}

// Extract version
const versionMatch = html.match(/v(\d+\.\d+)/);
const version = versionMatch ? versionMatch[1] : 'unknown';

writeFileSync(join(outputDir, 'index.html'), html, 'utf8');

const sizeKB = (html.length / 1024).toFixed(1);
console.log(`✓ Build complete → output/index.html`);
console.log(`  Version: v${version} | Size: ${sizeKB} KB`);
if (bugs.length === 0) console.log('  ✓ No known bugs detected');
