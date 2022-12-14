// Usage: cat input.txt | node dayXX.mjs

import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import Heap from '../datastructs/heap.mjs';

const input = readline.createInterface({ input: stdin });

const sum = (list) => list.reduce((acc, li) => acc + li, 0);

const elfCalories = [];
let currentCalories = 0;
for await (const line of input) {
  if (line !== '') {
    currentCalories += Number(line);
  } else {
    elfCalories.push(currentCalories);
    currentCalories = 0;
  }
};

const heap = Heap.from(elfCalories);
const topThree = [heap.pop(), heap.pop(), heap.pop()];
console.log(sum(topThree));
