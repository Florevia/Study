// const arr = [1, 1, 2, 2, 3];

// const set1 = new Set(arr);
// console.log(set1); // Set(3) { 1, 2, 3 }
// // 去重
// const arr2 = [...new Set(arr)];
// console.log(arr2);
// // 判断元素是否在集合中
// const has = set1.has(4);
// console.log(has);
// //求交集
// const set2 = new Set([2, 3, 4]);
// const intersection = new Set([...set1].filter((item) => set2.has(item)));
// console.log(intersection);

// 树
// 树结构
const tree = {
  name: "A", // 根节点
  children: [
    {
      name: "B", // A 的第一个子节点
      children: [
        {
          name: "D", // B 的子节点（叶子节点）
          children: [],
        },
        {
          name: "E", // B 的子节点（叶子节点）
          children: [],
        },
      ],
    },
    {
      name: "C", // A 的第二个子节点
      children: [
        {
          name: "F", // C 的子节点（叶子节点）
          children: [],
        },
        {
          name: "G", // C 的子节点（叶子节点）
          children: [],
        },
      ],
    },
  ],
};

// 树的可视化表示：
//        A
//       / \
//      B   C
//     / \ / \
//    D  E F  G

// ===== 深度优先遍历 =====
// 方法1：递归实现（最常用）
const dfs = (tree) => {
  if (tree === null) return;
  console.log(tree.name); // 先访问当前节点
  tree.children.forEach(dfs);
};

dfs(tree);

// 方法2：迭代实现（使用栈）
const dfsIterative = (tree) => {
  const stack = [tree]; // 使用数组模拟栈
  while (stack.length > 0) {
    const node = stack.pop(); // 弹出栈顶元素
    console.log(node.name); // 访问节点
    // 注意：从右向左push，确保左子节点先被访问
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }
};

dfsIterative(tree);

// ===== 广度优先遍历 =====

const bfs = (tree) => {
  const queue = [tree]; // 使用数组模拟队列
  while (queue.length > 0) {
    const node = queue.shift(); // 取出队首元素（先进先出）
    console.log(node.name); // 访问节点
    // 将所有子节点加入队列尾部
    node.children.forEach((child) => {
      queue.push(child);
    });
  }
};

bfs(tree);

// 二叉树
const binaryTree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
    },
    right: {
      value: 5,
    },
  },
  right: {
    value: 3,
    left: {
      value: 6,
    },
    right: {
      value: 7,
    },
  },
};

console.log(binaryTree);
// ===== 二叉树遍历 (递归版) =====
// 先序遍历 (Pre-order): 根 -> 左 -> 右
const preOrder = (tree) => {
  if (!tree) return; // 空节点检查
  console.log(tree.value); // 先访问根节点
  preOrder(tree.left); // 再访问左子树
  preOrder(tree.right); // 最后访问右子树
};

preOrder(binaryTree);

// 中序遍历 (In-order): 左 -> 根 -> 右
const inorder = (tree) => {
  if (!tree) return;
  inorder(tree.left);
  console.log(tree.value);
  inorder(tree.right);
};

inorder(binaryTree);

// 后序遍历 (Post-order): 左 -> 右 -> 根
const postOrder = (tree) => {
  if (!tree) return;
  postOrder(tree.left);
  postOrder(tree.right);
  console.log(tree.value);
};

postOrder(binaryTree);

// ===== 二叉树遍历 (非递归版 - 使用栈) =====

// 先序遍历 (迭代版)
const preOrderIterative = (tree) => {
  if (!tree) return;
  const stack = [tree];
  while (stack.length > 0) {
    const node = stack.pop();
    console.log(node.value);
    // 注意：先push右节点，再push左节点
    // 因为栈是后进先出，这样左节点会先被访问
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
};
preOrderIterative(binaryTree);

// 中序遍历 (迭代版)
const inorderIterative = (tree) => {
  if (!tree) return;
  const stack = [];
  let current = tree;
  while (current || stack.length > 0) {
    // 先访问左子树
    while (current) {
      stack.push(current);
      current = current.left;
    }
    // 访问当前节点
    current = stack.pop();
    console.log(current.value);
    // 访问右子树
    current = current.right;
  }
};
inorderIterative(binaryTree);
