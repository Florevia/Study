
```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 配置别名
  alias: {
    "@": "/<project-name>/",
    // '~': '/<project-name>/',
  },

  // 渲染模式
  ssr: true, // 开启服务端渲染
  //ssr: false,  // 关闭服务端渲染

  // 路由配置
  router: {

    // History 模式是默认的，无需特殊配置
    // 但可以自定义路由选项
    options: {
      hashMode: true  // 使用 hash 模式
      // strict: true,  // 严格模式
    },
  },
  // 预渲染配置
  nitro: {
    prerender: {
      // 预渲染的路由
      routes: ['/', '/about', '/contact', '/user/1', '/user/2']
    }
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});
```
