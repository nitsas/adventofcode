// Usage: cat input.txt | node dayXX.mjs
// node v19.2.0

import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import Heap from '../datastructs/heap.mjs';

const input = readline.createInterface({ input: stdin });

const sum = (list) => list.reduce((acc, li) => acc + li, 0);

let elfCalories = new Heap();
let currentCalories = 0;
for await (const line of input) {
  if (line !== '') {
    currentCalories += Number(line);
  } else {
    elfCalories.push(currentCalories);
    currentCalories = 0;
  }
};

const topThree = [elfCalories.pop(), elfCalories.pop(), elfCalories.pop()];
console.log(sum(topThree));
