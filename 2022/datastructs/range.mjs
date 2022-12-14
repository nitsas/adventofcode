/**
 * A range of non-negative integers. Supports covering and overlapping.
 *
 * Initialized as a string like "2-4". Always smallest to largest.
 *
 * Usage:
 * const range1 = new Range("2-4");
 * const range2 = new Range("1-5");
 * const range3 = new Range("5-6");
 *
 * range1.covers(range2) // false
 * range2.covers(range1) // true
 * range3.covers(range1) // false
 * range3.overlaps(range1) // false
 * range3.overlaps(range2) // true
 * range2.overlaps(range3) // true
 */
export default class Range {
  // @param {String} str -
  //   A string of two non-negative integers from smallest to largest,
  //   separated by a dash. Examples: "2-4", "34-78". Not "6-2"!
  constructor(str) {
    [this.left, this.right] = str.split('-').map((s) => Number(s));
  }

  // @returns {Boolean}
  covers(other) {
    return this.left <= other.left && this.right >= other.right;
  }

  // @returns {Boolean}
  overlaps(other) {
    return this.right >= other.left && this.left <= other.right
  }

  // @returns {String}
  toString() { return `Range("${this.left}-${this.right}")`; }
}
