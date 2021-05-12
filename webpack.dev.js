const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

/**
 * @type {import("webpack-dev-server").Configuration}
 */
const devServerConfig = {
  host: 'localhost',
  port: 3000,
};

/**
 * @type {import("webpack").Configuration}
 */
const config = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: devServerConfig,
  entry: {
    FMtodoApp: "./src/frontend-mentor/todo-app/todo-app.js"
  }
  plugins: [
    // @ts-expect-error
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
      chunkFilename: "styles/[id].css"
    }),
    new HTMLWebpackPlugin({
      filename: "previews/index.html",
      template: "./src/pages/previews/previews.pug",
      chunks: ["index"],
    }),
    new HTMLWebpackPlugin({
      filename: "previews/editable-textarea/index.html",
      template: "./src/pages/previews/editable-textarea.pug",
      chunks: ["index"],
    }),
    new HTMLWebpackPlugin({
      filename: "frontend-mentor/todo-app/index.html",
      template: "./src/frontend-mentor/todo-app/todo-app.pug",
      chunks: ['FMtodoApp']
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'simple-pug-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            ["babel-plugin-prismjs", {
              "languages": ["javascript", "css", "markup"],
              "plugins": ["line-numbers"],
              "theme": "twilight",
              "css": true
            }],
            ['@babel/plugin-transform-runtime']
          ]
        }
      },
      {
        test: /\.(c|s[ac])ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          { 
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: "assets/images/[name][ext][query]"
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: "assets/fonts/[name][ext][query]"
        }
      },
    ]
  },
  output: {
    filename: "scripts/[name].bundle.js",
    assetModuleFilename: "assets/[name][ext][query]",
    path: path.resolve(__dirname, "dev"),
    publicPath: '/',
    clean: true
  }
}

module.exports = merge(common, config);