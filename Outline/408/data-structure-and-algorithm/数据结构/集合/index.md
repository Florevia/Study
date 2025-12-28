# Set

类似于数组，但成员的值都是唯一的

- 唯一
- 无序(无法通过索引访问)
- 任意类型

## 基本操作

- add(value)
- delete(value) 返回布尔值
- has(value) 返回布尔值
- clear()
- size
- values 获取所有值
- keys 获取所有键
- entries 获取所有键值对

```js
// 1. 创建空集合
const set1 = new Set();

// 2. 从数组创建（自动去重）
const set2 = new Set([1, 1, 2, 2, 3]);
console.log(set2); // Set(3) { 1, 2, 3 }

// 3. 从字符串创建（每个字符作为一个元素）
const set3 = new Set("hello");
console.log(set3); // Set(4) { 'h', 'e', 'l', 'o' }
```

## 遍历方法

1. for...of

```js
const set = new Set(["a", "b", "c"]);

for (const item of set) {
  console.log(item); // a, b, c
}
```

2. forEach

```js
set.forEach((value) => {
  console.log(value); // a, b, c
});
```

3. keys() / values() / entries()

```js
// 注意：Set 的 key 和 value 是相同的
console.log([...set.keys()]); // ['a', 'b', 'c']
console.log([...set.values()]); // ['a', 'b', 'c']
console.log([...set.entries()]); // [['a','a'], ['b','b'], ['c','c']]
```

## 使用场景

1. 数组去重

```js
const arr = [1, 1, 2, 2, 3];
const set = new Set(arr);
console.log([...set]); // [1, 2, 3]
```

2. 求交集

```js
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);
const intersection = new Set([...setA].filter((item) => setB.has(item)));
console.log(intersection); // Set(2) { 2, 3 }
```

3. 求并集

```js
const union = new Set([...setA, ...setB]);
console.log(union); // Set(4) { 1, 2, 3, 4 }
```

4. 求差集

```js
const difference = new Set([...setA].filter((item) => !setB.has(item)));
console.log(difference); // Set(1) { 1 }
```

## 数组 VS 集合

- arr.includes()

  - 从头到尾遍历
  - 时间复杂度 O(n)

- set.has()
  - 通过哈希表实现
  - 时间复杂度 O(1)
