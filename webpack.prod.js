const path = require("path");
const { nanoid } = require("nanoid");
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
const { buildPath, hostName } = require("./configs/vars.js");

global.nanoid = nanoid;

/** 
 * @type {import("webpack").Configuration}
 */
const config = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    // @ts-expect-error
    new MiniCssExtractPlugin({
      filename: "styles/[name]-[contenthash].css",
      chunkFilename: "styles/[id]-[contenthash].css"
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
        test: /\.(c|s[ac])ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: "defaults" 
            }]
          ],
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: "assets/images/[name]-[contenthash][ext][query]"
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: "assets/fonts/[name]-[contenthash][ext][query]"
        }
      },
    ]
  },
  output: {
    path: path.resolve(buildPath),
    filename: "scripts/[name]-[contenthash].js",
    assetModuleFilename: "assets/[name]-[contenthash][ext][query]",
    publicPath: hostName,
    clean: true,
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: 'single',
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'defaultVendors',
          chunks: 'all',
        }
      }
    }
  }
}
 

module.exports = merge(common, config);