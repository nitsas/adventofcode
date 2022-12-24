// node v19.2.0

export default class Rope {
  #head = [0, 0];
  #tail = [0, 0];

  constructor() {}

  get head() { return this.#head; }
  get tail() { return this.#tail; }

  // @param {'R', 'L', 'U', 'D'} direction - The direction to move.
  moveHead(direction) {
    if (direction === 'R') this.#head[1] += 1;
    else if (direction === 'L') this.#head[1] -= 1;
    else if (direction === 'U') this.#head[0] += 1;
    else if (direction === 'D') this.#head[0] -= 1;

    if (this.length >= 2) this.#updateTail(direction);
  }

  #updateTail(direction) {
    if (direction === 'R') {
      this.#tail[0] = this.#head[0]
      this.#tail[1] = this.#head[1] - 1;
    } else if (direction === 'L') {
      this.#tail[0] = this.#head[0]
      this.#tail[1] = this.#head[1] + 1;
    } else if (direction === 'U') {
      this.#tail[0] = this.#head[0] - 1;
      this.#tail[1] = this.#head[1];
    } else if (direction === 'D') {
      this.#tail[0] = this.#head[0] + 1;
      this.#tail[1] = this.#head[1];
    }
  }

  get length() {
    const xDist = this.#head[0] - this.#tail[0];
    const yDist = this.#head[1] - this.#tail[1];

    return Math.sqrt(xDist ** 2 + yDist ** 2);
  }
}
