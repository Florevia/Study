export default {
  server: {
    // 服务器主机名，默认是 localhost
    host: "localhost", 
    // 允许访问的主机名列表，默认是 []
    allowedHosts: ["lilin"],
    // 服务器端口号，默认是 5173
    port: 5173, 
    // 服务器启动后自动打开浏览器
    open: true, 
    // 严格使用指定的端口号，默认是 false
    strictPort: true, 
    // 代理配置
    proxy: {
      //key：字符串，表示「要匹配的请求路径」，可以是：以 /api  这种开头的前缀，也可以是以 ^ 开头的 正则表达式（'^/fallback/.*' 会匹配 /fallback/ 开头的所有路径）。
      //value：可以是：一个 target 字符串（简写形式），或者一个更详细的 ProxyOptions 对象
      //简单写法：'/foo': 'http://localhost:4567'
      "/api": {
        target: "http://localhost:3000", // 目标服务器地址
        changeOrigin: true, // 是否改变源地址，默认是 false
        secure: false, // 是否验证 SSL 证书，默认是 true
        rewrite: (path) => path.replace(/^\/api/, ""), // 重写路径，默认是 (path) => path:
      }
    },
    // 跨域配置:值可以为默认、true、CorsOptions
    cors: {
      origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://my-local-client.dev',
      ],
      credentials: true, // 例如允许携带 cookie
      methods: ['GET', 'POST'], // 限制请求方法
      // 还有更多高级配置，参考 express cors 文档
    },
  }
}
