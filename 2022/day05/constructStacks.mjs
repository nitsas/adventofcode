// Helper functions
// node v19.2.0

import { extractArrayOf } from '../helpers.mjs';

export default function constructStacks(stackLines) {
  const stackNames = extractArrayOf(/\d+/g, stackLines.pop()).map(Number);
  const stacks = stackNames.map((sn) => []);

  stackLines = stackLines.reverse();
  for (const line of stackLines) {
    for (let i = 1; i < line.length; i += 4) {
      const crate = line[i];
      if (crate !== ' ') { stacks[(i-1)/4].push(crate) }
    }
  }

  return stacks;
}
