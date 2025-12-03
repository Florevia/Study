# vite

Vite 是一个前端构建工具 + 开发服务器

- 开发阶段：起一个本地 dev server，支持热更新（HMR），改代码页面秒刷新。
- 打包阶段：用 Rollup 打包成上线可以用的静态文件（HTML、JS、CSS、图片……）


## Vite ***VS*** webpack

- webpack 开发流程：
  - 启动开发服务器前，要先把整个项目打包一次。
  - 改一小段代码，也要重新编译一坨依赖，然后再热更新。

- Vite 开发流程：
  - 开发阶段基于原生 ES Module（浏览器原生 import）
  - 不提前把所有代码打成一个大 bundle。
  - 浏览器访问哪个文件，就按需编译哪个文件。
  - 依赖（node_modules）用 esbuild 预构建,esbuild 是用 Go 写的，非常快。
  - 依赖只需要预构建一次，后面基本就直接用缓存。
  - 生产环境用 Rollup 打包

## 常用命令

```zsh
npm create vite@latest
cd my-vite-app   # 进入项目目录（换成你自己的项目名）
npm install      # 安装依赖（会生成 node_modules）
```