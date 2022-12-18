// Usage: cat input.txt | node dayXX.mjs
// node v19.2.0

import * as readline from 'node:readline/promises';
import { stdin } from 'node:process';

const input = readline.createInterface({ input: stdin });

// A is Rock
// B is Paper
// C is Scissors
const SHAPE_POINTS = { 'A': 1, 'B': 2, 'C': 3 };
const LOSE_AGAINST = { 'A': 'C', 'B': 'A', 'C': 'B' };
const BEAT = { 'A': 'B', 'B': 'C', 'C': 'A' };

// X means I need to lose
// Y means I need to draw
// Z means I need to win
const OUTCOME_POINTS = { 'X': 0, 'Y': 3, 'Z': 6 };

function myShape(opponent, outcome) {
  if (outcome === 'X') return LOSE_AGAINST[opponent];
  else if (outcome === 'Y') return opponent;
  else return BEAT[opponent];
};

function score(opponent, outcome) {
  return OUTCOME_POINTS[outcome] + SHAPE_POINTS[myShape(opponent, outcome)];
};

let totalScore = 0;
for await (const line of input) { totalScore += score(...line.split(' ')); }
console.log(totalScore);
