const {VueLoaderPlugin} = require("vue-loader") 

module.exports = {
  entry: "./index.js",
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.css$/,
        use: "css-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}