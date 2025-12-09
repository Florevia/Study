# Vue3 项目创建完整指南

> 本指南详细讲解使用脚手架和纯手动创建 Vue3 项目的两种方式

---

## 目录

1. [方式一：使用 Vite 脚手架（推荐）](#方式一使用-vite-脚手架推荐)
2. [方式二：使用 Webpack 脚手架](#方式二使用-webpack-脚手架)
3. [方式三：纯手动创建（Vite 版本）](#方式三纯手动创建vite-版本)
4. [方式四：纯手动创建（Webpack 版本）](#方式四纯手动创建webpack-版本)
5. [配置文件详解](#配置文件详解)

---

## 方式一：使用 Vite 脚手架（推荐）

### 为什么推荐 Vite？

- 启动速度极快（基于 ESM）
- 热更新（HMR）速度快
- 开箱即用，配置简单
- 生产构建基于 Rollup，打包体积小

### 📝 详细步骤

#### 1. 创建项目

```bash
# 使用 pnpm（推荐，速度快、节省磁盘空间）
pnpm create vite@latest my-vue3-app -- --template vue

# 或使用 npm
npm create vite@latest my-vue3-app -- --template vue

# 或使用 yarn
yarn create vite my-vue3-app --template vue
```

**参数说明：**

- `create vite@latest`：使用最新版本的 Vite 创建工具
- `my-vue3-app`：项目名称（可自定义）
- `--template vue`：使用 Vue 模板（还有 vue-ts、react、svelte 等模板）

#### 2. 进入项目并安装依赖

```bash
cd my-vue3-app
pnpm install  # 安装 package.json 中定义的所有依赖
```

#### 3. 启动开发服务器

```bash
pnpm run dev  # 启动开发服务器，默认运行在 http://localhost:5173
```

#### 4. 构建生产版本

```bash
pnpm run build  # 打包生产版本到 dist 目录
pnpm run preview  # 预览生产构建结果
```

### 📦 脚手架自动安装的核心包

```json
{
  "dependencies": {
    "vue": "^3.x.x" // Vue3 核心库
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.x.x", // Vite 的 Vue 插件，用于处理 .vue 文件
    "vite": "^5.x.x" // Vite 构建工具
  }
}
```

### 📁 脚手架生成的项目结构

```
my-vue3-app/
├── public/              # 静态资源目录（不会被构建工具处理）
│   └── favicon.ico      # 网站图标
├── src/                 # 源代码目录
│   ├── assets/          # 资源文件（会被构建工具处理，如图片、CSS）
│   │   └── logo.png
│   ├── components/      # Vue 组件目录
│   │   └── HelloWorld.vue
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── .gitignore           # Git 忽略文件配置
├── index.html           # HTML 入口文件（Vite 特有，在根目录）
├── package.json         # 项目配置和依赖管理
├── vite.config.js       # Vite 配置文件
└── README.md            # 项目说明文档
```

---

## 方式二：使用 Webpack 脚手架

### 📝 详细步骤

#### 1. 使用 Vue CLI 创建项目

```bash
# 全局安装 Vue CLI（如果还没安装）
npm install -g @vue/cli

# 创建项目
vue create my-vue3-webpack-app

# 交互式选择配置：
# 1. 选择 "Manually select features"
# 2. 勾选需要的功能（Babel, Router, Vuex, CSS Pre-processors, Linter 等）
# 3. 选择 Vue 3.x
# 4. 选择其他配置项
```

#### 2. 进入项目并启动

```bash
cd my-vue3-webpack-app
npm run serve  # 启动开发服务器
```

#### 3. 构建生产版本

```bash
npm run build  # 打包生产版本
```

### 📦 Vue CLI 自动安装的核心包

```json
{
  "dependencies": {
    "vue": "^3.x.x",
    "vue-router": "^4.x.x", // 路由（如果选择了）
    "vuex": "^4.x.x" // 状态管理（如果选择了）
  },
  "devDependencies": {
    "@vue/cli-service": "^5.x.x", // Vue CLI 核心服务
    "vue-loader": "^17.x.x", // Webpack 的 Vue 加载器
    "webpack": "^5.x.x", // Webpack 打包工具
    "@vue/compiler-sfc": "^3.x.x" // Vue 单文件组件编译器
  }
}
```

---

## 方式三：纯手动创建（Vite 版本）

### 🎯 适合人群

- 想深入理解项目构建流程
- 需要完全自定义配置
- 学习目的

### 📝 详细步骤

#### 步骤 1：创建项目目录和初始化

```bash
# 创建项目文件夹
mkdir my-manual-vite-vue3
cd my-manual-vite-vue3

# 初始化 package.json
pnpm init
# 或者手动创建 package.json
```

#### 步骤 2：安装核心依赖

```bash
# 安装 Vue3 核心库（生产依赖）
pnpm add vue

# 安装 Vite 构建工具（开发依赖）
pnpm add vite --save-dev

# 安装 Vite 的 Vue 插件（开发依赖）
pnpm add @vitejs/plugin-vue --save-dev
```

**包的作用说明：**

- `vue`：Vue3 核心库，提供响应式系统、组件系统等核心功能
- `vite`：现代化的前端构建工具，提供开发服务器和生产打包
- `@vitejs/plugin-vue`：让 Vite 能够解析和编译 `.vue` 单文件组件

#### 步骤 3：创建项目结构

```bash
# 创建目录结构
mkdir -p src/components public

# 创建文件
touch index.html
touch vite.config.js
touch src/main.js
touch src/App.vue
touch src/components/HelloWorld.vue
```

#### 步骤 4：配置 package.json

创建或编辑 `package.json`：

```json
{
  "name": "my-manual-vite-vue3",
  "version": "1.0.0",
  "type": "module", // 重要：启用 ES 模块支持
  "scripts": {
    "dev": "vite", // 启动开发服务器
    "build": "vite build", // 构建生产版本
    "preview": "vite preview" // 预览生产构建
  },
  "dependencies": {
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

**配置项说明：**

- `type: "module"`：告诉 Node.js 使用 ES 模块系统（import/export）
- `scripts`：定义可执行的命令脚本
  - `dev`：运行 `vite` 命令启动开发服务器
  - `build`：运行 `vite build` 打包生产代码
  - `preview`：预览打包后的生产版本

#### 步骤 5：创建 vite.config.js

```javascript
import { defineConfig } from "vite"; // 导入 Vite 配置函数
import vue from "@vitejs/plugin-vue"; // 导入 Vue 插件

// 导出 Vite 配置
export default defineConfig({
  // 插件配置
  plugins: [
    vue(), // 使用 Vue 插件，让 Vite 能够处理 .vue 文件
  ],

  // 服务器配置
  server: {
    port: 3000, // 开发服务器端口，默认 5173
    open: true, // 启动时自动打开浏览器
    cors: true, // 允许跨域
    host: "0.0.0.0", // 监听所有地址，允许局域网访问
  },

  // 构建配置
  build: {
    outDir: "dist", // 输出目录
    assetsDir: "assets", // 静态资源目录
    sourcemap: false, // 是否生成 source map（调试用）
    minify: "terser", // 压缩方式：'terser' | 'esbuild'

    // Rollup 配置选项
    rollupOptions: {
      output: {
        // 分包策略：将第三方库单独打包
        manualChunks: {
          "vue-vendor": ["vue"], // 将 vue 单独打包
        },
      },
    },
  },

  // 路径别名配置
  resolve: {
    alias: {
      "@": "/src", // 配置 @ 指向 src 目录，方便导入
    },
  },
});
```

**详细配置说明：**

| 配置项                | 说明                                                      |
| --------------------- | --------------------------------------------------------- |
| `plugins`             | 插件数组，vue() 插件用于处理 .vue 单文件组件              |
| `server.port`         | 开发服务器端口号                                          |
| `server.open`         | 启动时是否自动打开浏览器                                  |
| `server.cors`         | 是否允许跨域请求                                          |
| `server.host`         | 监听的主机地址，'0.0.0.0' 允许局域网访问                  |
| `build.outDir`        | 打包输出目录                                              |
| `build.assetsDir`     | 静态资源存放目录（相对于 outDir）                         |
| `build.sourcemap`     | 是否生成 sourcemap 文件（用于调试）                       |
| `build.minify`        | 代码压缩工具，terser 压缩率更高但慢，esbuild 快但压缩率低 |
| `build.rollupOptions` | Rollup 打包配置，可配置分包策略                           |
| `resolve.alias`       | 路径别名，@ 代表 src 目录                                 |

#### 步骤 6：创建 index.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue3 手动项目</title>
  </head>
  <body>
    <!-- Vue 应用挂载点 -->
    <div id="app"></div>

    <!-- 
    重要：Vite 的入口文件
    type="module" 表示这是一个 ES 模块
    Vite 会自动处理这个脚本
  -->
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**关键点说明：**

- `<div id="app"></div>`：Vue 应用的挂载点
- `<script type="module">`：必须使用 type="module"，这是 Vite 的要求
- `src="/src/main.js"`：指向入口 JS 文件，Vite 会从这里开始构建

#### 步骤 7：创建 src/main.js

```javascript
// 导入 Vue 的 createApp 函数
import { createApp } from "vue";

// 导入根组件
import App from "./App.vue";

// 创建 Vue 应用实例并挂载到 #app 元素
createApp(App).mount("#app");

/*
详细说明：
1. createApp(App)：创建一个 Vue 应用实例，传入根组件
2. .mount('#app')：将应用挂载到 id 为 app 的 DOM 元素上
3. 这是 Vue3 的新语法，Vue2 使用 new Vue()
*/
```

#### 步骤 8：创建 src/App.vue

```vue
<template>
  <!-- 根组件的模板 -->
  <div id="app">
    <img src="./assets/logo.png" alt="Vue logo" />
    <HelloWorld msg="欢迎使用 Vue 3 手动项目！" />
  </div>
</template>

<script>
// 导入子组件
import HelloWorld from "./components/HelloWorld.vue";

// 导出组件配置
export default {
  name: "App", // 组件名称（用于调试）

  // 注册子组件
  components: {
    HelloWorld, // ES6 简写，等同于 HelloWorld: HelloWorld
  },
};
</script>

<style>
/* 全局样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

**Vue 单文件组件（SFC）结构说明：**

- `<template>`：HTML 模板，定义组件的 DOM 结构
- `<script>`：JavaScript 逻辑，定义组件的行为和数据
- `<style>`：CSS 样式，定义组件的外观

#### 步骤 9：创建 src/components/HelloWorld.vue

```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>当前计数：{{ count }}</p>
    <button @click="increment">点击 +1</button>
  </div>
</template>

<script>
import { ref } from "vue"; // 导入 ref 函数（响应式 API）

export default {
  name: "HelloWorld",

  // Props：接收父组件传递的数据
  props: {
    msg: {
      type: String, // 数据类型
      required: true, // 是否必传
    },
  },

  // setup 函数：Vue3 组合式 API 的入口
  setup() {
    // ref 创建响应式数据
    const count = ref(0);

    // 定义方法
    const increment = () => {
      count.value++; // 修改 ref 的值需要通过 .value
    };

    // 返回模板中需要使用的数据和方法
    return {
      count,
      increment,
    };
  },
};
</script>

<style scoped>
/* scoped：样式只作用于当前组件 */
.hello {
  padding: 20px;
}

h1 {
  color: #42b983;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #35a372;
}
</style>
```

**Vue3 组合式 API 说明：**

- `ref()`：创建响应式数据，基本类型数据用 ref
- `reactive()`：创建响应式对象，对象类型数据用 reactive
- `setup()`：组件的入口函数，在组件创建之前执行
- `count.value`：访问或修改 ref 的值需要通过 .value 属性

#### 步骤 10：启动项目

```bash
# 安装依赖（如果还没安装）
pnpm install

# 启动开发服务器
pnpm run dev

# 访问 http://localhost:3000
```

---

## 方式四：纯手动创建（Webpack 版本）

### 📝 详细步骤

#### 步骤 1：创建项目并初始化

```bash
mkdir my-manual-webpack-vue3
cd my-manual-webpack-vue3
pnpm init
```

#### 步骤 2：安装核心依赖

```bash
# 安装 Vue3（生产依赖）
pnpm add vue

# 安装 Webpack 相关（开发依赖）
pnpm add webpack webpack-cli webpack-dev-server --save-dev

# 安装 Vue 加载器和编译器（开发依赖）
pnpm add vue-loader @vue/compiler-sfc --save-dev

# 安装 HTML 插件（自动生成 HTML）
pnpm add html-webpack-plugin --save-dev

# 安装 CSS 加载器
pnpm add css-loader vue-style-loader --save-dev

# 安装 Babel（转译 ES6+ 代码）
pnpm add @babel/core @babel/preset-env babel-loader --save-dev
```

**包的作用详解：**

| 包名                  | 作用                            |
| --------------------- | ------------------------------- |
| `webpack`             | 模块打包工具核心                |
| `webpack-cli`         | Webpack 命令行工具              |
| `webpack-dev-server`  | 开发服务器，提供热更新          |
| `vue-loader`          | 加载和转换 .vue 文件            |
| `@vue/compiler-sfc`   | 编译 Vue 单文件组件             |
| `html-webpack-plugin` | 自动生成 HTML 并注入打包后的 JS |
| `css-loader`          | 解析 CSS 文件                   |
| `vue-style-loader`    | 将 CSS 注入到 DOM 中            |
| `babel-loader`        | 使用 Babel 转译 JavaScript      |
| `@babel/core`         | Babel 核心库                    |
| `@babel/preset-env`   | Babel 预设，自动转译 ES6+ 语法  |

#### 步骤 3：配置 package.json

```json
{
  "name": "my-manual-webpack-vue3",
  "version": "1.0.0",
  "scripts": {
    "dev": "webpack serve --mode development", // 开发模式
    "build": "webpack --mode production" // 生产构建
  },
  "dependencies": {
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.23.0",
    "@vue/compiler-sfc": "^3.4.0",
    "babel-loader": "^9.1.0",
    "css-loader": "^6.8.0",
    "html-webpack-plugin": "^5.5.0",
    "vue-loader": "^17.3.0",
    "vue-style-loader": "^4.1.3",
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.0",
    "webpack-dev-server": "^4.15.0"
  }
}
```

#### 步骤 4：创建 webpack.config.js

```javascript
const path = require("path"); // Node.js 路径模块
const HtmlWebpackPlugin = require("html-webpack-plugin"); // HTML 插件
const { VueLoaderPlugin } = require("vue-loader"); // Vue 加载器插件

module.exports = {
  // 入口文件：Webpack 从这里开始打包
  entry: "./src/main.js",

  // 输出配置
  output: {
    path: path.resolve(__dirname, "dist"), // 输出目录的绝对路径
    filename: "js/[name].[contenthash:8].js", // 输出文件名（带哈希值，利于缓存）
    clean: true, // 构建前清空输出目录
  },

  // 模块加载规则
  module: {
    rules: [
      // 处理 .vue 文件
      {
        test: /\.vue$/, // 匹配 .vue 文件
        loader: "vue-loader", // 使用 vue-loader 处理
      },

      // 处理 JavaScript 文件
      {
        test: /\.js$/, // 匹配 .js 文件
        exclude: /node_modules/, // 排除 node_modules 目录
        use: {
          loader: "babel-loader", // 使用 babel-loader
          options: {
            presets: ["@babel/preset-env"], // 使用 preset-env 预设
          },
        },
      },

      // 处理 CSS 文件
      {
        test: /\.css$/, // 匹配 .css 文件
        use: [
          "vue-style-loader", // 将 CSS 注入到 DOM
          "css-loader", // 解析 CSS 文件
        ],
        // 注意：use 数组从右到左执行，先 css-loader 再 vue-style-loader
      },
    ],
  },

  // 插件配置
  plugins: [
    // Vue Loader 插件（必需）
    new VueLoaderPlugin(),

    // HTML 插件：自动生成 HTML 并注入打包后的资源
    new HtmlWebpackPlugin({
      template: "./public/index.html", // HTML 模板路径
      title: "Vue3 Webpack 手动项目", // 页面标题
      inject: "body", // 将脚本注入到 body 底部
    }),
  ],

  // 开发服务器配置
  devServer: {
    port: 8080, // 端口号
    hot: true, // 启用热模块替换（HMR）
    open: true, // 自动打开浏览器
    compress: true, // 启用 gzip 压缩
    historyApiFallback: true, // SPA 路由支持
  },

  // 路径解析配置
  resolve: {
    extensions: [".js", ".vue", ".json"], // 自动解析这些扩展名
    alias: {
      "@": path.resolve(__dirname, "src"), // @ 指向 src 目录
    },
  },

  // 开发工具：生成 source map
  devtool: "eval-source-map", // 开发环境使用，生产环境改为 'source-map' 或 false
};
```

**Webpack 配置详解：**

##### entry（入口）

- 指定 Webpack 开始打包的入口文件
- 可以是字符串、数组或对象

##### output（输出）

- `path`：输出目录的绝对路径
- `filename`：输出文件名，`[contenthash]` 是内容哈希值，文件内容变化时哈希值变化
- `clean`：构建前清空输出目录

##### module.rules（模块规则）

- `test`：正则表达式，匹配文件
- `loader`：使用的加载器
- `use`：加载器数组，从右到左执行
- `exclude`：排除的目录

##### plugins（插件）

- `VueLoaderPlugin`：必需，配合 vue-loader 使用
- `HtmlWebpackPlugin`：自动生成 HTML 文件

##### devServer（开发服务器）

- `hot`：热模块替换，修改代码后自动刷新
- `historyApiFallback`：支持 HTML5 History API 路由

##### resolve（解析）

- `extensions`：自动解析的文件扩展名
- `alias`：路径别名

##### devtool（开发工具）

- `eval-source-map`：开发环境，快速重建
- `source-map`：生产环境，完整的 source map

#### 步骤 5：创建项目文件

创建目录结构：

```bash
mkdir -p src/components public
```

创建 `public/index.html`：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="app"></div>
    <!-- Webpack 会自动注入打包后的 JS 文件 -->
  </body>
</html>
```

创建 `src/main.js`：

```javascript
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

创建 `src/App.vue` 和 `src/components/HelloWorld.vue`（内容同 Vite 版本）

#### 步骤 6：启动项目

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build
```

---

## 配置文件详解

### Vite vs Webpack 对比

| 特性           | Vite            | Webpack           |
| -------------- | --------------- | ----------------- |
| **启动速度**   | ⚡ 极快（秒级） | 🐌 较慢（分钟级） |
| **热更新速度** | ⚡ 极快         | 🐌 较慢           |
| **配置复杂度** | ✅ 简单         | ❌ 复杂           |
| **生态成熟度** | 🆕 较新         | ✅ 非常成熟       |
| **生产构建**   | Rollup          | Webpack           |
| **适用场景**   | 现代项目        | 复杂项目、老项目  |

### 常用配置项对比

#### Vite 配置项

```javascript
{
  plugins: [],        // 插件
  server: {},         // 开发服务器
  build: {},          // 构建配置
  resolve: {},        // 路径解析
  css: {},            // CSS 配置
  optimizeDeps: {}    // 依赖优化
}
```

#### Webpack 配置项

```javascript
{
  entry: '',          // 入口
  output: {},         // 输出
  module: { rules: [] },  // 加载器
  plugins: [],        // 插件
  devServer: {},      // 开发服务器
  resolve: {},        // 路径解析
  optimization: {}    // 优化配置
}
```

---

## 🎯 总结与建议

### 新项目推荐

✅ **使用 Vite 脚手架**

- 开发体验最佳
- 配置简单
- 启动和热更新速度快

### 学习目的推荐

✅ **纯手动创建（Vite 版本）**

- 理解项目构建流程
- 掌握核心配置
- Vite 配置相对简单

### 老项目或复杂项目

✅ **Webpack**

- 生态成熟
- 插件丰富
- 可定制性强

### 关键要点

1. **理解依赖类型**

   - `dependencies`：生产环境需要的包（如 vue）
   - `devDependencies`：开发环境需要的包（如 vite、webpack）

2. **理解配置文件**

   - `vite.config.js`：Vite 配置
   - `webpack.config.js`：Webpack 配置
   - `package.json`：项目元数据和脚本

3. **理解构建流程**

   - 入口文件 → 依赖分析 → 模块转换 → 打包输出

4. **理解 Vue3 特性**
   - 组合式 API（setup、ref、reactive）
   - 单文件组件（SFC）
   - 响应式系统

---

## 📚 扩展阅读

- [Vite 官方文档](https://vitejs.dev/)
- [Webpack 官方文档](https://webpack.js.org/)
- [Vue3 官方文档](https://vuejs.org/)
- [Vue3 组合式 API](https://vuejs.org/guide/extras/composition-api-faq.html)

---

**祝你学习愉快！🎉**
