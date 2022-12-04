// Usage: cat input.txt | node dayXX.mjs

import * as readline from 'node:readline/promises';
import { stdin } from 'node:process';

const input = readline.createInterface({ input: stdin });

const SHAPE_POINTS = { 'X': 1, 'Y': 2, 'Z': 3 };
const BEATS = { 'X': 'C', 'Y': 'A', 'Z': 'B' };
const DRAWS = { 'X': 'A', 'Y': 'B', 'Z': 'C' };

function outcome([opponent, me]) {
  if (BEATS[me] === opponent) return 6;
  else if (DRAWS[me] === opponent) return 3;
  else return 0;
};

function score([opponent, me]) {
  return SHAPE_POINTS[me] + outcome([opponent, me]);
};

let totalScore = 0;
for await (const line of input) { totalScore += score(line.split(' ')); }
console.log(totalScore);
