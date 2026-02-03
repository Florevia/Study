# arr.reduce()

- 将数组中的所有元素“归约”成一个单一的输出值
- 反复调用一个用户提供的回调函数来累积结果，最终返回一个值（可以是数字、字符串、对象等任何类型）

## 语法

```js
arr.reduce(
  callback(accumulator, currentValue, currentIndex, array),
  initialValue
);
```

## 参数

- `callback`（每个元素执行的函数）
  - `accumulator`（累加器，保存上一次回调的返回值）
  - `currentValue`（当前元素）
  - `currentIndex`（当前索引）
  - `array`（被调用 reduce 的原数组）
- `initialValue`（初始累加器的值，任意类型）
  - 有 `initialValue` 时，初始值为 `initialValue`，callback 从数组的第 0 个元素开始调用
  - 没有 `initialValue` 时，初始值为 `arr[0]`，callback 从数组的第 1 个元素开始调用，

## 典型用途

### 1. 计算数组元素的总和

```js
const sum = [1, 2, 3, 4, 5];
sun.reduce((acc, curr) => acc + curr, 0);
```

### 2. 计数

```js
const arr = ["apple", "banana", "orange"];

arr.reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});
```

### 3. 数组扁平化(二维 --> 一维)

```js
const arr = [1, [2, [3, [4]]]];
arr.reduce((acc, curr) => acc.concat(curr), []);
```

### 4. 找最大值

```js
const arr = [2, 3, 5, 6, 1];
arr.reduce((acc, curr) => Math.max(acc, curr), -Infinity);
```
