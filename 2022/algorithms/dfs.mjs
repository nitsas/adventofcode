// Depth-first search
// node v19.2.0

// Visit and yield each node of the given tree in depth-first order.
//
// @param {Node} root - The root node of a tree.
// @param {Array.Node} root.children - The root's children nodes from left to right.
// @yield {Node} Yields each node it visits.
export default function* dfs(root) {
  const queue = [root];
  let node;

  while (queue.length) {
    node = queue.pop();
    if (node.children) {
      // push children onto the stack, from right to left child
      for (let i = node.children.length - 1; i >= 0; i--) {
        queue.push(node.children[i]);
      }
    }
    yield node;
  }
}
