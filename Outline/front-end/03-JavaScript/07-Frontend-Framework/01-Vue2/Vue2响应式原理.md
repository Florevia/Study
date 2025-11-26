# vue2响应式原理

- 核心设计模式：观察者模式 (Observer Pattern)

- Vue 的响应式系统本质上是观察者模式的一种实现。整个系统主要由三个核心角色构成：

  - Observer (观察者/数据劫持者): 负责拦截数据的读写操作。
  - Dep (Dependency/依赖管理器): 负责维护依赖列表（即“谁依赖了这个数据”）。
  - Watcher (订阅者): 负责在数据变化时执行具体的更新逻辑（如组件渲染函数）。

- 核心机制： 

  - 数据劫持 (Data Interception)
  - 依赖收集 (Dependency Collection) —— Getter 阶段
  - 派发更新 (Change Notification) —— Setter 阶段
  - 异步更新队列 (Asynchronous Update Queue)

## 数据劫持 

- 使用 Object.defineProperty
- Vue 在初始化（Initialization）阶段，会遍历 data 选项中的所有属性，并将其转换为 Getter/Setter 【访问器属性（Accessor Properties）】。
- 局限性: 只能拦截属性的读写，无法拦截对象的添加/删除（需用 Vue.set）和数组的索引操作。

```js
// 模拟 Vue 2 的响应式原理

/**
 * 1. Observer 类: 
 * 它的作用是把一个普通对象的所有属性都“转化”为 getter/setter。
 */
class Observer {
  constructor(value) {
    this.value = value;
    this.walk(value); // 开始遍历
  }

  // 遍历对象所有的属性
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]); // 核心转换逻辑
    }
  }
}

/**
 * 2. defineReactive: 
 * 真正的“拦截”发生在这里。利用 Object.defineProperty 重写属性。
 */
function defineReactive(obj, key, val) {
  // 如果没传值，就获取当前对象的属性值
  if (arguments.length === 2) {
    val = obj[key];
  }

  // 递归：如果属性值本身也是对象（比如 data: { user: { name: '...' } }）
  // 就需要继续 new Observer(val)，实现深度监测
  observe(val);

  // 每个属性都闭包维护一个 Dep (依赖列表)
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    
    // Getter: 别人来读取这个属性时触发
    get: function reactiveGetter() {
      console.log(`[Getter] 拦截读取: ${key} = ${val}`);
      // 依赖收集：如果当前有 Watcher 在读取（比如正在渲染页面），就把它记下来
      if (Dep.target) {
        dep.depend();
      }
      return val;
    },

    // Setter: 别人来修改这个属性时触发
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      console.log(`[Setter] 拦截修改: ${key} 从 ${val} -> ${newVal}`);
      
      val = newVal;
      // 如果新值是个对象，也要把它变成响应式的
      observe(newVal);
      
      // 派发更新：通知所有记下来的 Watcher 去更新
      dep.notify();
    }
  });
}

// 辅助函数
function observe(value) {
  if (!value || typeof value !== 'object') return;
  return new Observer(value);
}

// --- 简单的依赖管理器 (Dep) ---
class Dep {
  constructor() {
    this.subs = [];
  }
  depend() {
    if (Dep.target) {
      this.subs.push(Dep.target);
    }
  }
  notify() {
    console.log(`[Dep] 通知 ${this.subs.length} 个观察者更新`);
    this.subs.forEach(sub => sub.update());
  }
}
// 全局变量，用来记录当前正在工作的 Watcher
Dep.target = null;
```

## 依赖收集 

Dep (Dependency) 和 Watcher (观察者)

当组件进行挂载（Mount）或渲染（Render）时，会触发数据的 Getter。

- 触发 Getter: 渲染函数（Render Function）读取数据属性。
- Dep.target: 此时，全局变量 Dep.target 指向当前正在执行的 Watcher（通常是组件的 Render Watcher）。
- 收集依赖: 属性的 Getter 将当前的 Watcher 添加到自己的 Dep（依赖列表）中。

## 派发更新 

notify (通知) 和 re-render (重新渲染)

当数据被修改时，会触发数据的 Setter。

- 触发 Setter: 数据被赋予新值。
- 通知 Dep: Setter 调用该属性持有的 Dep 实例的 notify() 方法。
- 触发 Watcher: Dep 遍历其收集的所有 Watcher，并调用它们的 - update() 方法。

## 异步更新队列

Vue 的响应式更新是异步的。