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

function scenicScore(row, col) {
  const height = trees[row][col];
  let vdLeft = 0, vdRight = 0, vdUp = 0, vdDown = 0;

  for (let j = col - 1; j >= 0; j--) {
    vdLeft += 1;
    if (trees[row][j] >= height) break;
  }
  for (let j = col + 1; j < cols; j++) {
    vdRight += 1;
    if (trees[row][j] >= height) break;
  }
  for (let i = row - 1; i >= 0; i--) {
    vdUp += 1;
    if (trees[i][col] >= height) break;
  }
  for (let i = row + 1; i < rows; i++) {
    vdDown += 1;
    if (trees[i][col] >= height) break;
  }

  return vdLeft * vdRight * vdUp * vdDown;
}

let maxScenicScore = 0;
for (let i = 1; i < rows - 1; i++) {
  for (let j = 1; j < cols - 1; j++) {
    let ss = scenicScore(i, j);
    if (ss > maxScenicScore) maxScenicScore = ss;
  }
}

console.log(maxScenicScore);
