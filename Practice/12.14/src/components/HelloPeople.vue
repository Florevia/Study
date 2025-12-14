<script setup>
import axios from "axios";
const get = async () => {
  try {
    await axios("http://baidu.com");
    ElMessage.success("请求成功");
  } catch (err) {
    ElMessage.error("请求失败");
  }
};
</script>
<template>
  <div class="hello-people-container">
    <h2>Hello People 组件</h2>
    <p>点击按钮发送 HTTP 请求</p>
    <el-button @click="get" type="warning">点击发送请求</el-button>
  </div>
</template>

<style scoped>
.hello-people-container {
  padding: 40px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(245, 87, 108, 0.3);
  text-align: center;
  color: white;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 20px;
}

.hello-people-container h2 {
  font-size: 32px;
  margin: 0;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.hello-people-container p {
  font-size: 16px;
  margin: 0;
  opacity: 0.9;
}
</style>
