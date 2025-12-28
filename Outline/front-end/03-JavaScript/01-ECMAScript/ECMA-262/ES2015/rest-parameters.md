# 剩余参数（Rest Parameters）

用来表示函数参数中数量不定的部分

## 基本用法

```js
function fn(a, b, ...rest) {
  console.log(a);        // 前两个参数
  console.log(b);
  console.log(rest);      // 其余参数 -> 数组
}

fn(1, 2, 3, 4, 5);
// a=1, b=2, rest=[3,4,5]
```

注意：
- rest 一定是一个数组（不像 arguments 那样是类数组）。
- 剩余参数必须放在参数列表的最后一个

## 与 arguments 的区别

| 特性        | arguments      | 剩余参数（…args）         |
| --------- | -------------- | ------------------- |
| 类型        | 伪数组（类 array）   | 真数组                 |
| 能否使用数组方法  | ❌ 不能直接用        | ✔ 直接用（map/filter 等） |
| 箭头函数内是否存在 | ❌ 没有 arguments | ✔ 可以使用 ...args      |
| 是否只包含多余参数 | ❌ 包含所有传入参数     | ✔ 只包含未被命名的部分        |

## 常见使用场景

① 处理可变参数函数
```js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
```
② 替代 arguments 提高可读性
```js
function log(type, ...messages) {
  console.log(type, messages.join(', '));
}
```

③ 解构赋值结合剩余参数
```js
const [first, second, ...others] = [1, 2, 3, 4, 5];
console.log(others); // [3, 4, 5]
```
## 和扩展运算符（Spread）的关系

| 特性      | 剩余参数 Rest    | 扩展运算符 Spread    |
| ------- | ------------ | --------------- |
| 写法      | `...args`    | `...array`      |
| 含义      | 收集剩余参数       | 展开可迭代对象         |
| 作用方向    | 右 → 左（收集到数组） | 左 → 右（展开成独立项）   |
| 用法场景    | 函数参数、解构      | 函数调用、数组/对象合并、拷贝 |
| 是否必须在最后 | ✔必须          | ❌不要求            |
| 结果是否是数组 | ✔永远是数组       | ❌取决于被展开的对象      |
