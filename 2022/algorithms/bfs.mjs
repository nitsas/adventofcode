// Breadth-first search
// node v19.2.0

// Visit and yield each node of the given tree in breadth-first order.
//
// @param {Node} root - The root node of a tree.
// @param {Array.Node} root.children - The root's children nodes from left to right.
// @yield {Node} Yields each node it visits.
export default function* bfs(root) {
  const queue = [root];
  let node;

  while (queue.length) {
    node = queue.shift();
    if (node.children) {
      for (const child of node.children) {
        queue.push(child);
      }
    }
    yield node;
  }
}
