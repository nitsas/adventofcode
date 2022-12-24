// Usage: cat input.txt | node dayXX.mjs
// node v19.2.0

import * as readline from 'node:readline/promises';
import { stdin } from 'node:process';
import computeTreeVisibility from './computeTreeVisibility.mjs';

const input = readline.createInterface({ input: stdin });

const trees = [];
for await (const line of input) {
  trees.push(line.split('').map(Number));
}
const rows = trees.length, cols = trees[0].length;

const visible = computeTreeVisibility(trees);

let result = 0;
for (let i = 1; i < rows - 1; i++) {
  result += visible[i].reduce((acc, ai) => acc + ai, 0);
}
result += 2 * rows + 2 * cols - 4;

console.log(result);
