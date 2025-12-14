# vue2中 v-model是如何实现双向绑定的？

## 原生表单上

```js
//1.input框
<input v-model="msg">
//编译后等价于
<input 
  :value="msg" 
  @input="msg = $event.target.value"
/>

//2.
//checkbox + 数组（选中项列表）
<input 
  type="checkbox" 
  v-model="list" 
  value="A"
/>
<input 
  type="checkbox" 
  v-model="list" 
  value="B"

  @change="(e) => {
  const checked = e.target.checked
  const val = 'A'
  const arr = list
  //选中时：往 list 里 push(value)
  if (checked && arr.indexOf(val) < 0) arr.push(val)
  //取消时：从 list 中移除该 value
  if (!checked && arr.indexOf(val) > -1) arr.splice(arr.indexOf(val), 1)
}"
/>

```

## 组件中

- 在 Vue2 里，一个组件只能有一个 v-model
- v-model 是一个语法糖，等价于 :value + @input（或 @change）
- v-model会去绑定组件的
  - prop： value  
  - event： input（或 change）
- 要想让 v-model 生效，这个组件需要遵守一套约定：
  - 接收一个名为 value 的 prop
  - 在内部通过 this.$emit('input', 新值) 的方式向外触发更新
- 组件的 v-model 默认是 value 和 input 事件，也可以通过 model 选项自定义


```js
//父组件
<MyInput v-model="msg" />
//等价于
<MyInput
  :value="msg"
  @input="msg = $event" //$event 不再是 DOM 事件对象，而是子组件通过 $emit('input', value) 触发事件时传递的参数值
/>

//子组件
<input :value="value" @input="onInput">

export default {
  props: {
    value: String
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
```

**如果不想用 value / input，可以在子组件里配置 model 选项自定义：**

```js
//子组件
<input :value="val" @input="onInput">

export default {
  model: {
    prop: 'val', // 自定义 prop 名
    event: 'change' // 自定义 event 名
  },
  props: {
    val: String 
  },
  methods: {
    // 自定义事件处理函数，触发 change 事件
    onInput(e) {
      this.$emit('change', e.target.value)
    }
  }
}
//父组件
<MyInput v-model="msg" />
//等价于
<MyInput
  :value="msg"
  @change="msg = $event" //$event 不再是 DOM 事件对象，而是子组件通过 $emit('input', value) 触发事件时传递的参数值
/>
```

## 修饰符

```js
  //.lazy：在 change 事件触发时才更新数据，而不是 input 事件（默认是 input 事件
  <input v-model.lazy="msg" />
  //.number：将输入值转换为 Number 类型
  <input v-model.number="msg" />
  //.trim：自动去除输入首尾空格
  <input v-model.trim="msg" />
  ```
  ```js
  //sync修饰符示例:
  //父组件
  <script>
    export default {
      data() {
        return {
          isVisible: false
        }
      }
    }
  </script>

  <template>
    <div>
      <ChildComponent :visible.sync="isVisible" />
      <p>弹窗显示状态: {{ isVisible }}</p>
    </div>
  </template>
  //子组件
  <template>
    <div :value="visible">
      <button @click="onInput">点击</button>
    </div>
  </template>
  
  <script>
    export default {
      props: {
        visible: Boolean
      },
      methods: {
        onInput(e) {
          // 触发 update:visible 事件，更新父组件中的 isVisible
          this.$emit('update:visible', e.target.checked)
        }
      }
    }
  </script>
  ```
## vue2 数据更新原理

```js
//Vue2 会在初始化阶段，对 data 里的每一个 key 做：

Object.defineProperty(data, 'msg', {
  get() {
    // 依赖收集：谁在用我，就把谁记录下来
    dep.depend()
    return value
  },
  set(newVal) {
    if (newVal !== value) {
      value = newVal
      // 通知所有 watcher：我变了，你们要更新
      dep.notify()
    }
  }
})
```

## 面试总结

1. 在 Vue2 中，v-model 本质是 :value 加上 @input（或 @change）的语法糖。
2. 对于原生表单，会根据不同类型自动生成对应的 value/checked 绑定和事件处理逻辑。
3. 对于组件，则会转成一个 prop 和一个事件，默认是 value 和 input，也可以通过组件的 model 选项自定义。
4. 底层的数据响应是通过 Object.defineProperty 劫持 data 属性的 getter/setter，再结合依赖收集（Dep）和 watcher 实现 data → view 的更新；而 @input / @change 回调里把 DOM 的值写回 data，就实现了 view → data 的更新，两者组合在一起，就形成了我们看到的“v-model 双向绑定”。