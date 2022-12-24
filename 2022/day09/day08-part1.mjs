// Usage: cat input.txt | node dayXX.mjs
// node v19.2.0

import * as readline from 'node:readline/promises';
import { stdin } from 'node:process';
import Rope from './Rope.mjs';

const input = readline.createInterface({ input: stdin });

const rope = new Rope();
const tailPositions = new Set();
tailPositions.add(rope.tail.toString());
for await (const line of input) {
  const [direction, steps] = line.split(' ');
  for (let i = 0; i < steps; i++) {
    rope.moveHead(direction, steps);
    tailPositions.add(rope.tail.toString());
  }
}

console.log(tailPositions.size);
