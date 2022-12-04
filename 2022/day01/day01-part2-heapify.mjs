// Usage: cat input.txt | node dayXX.mjs

import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import Heap from './heap.mjs';

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
const topThree = [elfCalories.pop(), elfCalories.pop(), elfCalories.pop()];
console.log(sum(topThree));
