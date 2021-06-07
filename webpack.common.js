const path = require("path");
const { ContextReplacementPlugin } = require("webpack");
const HTMLWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config();

const { supportedLanguages } = require("./configs/derived-vars");

/**
 * @type {import("webpack").Configuration}
 */
const webpackConfig = {
  entry: {
    index: "./src/index.js",
    FMeasyBank: "./src/frontend-mentor/easybank/easybank.js",
    FMcrowdFunding: "./src/frontend-mentor/crowdfunding/crowdfunding.js",
  },
  plugins: [
    new ContextReplacementPlugin(
      /date\-fns[\/\\]/,
      new RegExp(`[/\\\\\](${supportedLanguages.join('|')})[/\\\\\]index\.js$`)
    ),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: "./src/frontend-mentor/frontend-mentor.pug",
      chunks: ['index'],
    }),
    new HTMLWebpackPlugin({
      filename: "404.html",
      template: "./src/pages/404.pug",
      chunks: ['index'],
    }),
    new HTMLWebpackPlugin({
      filename: "frontend-mentor/index.html",
      template: "./src/frontend-mentor/frontend-mentor.pug",
      chunks: ['index'],
    }),
    new HTMLWebpackPlugin({
      filename: "frontend-mentor/easybank/index.html",
      template: "./src/frontend-mentor/easybank/index.pug",
      chunks: ['FMeasyBank'],
    }),
    new HTMLWebpackPlugin({
      filename: "frontend-mentor/crowdfunding/index.html",
      template: "./src/frontend-mentor/crowdfunding/crowdfunding.pug",
      chunks: ['FMcrowdFunding'],
    }),
    
  ],
  resolve: {
    extensions: [".js"],
    alias: {
      ["@wp/assets"]: path.resolve(__dirname, "src/assets"),
      ["@wp/components"]: path.resolve(__dirname, "src/components"),
      ["@wp/lib"]: path.resolve(__dirname, "src/lib"),
      ["@wp/pages"]: path.resolve(__dirname, "src/pages"),
      ["@wp/styles"]: path.resolve(__dirname, "src/styles"),
      ["@wp/frontend-mentor"]: path.resolve(__dirname, "src/frontend-mentor")
    },
  },
}

module.exports = webpackConfig;