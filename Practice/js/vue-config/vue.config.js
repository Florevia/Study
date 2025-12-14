const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // 转译依赖
  transpileDependencies: true,
  // 部署路径
  publicPath: process.env.NODE_ENV === "production" ? "/my-app/" : "/",

  // 输出目录
  outputDir: "dist",

  // 开发服务器配置
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },

  // 关闭生产环境的 source map
  productionSourceMap: false,
});
