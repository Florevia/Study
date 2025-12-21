# Class 类

## 一、面向对象编程（OOP）Object-Oriented Programming

### 含义

- 一种编程范式，将程序组织成一组相互作用的对象。每个对象包含：

- 数据（属性/状态）
- 行为（方法/功能）

### 面向对象的核心思想

1. 抽象：提取事物的本质特征，忽略无关细节
2. 封装：将数据和操作数据的方法绑定在一起，隐藏内部实现
3. 继承：子类可以继承父类的属性和方法，实现代码复用
4. 多态：同一个方法在不同对象上有不同的表现

### 为什么需要面向对象？

| 优势           | 说明                               |
| -------------- | ---------------------------------- |
| **代码复用**   | 通过继承避免重复代码               |
| **易于维护**   | 修改集中在类定义中                 |
| **模块化**     | 将复杂问题分解成小的、可管理的对象 |
| **更贴近现实** | 用对象模拟现实世界的实体           |

---

## 二、Class 的基本语法

**语法结构：**

- `constructor()`
  - 构造方法，创建和初始化对象实例
  - 每个类只能有一个，不写默认为空`constructor() {}`
  - 默认返回 this（新创建的实例）
  - 创建实例时自动调用
- 方法定义不需要 `function` 关键字
- 方法之间不需要逗号分隔

---

### Class 的方法

**1.实例方法(Instance Methods)**

```js
class Person {
  sayHello() {
    console.log(`Hello, my name is ${this.name}`);
  }
}
```

**2. 静态方法(Static Methods)**

```js
class Person {
  static count = 0;
  static getCount() {
    return this.count; // this 指向类本身
  }
}
```

**3. 私有方法(Private Methods)**

ES2022 引入了私有方法，使用 `#` 前缀：

```js
class Person {
  #privateMethod() {
    console.log("This is a private method");
  }
}
```

### Class 的属性

**1. 实例属性**

- 在 constructor 中定义

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

- 类字段（Class Fields, ES2022）

```js
class Person {
  name = "John";
}
```

**2. 静态属性**

**3. 私有属性**

**4. 访问器属性（Getter/Setter）**

使用 `get` 和 `set` 关键字定义：

```js
class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }
}
```

### Class 的继承

使用 `extends` 关键字实现类的继承：

```js
class Student extends Person {
  constructor(age) {
    this.age = age;
  }
}
```

使用`super` 有两种用法：

1. 作为函数调用（在 constructor 中）：

- 调用父类的构造函数
- 必须在使用 `this` 之前调用，因为子类没有自己的 this，必须先调用父类的构造函数创建 this，子类才能使用 this
- 只能在子类的 constructor 中使用

```js
class Student extends Person {
  constructor(name, age) {
    super(name); // 相当于：Person.constructor(name)
    this.age = age;
  }
}
```

2. 作为对象使用：

```js
class Father {
  cook() {
    return "番茄炒蛋"; // 爸爸的做法
  }

  static getFamily() {
    return "张家";
  }
}
```

- 在普通方法中：`super` 指向父类的原型对象

```js
class Son extends Father {
  cook() {
    const fatherCook = super.cook();
    return `${fatherCook} + 鸡蛋`;
  }
}
```

- 在静态方法中：`super` 指向父类

```js
class Son extends Father {
  // 静态方法中调用父类静态方法
  static getFamily() {
    return super.getFamily() + "的儿子";
  }
}
```

- 用于调用父类的方法
- 注意：
  - 子类可以覆盖父类方法
  - 子类可以直接继承父类方法

---

### this 绑定问题

1. **箭头函数（推荐）**：自动绑定 this
2. **bind 方法**：在 constructor 中绑定
3. **箭头函数包装**：调用时使用箭头函数

---

### 参考资源

- **MDN Web Docs**：[Classes - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **ECMAScript 规范**：[ECMAScript® 2015 Language Specification](https://262.ecma-international.org/6.0/)
- **JavaScript.info**：[Classes](https://javascript.info/classes)
- **You Don't Know JS**：深入理解原型和对象

---
