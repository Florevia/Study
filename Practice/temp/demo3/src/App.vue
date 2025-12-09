<script setup>
  // 引入 Element Plus 组件库的中文语言包
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>

<template>
  <!-- 配置 Element Plus 组件库的语言为中文 -->
  <el-config-provider :locale="zhCn">
    <!-- 路由出口，用于渲染匹配的路由组件 -->
    <router-view></router-view> 
  </el-config-provider>
</template>

<style scoped></style>
