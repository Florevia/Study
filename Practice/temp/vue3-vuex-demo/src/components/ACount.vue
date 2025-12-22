<script setup>
import { useStore } from "vuex";
const store = useStore();
const add = () => {
  store.commit("increment", 1);
};
const asyncAdd = () => {
  store.dispatch("incrementAsync", 2);
};
</script>

<template>
  <div>
    <button @click="add">同步➕1</button>
    <button @click="asyncAdd">异步➕2</button>
  </div>
</template>
