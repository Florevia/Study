# 树

## 树结构

```js
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
```

### 可视化表示：

```js
//        A
//       / \
//      B   C
//     / \ / \
//    D  E F  G
```

## 遍历树

### 深度优先遍历

#### 方法 1：递归实现（最常用）

```js
const dfs = (tree) => {
  if (tree === null) return;
  console.log(tree.name); // 先访问当前节点
  tree.children.forEach(dfs);
};

dfs(tree);
```

#### 方法 2：迭代实现（使用栈）

```js
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
```

### 广度优先遍历

```js
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
```

## 二叉树

```js
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
```

### 二叉树遍历 (递归版)

#### 先序遍历 (Pre-order): 根 -> 左 -> 右

```js
const preOrder = (tree) => {
  if (!tree) return; // 空节点检查
  console.log(tree.value); // 先访问根节点
  preOrder(tree.left); // 再访问左子树
  preOrder(tree.right); // 最后访问右子树
};

preOrder(binaryTree);
```

#### 中序遍历 (In-order): 左 -> 根 -> 右

```js
const inorder = (tree) => {
  if (!tree) return;
  inorder(tree.left);
  console.log(tree.value);
  inorder(tree.right);
};

inorder(binaryTree);
```

#### 后序遍历 (Post-order): 左 -> 右 -> 根

```js
const postOrder = (tree) => {
  if (!tree) return;
  postOrder(tree.left);
  postOrder(tree.right);
  console.log(tree.value);
};

postOrder(binaryTree);
```

### 二叉树遍历 (非递归版 - 使用栈)

#### 先序遍历 (迭代版)

```js
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
```

#### 中序遍历 (迭代版)

```js
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
```

#### 后序遍历 (迭代版)

```js
const postOrderIterative = (tree) => {
  if (!tree) return;
  const stack = [];
  let current = tree;
  let lastVisited = null;
  while (current || stack.length > 0) {
    // 先访问左子树
    while (current) {
      stack.push(current);
      current = current.left;
    }
    const node = stack[stack.length - 1];
    // 如果右子树为空或已访问过，则访问当前节点
    if (!node.right || node.right === lastVisited) {
      console.log(node.value);
      lastVisited = node;
      stack.pop();
    } else {
      // 否则访问右子树
      current = node.right;
    }
  }
};
postOrderIterative(binaryTree);
```

### 求二叉树最大深度

```js
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

console.log("最大深度:", maxDepthDFS(binaryTree)); // 输出: 3
```
