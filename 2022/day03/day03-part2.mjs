// Usage: cat input.txt | node dayXX.mjs
// node v19.2.0
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

function findDuplicates(sack1, sack2) {
  const sack1Set = new Set(sack1);
  const duplicates = [];
  for (const item of sack2) {
    if (sack1Set.has(item)) duplicates.push(item);
  };
  return duplicates;
}

function groupBadge(sack1, sack2, sack3) {
  const duplicates12 = new Set(findDuplicates(sack1, sack2));
  for (const item of sack3) {
    if (duplicates12.has(item)) return item;
  };
}

let sumPriorities = 0;
let group = [];
for await (const rucksack of input) {
  group.push(rucksack);
  if (group.length === 3) {
    sumPriorities += priorityOf(groupBadge(...group));
    group = [];
  }
}
console.log(sumPriorities);
