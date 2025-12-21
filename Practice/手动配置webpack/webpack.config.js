const path = require("path");
const { VueLoaderPlugin } = require("vue-loader"); // vue-loader插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // HTML模板插件

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    hmr: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".vue", ".json"], // 自动解析扩展名
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      // 添加 Babel 支持
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      // 添加 CSS 支持
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html", // 使用项目根目录的 index.html 作为模板
      filename: "output.html", // 输出的文件名
      inject: "body", // 将打包后的 JS 文件注入到 body 底部
      removeComments: true, // 删除注释
    }),
  ],
};
