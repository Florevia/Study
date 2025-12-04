# v-model

Vue3 里组件的 v-model 使用的是 modelValue / update:modelValue 这一对名字（而不是 Vue2 默认的 value / input），并且支持 多 v-model 更清晰

```js
// 父组件
<MyInput v-model="msg" />

// 在编译层会变成（概念上）
<MyInput
  :modelValue="msg"
  @update:modelValue="msg = $event"
/>
// 子组件
<script setup>
  import { defineModel } from 'vue';
  const modelValue = defineModel();

<template>
  <input 
    :value="modelValue" 
    @input="modelValue = $event.target.value" 
  />
</template>

```
