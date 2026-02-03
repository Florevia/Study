function diameterOfBinaryTree(root) {
  let maxDiameter = 0;

  const getHeight = (node) => {
    // 递归终止条件:空节点高度为0
    if (node === null) {
      return 0;
    }

    // 递归计算左右子树高度
    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);

    // 更新全局最大直径：当前节点的直径 = 左右子树高度之和
    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

    // 返回当前节点的高度：左右子树高度的最大值 + 1（当前节点的高度）
    return Math.max(leftHeight, rightHeight) + 1;
  };

  getHeight(root);
  return maxDiameter;
}

/**
 * 做递归题最容易晕的地方在于，这个函数好像既要算高度，又要算直径。
 * 技巧：明确函数的单一职责，把副作用留给全局变量。

getHeight 函数只做一件事：汇报高度。

给上级汇报我这边的树有多高（Math.max(左, 右) + 1）。
因为父节点需要这个信息来计算它自己的高度。

在汇报之前，顺便计算一下“如果以我为拐点，路径有多长”（左 + 右），并以此挑战一下全局记录 maxDiameter。
 */
