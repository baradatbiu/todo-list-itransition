const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});
