const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    // Set the single-spa config as the project entry point
    'single-spa.config': './single-spa.config.js',
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        {
          parser: {
            system: false
          }
        },
        {
          test: /\.m?(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.css$/,
            exclude: /node_modules/,
            use: {
              loader: "css-loader"
            }
          }
      ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
//   plugins: [
//     // A webpack plugin to remove/clean the output folder before building
//     new CleanWebpackPlugin(),
//   ],
  devtool: 'source-map',
  externals: [],
  devServer: {
    historyApiFallback: true
  }
};
