# 图

## 结构

```js
// graph[u] 是 u 能到达的所有邻居数组
const graph = {
  A: ["B", "C"],
  B: ["D"],
  C: ["D"],
  D: [],
};
```

## 图的遍历

### 深度优先遍历

```js
function dfs(graph, node, visited) {
  if (visited.has(node)) return;
  visited.add(node);
  console.log(node);
  for (let neighbor of graph[node]) {
    dfs(graph, neighbor, visited);
  }
}
```

### 广度优先遍历

```js
function bfs(graph, node, visited) {
  const queue = [node];
  visited.add(node);
  while (queue.length > 0) {
    const currentNode = queue.shift();
    console.log(currentNode);
    for (let neighbor of graph[currentNode]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```
