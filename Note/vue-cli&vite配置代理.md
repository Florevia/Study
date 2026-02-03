# vue-cli&vite 配置代理

## vue-cli

```js
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://后端地址:端口",
        changeOrigin: true,
        pathRewrite: {
          // 注意：是 pathRewrite
          "^/api": "",
        },
      },
    },
  },
};
```

## vite

```js
// vite.config.js
export default {
  server: {
    // 注意：是 server，不是 serve
    proxy: {
      "/api": {
        target: "http://后端地址:端口",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 注意：是 rewrite 函数
      },
    },
  },
};
```
