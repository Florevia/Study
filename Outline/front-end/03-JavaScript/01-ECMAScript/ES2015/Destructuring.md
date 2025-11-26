# Destructuring 解构赋值

- 数组解构
```js
const [a, b] = [1, 2];
```

- 对象解构
```js
const { name, age } = person;
```

- 默认值 + 剩余解构
```js
const [a, ...rest] = arr;
const { x, ...others } = obj;
```