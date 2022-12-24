// Usage: cat input.txt | node dayXX.mjs
// node v19.2.0

import * as readline from 'node:readline/promises';
import { stdin } from 'node:process';
import dfs from '../algorithms/dfs.mjs';
import buildFilesystem from './buildFilesystem.mjs';

const input = readline.createInterface({ input: stdin });

const filesystem = await buildFilesystem(input);

console.log('Filesystem:');
console.log(filesystem);

const smallDirMaxSize = 100000
let totalSizeSmallDirs = 0;
for (const node of dfs(filesystem)) {
  if (node.type === 'dir' && node.size <= smallDirMaxSize) {
    totalSizeSmallDirs += node.size
  }
}
console.log('Answer:', totalSizeSmallDirs);
