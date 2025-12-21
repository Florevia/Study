# asset module type

- `asset`：默认类型，会根据文件类型自动选择导出类型
- `asset/inline`：将文件作为 Data URL 嵌入到 bundle 中
- `asset/source`：导出资源的源代码字符串
- `asset/resource`：将资源发送到输出目录，并返回文件的 URL

## 出现原因

Webpack 4 及之前：处理静态资源需要安装各种 loader

- 图片、字体 → file-loader
- 转 base64 → url-loader
- 源代码导入 → raw-loader

## 示例

### asset/resource - 文件输出模式

- 替代 file-loader
- 适用场景：大文件（图片、字体、视频等）

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name]_[hash:8][ext]",
          // 输出到 dist/images/logo_abc12345.png
        },
      },
    ],
  },
};
```

### asset/inline - Data URL 模式

- 替代 url-loader
- 适用场景：小图标、小字体（< 10KB）

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/, // 匹配图片文件
        type: "asset/inline",
        parser: {
          dataUrlCondition: {
            // 小于 10KB 的图片会被转换为 Data URL
            maxSize: 10 * 1024, // 10KB
          },
        },
      },
    ],
  },
};
```

### asset/source - 源代码导出模式

- 替代：raw-loader
- 适用场景：
  - 文本文件（.txt, .md）
  - SVG 源代码（需要在 JS 中操作 SVG DOM）
  - 模板字符串

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(txt|md|svg)$/, // 匹配文本文件
        type: "asset/source",
      },
    ],
  },
};
```

### asset - 自动选择模式

- 适用场景：
  - 小文件（< 10KB）：自动选择 `asset/inline`
  - 大文件（> 10KB）：自动选择 `asset/resource`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/, // 匹配图片文件
        type: "asset", // 自动选择导出类型
        parser: {
          dataUrlCondition: {
            // 小于 10KB 的图片会被转换为 Data URL
            maxSize: 10 * 1024, // 10KB
          },
        },
      },
    ],
  },
};
```
