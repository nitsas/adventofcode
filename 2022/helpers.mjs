// Helper functions
// node v19.2.0

// Read a section of the input.
//
// The default separator between sections is an empty line.
//
// @param {Object} options - Keyword options.
// @param {readline.Interface} options.input - The input object.
// @param {string} options.sectionSeparator - Which line separates sections?
// @returns {Array.string} All lines until the end of the current input section.
export async function readSection({ input, sectionSeparator = '' }) {
  let result = [];

  // Unfortunately we can't use for await...of because when it ends
  // it closes the iterator. So we'll iterate manually.
  let iterator = input[Symbol.asyncIterator]();
  let iteration = await iterator.next();
  while (!iteration.done && iteration.value !== sectionSeparator) {
    result.push(iteration.value);
    iteration = await iterator.next();
  }

  return result;
}

// Extract occurrences of the given regex and return them in an array.
//
// @param {String} str - A string.
// @param {RegExp} regex - What to look for within the string. Should be global.
// @returns {Array.String}
export function extractArrayOf(regex, str) {
  return Array.from(str.matchAll(regex)).map((match) => match[0]);
}
