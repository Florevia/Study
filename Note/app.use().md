# app.use()

### Vue 3 源码简化版

```js
class App {
  // 构造函数（创建实例时自动调用）
  constuctor(name) {
    this.name = name; // ← 实例属性
  }
  // 类的方法（定义在类的原型上）
  use(plugin, ...options) {
    // 检查 plugin 是否有 install 方法
    if (typeof plugin.install === "function") {
      // ← 如果有 install 方法，就调用它
      plugin.install(this, ...options);
    }
    // 如果 plugin 本身就是一个函数
    else if (typeof plugin === "function") {
      // ← 直接调用这个函数
      plugin(this, ...options);
    }
    return this; // 返回实例本身，支持链式调用
  }
}
```

**_app.use()会检查传入的参数类型，所以简写的时候调用也可以用 use()_**

### 简写形式

```js
// icons/index.js (简写形式)
export default (app) => {
  app.component("SvgIcon", SvgIcon);
};

// main.js
import installIcons from "./icons";
const app = createApp(App);

// ✅ 方式 1: 手动调用
installIcons(app);

// ✅ 方式 2: 用 app.use()（也可以！）
app.use(installIcons); // ← app.use() 检测到是函数，直接调用
```

### 标准格式

```js
// icons/index.js (标准格式)
export default {
  install(app) {
    app.component("SvgIcon", SvgIcon);
  },
};

// main.js
import iconsPlugin from "./icons";
const app = createApp(App);

// ❌ 方式 1: 手动调用（错误！）
iconsPlugin(app); // ← 报错！iconsPlugin 是对象，不是函数

// ✅ 方式 2: 用 app.use()
app.use(iconsPlugin); // ← app.use() 检测到有 install，调用它
```
