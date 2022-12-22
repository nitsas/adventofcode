// Usage: cat input.txt | node dayXX.mjs
// node v19.2.0

import * as readline from 'node:readline/promises';
import { stdin } from 'node:process';
import { readSection, extractArrayOf } from '../helpers.mjs';
import constructStacks from './constructStacks.mjs';

const input = readline.createInterface({ input: stdin });

let stackLines = await readSection({ input });
let stacks = constructStacks(stackLines);

for await (const line of input) {
  const [times, from, to] = extractArrayOf(/\d+/g, line).map(Number);
  const crates = [];
  for (let i = 0; i < times; i++) {
    crates.push(stacks[from-1].pop());
  }
  for (let i = 0; i < times; i++) {
    stacks[to-1].push(crates.pop());
  }
}

console.log(stacks.map((s) => s.pop()).join(''));
