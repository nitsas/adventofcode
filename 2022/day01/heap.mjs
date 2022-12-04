/**
 * A binary heap (max or min heap).
 *
 * It allows for fast extract-max or extract-min operations in O(log(n)).
 * It can contain any kind of object, as long as you initialize it
 * with a suitable function that can compare those objects.
 *
 * Usage:
 * let heap = new Heap();               // max-heap
 * let heap = new Heap(Heap.MIN_FIRST); // min-heap
 * // custom comparison function:
 * let aAboveB = (a, b) => a.weight >= b.weight;
 * let heap = new Heap(aAboveB);
 *
 * heap.push(item); // add an item onto the heap
 * heap.pop(item);  // pop the top item from the heap
 * heap.length;     // get the heap's size
 */
export default class Heap {
  // A simple comparison function for a max-heap:
  static MAX_FIRST = (a, b) => a >= b;

  // A simple comparison function for a min-heap:
  static MIN_FIRST = (a, b) => a <= b;

  // Initialize a heap from an iterable. Default: max heap.
  //
  // Heapifies the iterable in O(log(n)) time!
  //
  // @param {Object} iterable - An object that works with Array.prototype.from().
  // @param {Function} above -
  //   The function to use to compare two items a, b inside the heap.
  //   Return true if the 1st element should be "above" the 2nd in the heap.
  // @returns {Heap}
  static from(iterable, above = this.constructor.MAX_FIRST) {
    const heap = new Heap(above);
    heap._heap = Array.from(iterable);
    heap._heapify();
    return heap;
  }

  // Initialize a max or min heap. Default: max heap.
  //
  // @param {Function} above -
  //   The function to use to compare two items a, b inside the heap.
  //   Return true if the 1st element should be "above" the 2nd in the heap.
  // @constructor
  constructor(above = this.constructor.MAX_FIRST) {
    this._heap = [];
    this._above = above;
  }

  // --- Illustration ---
  //
  // this._heap: [a, b, c, d, e, f, g]
  //
  // The binary tree:
  //    a
  //  b   c
  // d e f g
  //
  // The indices:
  //    0
  //  1   2
  // 3 4 5 6

  // @param {Object} item - Push a new item into the heap.
  // @returns {Heap} `this`
  push(item) {
    // Add the new item at the bottom and bubble it up to restore the heap property.
    this._heap.push(item);
    const index = this._heap.length - 1;
    this._bubbleUp(index);

    return this;
  }

  // @returns {Item} Pop the max/min element from the heap.
  pop() {
    if (this.length === 1) return this._heap.pop();

    // The min/max item is at the top of the heap. Remember it.
    const result = this._heap[0];

    // Move the last item to the top of the heap and bubble it down to
    // restore the heap property.
    this._heap[0] = this._heap.pop();
    this._bubbleDown(0);

    return result;
  }

  // peek() { return this._heap[0]; }
  get length() { return this._heap.length; }

  _bubbleUp(index) {
    if (index <= 0) return;

    const parentIndex = Math.floor((index - 1) / 2);
    const item = this._heap[index];
    const parent = this._heap[parentIndex];
    if (this._above(item, parent)) {
      [this._heap[parentIndex], this._heap[index]] = [item, parent];
      this._bubbleUp(parentIndex);
    }
  }

  _bubbleDown(index) {
    const leftChildIndex = (index * 2) + 1;
    if (leftChildIndex >= this.length) return;
    const rightChildIndex = (index * 2) + 2;

    const item = this._heap[index];
    const leftChild = this._heap[leftChildIndex];
    const rightChild = this._heap[rightChildIndex];

    if (rightChildIndex < this.length && this._above(rightChild, leftChild)) {
      if (this._above(item, rightChild)) return;
      // else
      [this._heap[index], this._heap[rightChildIndex]] = [rightChild, item];
      this._bubbleDown(rightChildIndex);
    } else if (this._above(leftChild, item)) {
      [this._heap[index], this._heap[leftChildIndex]] = [leftChild, item];
      this._bubbleDown(leftChildIndex);
    }
  }

  _heapify() {
    const halfPoint = Math.floor((this.length - 1) / 2);
    for (let i = halfPoint; i >= 0; i--) {
      this._bubbleDown(i);
    };
  }
};
