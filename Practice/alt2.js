const dinaryTree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
    },
    right: {
      val: 5,
    },
  },
  right: {
    val: 3,
  },
};
// 先序遍历

function preOrderIterative(root) {
  if (!root) return;
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    console.log(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
}

preOrderIterative(dinaryTree);

// 中序遍历

function inorderIterative(root) {
  if (!root) return;
  const stack = [];
  let p = root;
  while (p || stack.length > 0) {
    while (p) {
      // 第1步：一直向左走，把所有左节点压入栈
      stack.push(p);
      p = p.left;
    }
    const node = stack.pop(); // 第2步：访问当前节点（最左边的节点）
    console.log(node.val);
    p = node.right; // 第3步：转向右子树 ⭐ 这就是你问的第185行
  }
}

// 后序遍历: 左 -> 右 -> 根
function postorderIterative(root) {
  if (!root) return;
  const stack = [root];
  const result = [];
  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return result.reverse();
}

inorderIterative(dinaryTree);

// ===== 求二叉树最大深度 =====

function maxDepthDFS(root) {
  if (!root) return 0;
  const stack = [[root, 1]]; // 栈中存储 [节点, 当前深度]
  let maxDepth = 0;
  while (stack.length > 0) {
    const [node, depth] = stack.pop();
    maxDepth = Math.max(maxDepth, depth); // 更新最大深度

    if (node.right) stack.push([node.right, depth + 1]); // 压入子节点时，深度+1
    if (node.left) stack.push([node.left, depth + 1]);
  }

  return maxDepth;
}

console.log("最大深度:", maxDepthDFS(dinaryTree)); // 输出: 3

//
