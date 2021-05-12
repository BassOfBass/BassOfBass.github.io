const path = require("path");
const { nanoid } = require("nanoid");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

// @ts-expect-error
global.nanoid = nanoid;

/**
 * @type {import("webpack-dev-server").Configuration}
 */
const devServerConfig = {
  contentBase: path.resolve(__dirname, 'public'),
  publicPath: "/",
  host: 'localhost',
  port: 3000,
  hot: true,
};

/**
 * @type {import("webpack").Configuration}
 */
const config = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: devServerConfig,
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
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          { 
            loader: 'simple-pug-loader',
            options: {
              globals: ["nanoid"]
            }
          }
        ]
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