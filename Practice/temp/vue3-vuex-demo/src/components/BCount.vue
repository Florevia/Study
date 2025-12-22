<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
// store 不是构造函数，而是返回 store 实例的函数
const store = useStore();
const count = computed(() => {
  return store.state.count; //需返回值
});
</script>

<template>
  <div>
    <h1>Count: {{ count }}</h1>
  </div>
</template>
