#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

const CGV_PATH = 'src/content/legal/cgv.md';
const META_PATH = 'src/content/legal/cgv-meta.json';

const stagedFiles = execSync('git diff --cached --name-only')
  .toString()
  .split('\n')
  .map((file) => file.trim())
  .filter(Boolean);

if (stagedFiles.includes(CGV_PATH)) {
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(META_PATH, `${JSON.stringify({ lastUpdated: today }, null, 2)}\n`);
  execSync(`git add ${META_PATH}`);
  console.log(`${META_PATH}: lastUpdated → ${today}`);
}
