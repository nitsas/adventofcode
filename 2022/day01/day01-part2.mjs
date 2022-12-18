// Usage: cat input.txt | node dayXX.mjs
// node v19.2.0

import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const input = readline.createInterface({ input: stdin });

const sum = (list) => list.reduce((acc, li) => acc + li, 0);

let elfCalories = [];
let currentCalories = 0;
for await (const line of input) {
  if (line !== '') {
    currentCalories += Number(line);
  } else {
    elfCalories.push(currentCalories);
    currentCalories = 0;
  }
};

console.log(sum(elfCalories.sort().reverse().slice(0, 3)));
