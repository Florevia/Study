# bind apply call

## 绑定 this 的场景

1. 对象方法作为回调函数传递

```js
const obj = {
  name: "lilin",
  getName() {
    return this.name;
  },
};

const fn = obj.getName;
console.log(fn()); // this 丢失

const boundGreet = user.greet.bind(user);
```

2. 定时器回调的 this

```js
class Counter {
  constructor() {
    this.count = 0;
  }

  start() {
    // setInterval 的回调中 this 指向 window
    setInterval(function () {
      this.count++; // this 不是 Counter 实例！
      console.log(this.count);
    }, 1000);
  }

  // ✅ 解决方案 1：使用 bind
  startWithBind() {
    setInterval(
      function () {
        this.count++;
        console.log(this.count);
      }.bind(this),
      1000
    );
  }

  // ✅ 解决方案 2：使用箭头函数（更推荐）
  startWithArrow() {
    setInterval(() => {
      this.count++; // 箭头函数继承外层 this
      console.log(this.count);
    }, 1000);
  }
}
s;
```

3. 事件监听中，箭头函数里的 this 不等于 绑定的元素

```js
btn.getElementById("myButton").addEventListener("click", (e) => {
  console.log(this === btn); // false
  // 推荐使用普通函数
});
```

## bind

### 特点

1. **返回新函数**：不会立即执行，而是返回一个绑定了 `this` 的新函数。
2. **预设参数**：可以传入参数序列，这些参数会被预置到新函数的参数列表中（柯里化）。
3. **永久绑定**：一旦被 `bind` 绑定，后续再次 `bind` 或 `call/apply` 都无法改变其 `this` 指向。

### 语法

```js
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

---

## apply

`apply()` 方法调用一个具有给定 `this` 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。

### 特点

1. **立即执行**：调用时会立即执行函数。
2. **数组传参**：第二个参数必须是数组或者类数组对象。

### 语法

```js
func.apply(thisArg, [argsArray]);
```

---

## call

`call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

### 特点

1. **立即执行**：调用时会立即执行.
2. **逐个传参**：参数需要一个接一个地列出来，而不是放在数组中。

### 语法

```js
function.call(thisArg, arg1, arg2, ...)
```
