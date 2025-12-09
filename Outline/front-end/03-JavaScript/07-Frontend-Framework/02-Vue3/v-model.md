# v-model

Vue3 里组件的 v-model 使用的是 modelValue / update:modelValue 这一对名字（而不是 Vue2 默认的 value / input），并且支持 多 v-model 更清晰

```js
// 父组件
<script setup>
import MyInput from './MyInput.vue';

const msg = ref('');
</script>

<template>
  <div>
    <MyInput v-model="msg" />
  </div>
</template>

// 在编译层会变成（概念上）
<MyInput
// 子组件接收父组件传递的 modelValue
  :modelValue="msg"
  // 子组件触发 update 事件，更新父组件的 msg，$event 是子组件触发事件传递的参数
  @update:modelValue="msg = $event"
/>
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
