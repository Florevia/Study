# TypeScript 泛型 (Generics) 详解

## 1. 什么是泛型？

**泛型就是“类型的变量”。**

在像 C# 和 Java 这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以以自己的数据类型来使用组件。

通俗理解：我们定义函数/类时不预先指定具体的类型，而在**使用的时候**再指定类型。

### 为什么需要泛型？

假设我们要写一个 `echo` 函数，传入什么就返回什么。

**如果不使用泛型：**

```ts
// ❌ 方案 1: 指定具体类型 (不通用)
function echo(arg: number): number {
  return arg;
}

// ❌ 方案 2: 使用 any (丢失类型检查)
function echo(arg: any): any {
  return arg;
}
```

使用 `any` 会导致类型丢失。比如传入 `string` 返回 `any`，我们就失去了 `string` 自带的方法提示。

**使用泛型：**

```ts
// ✅ 方案 3: 使用泛型 T (Type)
function echo<T>(arg: T): T {
  return arg;
}

// 使用时指定类型
const result = echo<string>("Hello"); // result 类型为 string
// 或者让 TS 自动推断
const result2 = echo(123); // result2 类型自动推断为 number
```

---

## 2. 泛型的高级用法

### 2.1 泛型接口 (Generic Interfaces)

在定义接口时，可以使用泛型来约束属性的类型。

```ts
interface User<T> {
  id: number;
  data: T; // data 的类型由外部决定
}

// 使用
const user1: User<string> = { id: 1, data: "Alice" };
const user2: User<{ age: number }> = { id: 2, data: { age: 18 } };
```

### 2.2 泛型约束 (Generic Constraints) -> `extends`

有时候我们需要约束传入的泛型必须包含某些属性。

**场景**：我想访问 `arg.length`，但 `T` 可以是任意类型，不一定有 `length`。

```ts
// ❌ 报错：T 上不存在属性 length
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

**解决方案**：我们可以创建一个接口来描述约束条件。

```ts
interface Lengthwise {
  length: number;
}

// 让 T 继承 Lengthwise，表示 T 必须包含 length 属性
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // ✅ 现在可以访问了
  return arg;
}

loggingIdentity("hello"); // ✅ 字符串有 length
loggingIdentity([1, 2]); // ✅ 数组有 length
loggingIdentity(3); // ❌ 报错：数字没有 length
```

### 2.3 泛型类 (Generic Classes)

```ts
class Queue<T> {
  private data: T[] = [];

  push(item: T) {
    return this.data.push(item);
  }

  pop(): T | undefined {
    return this.data.shift();
  }
}

const queue = new Queue<number>();
queue.push(1);
queue.push("2"); // ❌ 报错
```

---

## 3. 实战常见场景

### 3.1 接口响应包装 (API Response)

后端返回的数据结构通常是固定的（如 `code`, `msg`, `data`），但 `data` 的类型各不相同。

```ts
// 定义通用响应结构
interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

// 用户信息类型
interface UserInfo {
  name: string;
  age: number;
}

// 商品列表类型
interface Product {
  id: number;
  price: number;
}

// 使用
function getUser(): ApiResponse<UserInfo> {
  return { code: 200, msg: "success", data: { name: "Lilin", age: 18 } };
}

function getProducts(): ApiResponse<Product[]> {
  return { code: 200, msg: "success", data: [{ id: 1, price: 99 }] };
}
```

### 3.2 keyof 操作符 (约束 key)

确保我们获取对象属性时，Key 一定是存在的。

```ts
// K extends keyof T 表示：K 必须是 T 所有的键中的一个
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // ✅ 返回 number
getProperty(x, "m"); // ❌ 报错：Argument of type '"m"' is not...
```
