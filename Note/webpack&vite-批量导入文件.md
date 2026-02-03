# webpack 批量导入文件

## API

`require.context()`

## 步骤

```js
// 第一步： 导入要注册成为全局组件的文件
import SvgIcon from "@/components/SvgIcon/SvgIndex.vue";

// 第二步： 批量导入
const svgRequire = require.context("@/icons/svg", false, /\.svg$/);
// 返回所有匹配的文件路径数组并导入
svgRequire.keys().forEach((key) => svgRequire(key));

// 第三步： 注册全局组件函数并导出
export default installIcons = (app) => {
  app.component("SvgIcon", SvgIcon);
};
```

## 参数和返回值介绍

```js
require.context(
  directory, // 要搜索的目录
  useSubdirectories, // 是否搜索子目录
  regExp, // 匹配文件的正则表达式
  mode // 可选，加载模式（'sync' | 'eager' | 'lazy' | 'lazy-once'）
);
```

`require.context()`返回一个特殊函数，包含以下属性和方法：

1.  `keys()`: 获取所有匹配的文件路径
2.  `resolve(key)`: 解析完整模块路径
3.  `id`: Context 模块的唯一标识符
4.  函数本身 `req(path)` - 导入模块

## 下载 svg-sprite-loader

```bash
npm install svg-sprite-loader --save-dev
```

## Vue CLI (Webpack): vue.config.js 配置

```js
import path = require("path");

module.exports = {
chainWebpack: (config) => {
  config.module
  .rule("svg")                                        // 找到默认的 svg 处理规则
  .exclude.add(path.resolve(__dirname, "src/icons"))  // 排除 src/icons 目录
  .end()
  config.module
  .rule('icons')                                       // 创建新规则，名为 'icons'
  .test(/\.svg$/)                                      // 匹配 .svg 文件
  .include.add(path.resolve(__dirname, "src/icons"))   // 只处理 src/icons 目录
  .end()
  .use('svg-sprite-loader')                            // 使用 svg-sprite-loader
  .loader('svg-sprite-loader')                         // 指定加载器
  .options({
    symbolId: 'icon-[name]',                           // 生成的 symbol id 格式
  })
  .end()
    )

}
};
```

# vite 批量导入文件

## API

`import.meta.glob()`

```js
// 第一步： 导入要注册成为全局组件的文件
import SvgIcon from "@/components/SvgIcon/SvgIndex.vue";

// 第二步： 批量导入
const svgModules = import.meta.glob("./svg/*.svg", { eager: true });

// svgModules 是对象
// {
//   './svg/user.svg': { default: ... },
//   './svg/dashboard.svg': { default: ... }
// }

// 第三步： 注册全局组件函数并导出
export default installIcons = (app) => {
  app.component("SvgIcon", SvgIcon);
};
```

## vite-plugin-svg-icons

```zsh
npm install vite-plugin-svg-icons --save-dev
```

```js
// vite.config.js
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

export default {
  plugins: [
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
};
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import installIcons from "./plugins/icons";
// 导入 svg 图标
import "virtual:svg-icons-register";

const app = createApp(App);
installIcons(app);
app.mount("#app");
```
