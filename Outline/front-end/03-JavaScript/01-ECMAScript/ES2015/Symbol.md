# symbol

- 第七种原始数据类型
- 创建唯一标识符
- 解决属性名冲突

## 基本用法

```js
const sym = Symbol();
// ❌不是new Symbol()
```

```js
const sym1 = Symbol("foo");
const sym2 = Symbol("foo");

console.log(sym1 === sym2); // false
// 每个 Symbol 都是唯一的！
```

## 作为属性名

- 解决属性名冲突

```js
const id = Symbol("id");
const name = Symbol("name");
const obj = {
  [id]: "bar",
  [name]: "foo",
};
console.log(obj[id]); // "bar"
```
