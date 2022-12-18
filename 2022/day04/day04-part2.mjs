// Usage: cat input.txt | node dayXX.mjs
// node v19.2.0

import * as readline from 'node:readline/promises';
import { stdin } from 'node:process';
import Range from '../datastructs/range.mjs';

const input = readline.createInterface({ input: stdin });

let numOverlappingRanges = 0;
for await (const line of input) {
  const [range1, range2] = line.split(',').map((rangeStr) => new Range(rangeStr));
  if (range1.overlaps(range2)) {
    numOverlappingRanges += 1;
  }
}

console.log(numOverlappingRanges);
