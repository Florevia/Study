<script setup>
import { useSonStore } from "@/store/son";
const { username, sing } = useSonStore();
</script>
<template>
  <div class="hello-world-container">
    <h2>{{ username }}</h2>
    <el-button @click="sing" type="primary"> 点击唱歌 </el-button>
  </div>
</template>

<style scoped>
.hello-world-container {
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  text-align: center;
  color: white;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px;
}

.hello-world-container h2 {
  font-size: 32px;
  margin: 0;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
