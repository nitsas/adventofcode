// Usage: cat input.txt | node dayXX.mjs
// node v19.2.0

import * as readline from 'node:readline/promises';
import { stdin } from 'node:process';
import markerIndex from './markerIndex.mjs';

const input = readline.createInterface({ input: stdin });

for await (const line of input) {
  console.log(markerIndex(line, 14));
}
