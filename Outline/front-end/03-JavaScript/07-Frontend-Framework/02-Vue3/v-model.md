# v-model

Vue3 里组件的 v-model 使用的是 modelValue / update:modelValue 这一对名字（而不是 Vue2 默认的 value / input），并且支持 多 v-model 更清晰

## 实现原理
```js
// 父组件
<script setup>
const msg = ref('');
</script>

<template>
  <div>
    <MyInput v-model="msg" />
  </div>
</template>

// 在编译层会变成（概念上）
<MyInput
  :modelValue="msg" // 子组件接收父组件传递的 modelValue
  @update:modelValue="msg = $event" // 子组件触发 update 事件，更新父组件的 msg，$event 是子组件触发事件传递的参数
/>
```
```js
// 子组件
<script setup>
  const props = defineProps({
    // 接收父组件传递过来的 modelValue
    modelValue: {
      type: String,
      default: '',
      required: true
    }
  });
  const emit = defineEmits(['update:modelValue']); 
  // 定义触发 update:modelValue 事件
</script>

<template>
  <input 
  // 绑定 modelValue
    :modelValue="modelValue" 
    // 监听 input 事件，触发 update 事件，传递输入框的值
    @input="$emit('update:modelValue', $event.target.value)" 
     //因为 <input> 是原生 HTML 元素,它的 input 事件触发时:$event 是 InputEvent 对象，需要通过 $event.target.value 获取输入框的值
  />
</template>
```  
## 多个 v-model

```js
// 父组件
<script setup>
const isChecked = ref(false);
const inputValue = ref('');
</script>

<template>
  <div>
    <MyInput v-model:checked="isChecked" />
    <MyInput v-model:value="inputValue" />
  </div>
</template>
```
```js
// 子组件
<script setup>
  // 接收父组件传递过来的 checked 和 value
  const props = defineProps({
   checked: Boolean,
   value: String
  });
  // 定义触发 update:checked 和 update:value 事件
  const emit = defineEmits(['update:checked', 'update:value']); 
</script>

<template>
  <div>
    <!-- 复选框示例：控制选中状态 -->
    <input 
      type="checkbox"
      :checked="checked" 
      @change="$emit('update:checked', $event.target.checked)" 
    />
    
    <!-- 文本输入框示例：控制输入值 -->
    <input 
      type="text"
      :value="value" 
      @input="$emit('update:value', $event.target.value)" 
    />
  </div>
</template>
```
