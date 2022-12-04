// Usage: cat input.txt | node dayXX.mjs

import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const input = readline.createInterface({ input: stdin });

let maxCalories = 0;
let currentCalories = 0;
for await (const line of input) {
  if (line !== '') {
    currentCalories += Number(line);
  } else {
    maxCalories = Math.max(maxCalories, currentCalories);
    currentCalories = 0;
  }
}

console.log(maxCalories);
