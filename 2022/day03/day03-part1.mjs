// Usage: cat input.txt | node dayXX.mjs
//
// Set.prototype.push() and Set.prototype.has() take O(1) time,
// so the total solution takes O(n * k) time and O(k) space, where:
// - n is the number of input lines
// - k is the max length of each line

import * as readline from 'node:readline/promises';
import { stdin } from 'node:process';

const input = readline.createInterface({ input: stdin });

function priorityOf(char) {
  const charCode = char.charCodeAt();
  if (charCode < 97) return charCode - 38;
  else return charCode - 96;
}

function findDuplicate(comp1, comp2) {
  const comp1Set = new Set(comp1);
  for (const item of comp2) {
    if (comp1Set.has(item)) return item;
  };
}

let sumPriorities = 0;
for await (const rucksack of input) {
  const comp1 = rucksack.slice(0, rucksack.length / 2);
  const comp2 = rucksack.slice(rucksack.length / 2);
  let duplicateItem = findDuplicate(comp1, comp2);
  sumPriorities += priorityOf(duplicateItem);
}
console.log(sumPriorities);
