import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const banned = [
  /localStorage/i,
  /sessionStorage/i,
  /indexedDB/i,
  /persistent cookies?/i,
  /\baddress\b/i,
  /phone number/i,
  /national id/i,
  /death will come/i,
  /deliver judgment/i,
  /execution/i,
  /judgment completed/i,
  /under trial/i,
  /takedown bypass/i,
  /self-spreading/i,
  /hidden persistence/i,
  /unremovable website/i,
];
const allowFiles = new Set(['README.md', 'CONTRIBUTING.md']);
const scanExt = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.json', '.md']);

function ext(name) {
  const idx = name.lastIndexOf('.');
  return idx >= 0 ? name.slice(idx) : '';
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    const rel = relative(root, full);
    if (['node_modules', 'dist', '.git', 'coverage'].some((skip) => rel.startsWith(skip))) return [];
    if (statSync(full).isDirectory()) return walk(full);
    if (!scanExt.has(ext(name))) return [];
    return [full];
  });
}

const cinematicAllowlist = [
  'After verification, death will come to deliver judgment.',
  'after verification, death will come to deliver judgment',
];

const failures = [];
for (const file of walk(root)) {
  const rel = relative(root, file);
  if (allowFiles.has(rel)) continue;
  let text = readFileSync(file, 'utf8');
  for (const allowed of cinematicAllowlist) text = text.replaceAll(allowed, '');
  for (const pattern of banned) {
    if (pattern.test(text)) failures.push(`${rel}: banned pattern ${pattern}`);
  }
}

if (failures.length) {
  console.error('Safety check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Safety check passed: no banned storage/private-data/vigilante patterns in app code.');
