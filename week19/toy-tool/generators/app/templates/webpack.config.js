const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/main.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                { pragma: "createElement" },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "htmlName",
      filename: "index.html",
      template: "./src/index.html",
      inject: true,
    }),
  ],
  mode: "development",
  optimization: {
    minimize: false,
  },
  devServer: {
    open: true,
    compress: false,
    contentBase: "./src",
  },
};
