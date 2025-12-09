# CSS 后处理器

- 中间过程：把 CSS 解析成 AST（抽象语法树），插件可以：
  - 改属性名/值（比如加 -webkit-）
  - 删除 / 合并规则（比如压缩）
  - 检查错误 / 风格（比如 lint）
  - 把未来语法转成当前可用语法（比如自定义媒体查询、nesting 等）

## css处理流水线

SCSS / LESS / 直接写的 CSS
 ↓（预处理器：sass/less）
CSS
 ↓（后处理器：PostCSS + 插件）
最终产物 CSS（加前缀、压缩、自动 polyfill 等）

## 插件推荐

- [autoprefixer](https://github.com/postcss/autoprefixer)：自动添加浏览器前缀
- [cssnano](https://github.com/cssnano/cssnano)：压缩 CSS
- [postcss-preset-env](https://github.com/csstools/postcss-preset-env)：把未来的 CSS 语法转成当前可用的


## 配置示例

```json
{
  "plugins": [
    "autoprefixer", // 自动添加浏览器前缀
    "cssnano", // 压缩 CSS
    [
      "postcss-preset-env", // 把未来的 CSS 语法转成当前可用的
      {
        "browsers": "last 2 versions" // 目标浏览器
      }
    ]
  ]
}
```
## 注意事项

- 插件的执行顺序很重要，一般是：预处理器 -> PostCSS 插件 -> 压缩器