# CSS 后处理器

- 中间过程：把 CSS 解析成 AST（抽象语法树），插件可以：
  - 改属性名/值（比如加 -webkit-）
  - 删除 / 合并规则（比如压缩）
  - 检查错误 / 风格（比如 lint）
  - 把未来语法转成当前可用语法（比如自定义媒体查询、nesting 等）

## css 处理流水线

SCSS / LESS / 直接写的 CSS
↓（预处理器：sass/less）
CSS
↓（后处理器：PostCSS + 插件）
最终产物 CSS（加前缀、压缩、自动 polyfill 等）

## 插件推荐

- autoprefixer：自动添加浏览器前缀
- cssnano：压缩 CSS
- postcss-preset-env：把未来的 CSS 语法转成当前可用的
- postcss-pxtorem：把 px 转成 rem

## 配置文件详解

PostCSS 通常使用 `postcss.config.js` 进行配置。

```javascript
module.exports = {
  plugins: {
    autoprefixer: {}, // 自动添加浏览器前缀
    "postcss-pxtorem": {
      // 把 px 转成 rem
      rootValue: 16,
      propList: ["*"],
    },
    cssnano: process.env.NODE_ENV === "production" ? {} : false, // 压缩 CSS
  },
};
```

### 常见插件全量配置示例

```javascript
module.exports = {
  plugins: {
    // 1. 处理 @import (通常放在第一个)
    "postcss-import": {},

    // 2. 处理 URL 资源
    "postcss-url": {},

    // 3. 降级未来 CSS 语法 (内部已包含 autoprefixer)
    "postcss-preset-env": {
      stage: 3, // 0-4，3 是比较稳定的阶段
      features: {
        "nesting-rules": true, // 开启嵌套
      },
      autoprefixer: { grid: true }, // 传递给 autoprefixer 的参数
    },

    // 4. 移动端适配 (px -> rem)
    "postcss-pxtorem": {
      rootValue: 37.5, // 1rem = 37.5px
      propList: ["*"], // 所有属性都转
      selectorBlackList: [".norem"], // 过滤不做转换的选择器
    },

    // 5. 压缩 (生产环境)
    cssnano:
      process.env.NODE_ENV === "production"
        ? {
            preset: "default",
          }
        : false,
  },
};
```

## 命令行

```sh
postcss src/index.css -o dist/index.css
```

```sh
postcss src/index.css -o dist/index.css --use autoprefixer
```

```sh
postcss src/index.css > index.css
```
