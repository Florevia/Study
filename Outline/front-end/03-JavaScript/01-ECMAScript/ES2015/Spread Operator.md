# 扩展运算符 Spread Operator

将可迭代对象展开 / 拆开
把整体拆成多个元素

## 常用于：

- 函数传参
  ```js
  Math.max(...[1,2,3])  // ✔ 简洁
  ```

- 构造数组
  ```js
  const arr = [1,2,3]
  const newArr = [...arr, 4]
  ```

- 浅拷贝数组/对象
  ```js
  const copy = [...arr]
  ```

- 合并结构
  ```js
  const merged = [...arr1, ...arr2]
  ```

- 转换类数组结构
  ```js
  console.log([...'hello'])
  // ['h','e','l','l','o']
  ```

## 可以展开什么

- 数组 Array
- 字符串 String
- Map
- Set
- arguments（类数组但可迭代）
- NodeList（可迭代）