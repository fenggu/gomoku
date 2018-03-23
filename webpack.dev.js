const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  devServer: {
    contentBase: './dist',
    hot: true
  },
  devtool: 'inline-source-map',
	plugins: [
    // new BundleAnalyzerPlugin()
	]
})