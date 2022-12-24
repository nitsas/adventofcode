// node v19.2.0

export default function computeTreeVisibility(trees) {
  const rows = trees.length, cols = trees[0].length;

  const visible = [];
  for (let i = 0; i < rows; i++) {
    visible.push(Array(cols).fill(0));
  }

  for (let i = 1; i < rows - 1; i++) {
    let height = trees[i][0];
    for (let j = 1; j < cols - 1; j++) {
      if (trees[i][j] > height) {
        visible[i][j] = 1;
        height = trees[i][j];
      }
    }

    height = trees[i][cols - 1];
    for (let j = cols - 2; j > 0; j--) {
      if (trees[i][j] > height) {
        visible[i][j] = 1;
        height = trees[i][j];
      }
    }
  }

  for (let j = 1; j < cols - 1; j++) {
    let height = trees[0][j];
    for (let i = 1; i < rows - 1; i++) {
      if (trees[i][j] > height) {
        visible[i][j] = 1;
        height = trees[i][j];
      }
    }

    height = trees[rows - 1][j];
    for (let i = rows - 2; i > 0; i--) {
      if (trees[i][j] > height) {
        visible[i][j] = 1;
        height = trees[i][j];
      }
    }
  }

  return visible;
}
