<script setup>
  import { ref } from 'vue'

  const count = ref(0)
</script>

<template>
  <div>
    <h1>Hello Vue 3!</h1>
    <p>Count: {{ count }}</p>
  </div>
</template>
