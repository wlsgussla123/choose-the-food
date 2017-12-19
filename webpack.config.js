const BabelMinifyPlugin = require('babel-minify-webpack-plugin')
const config = require('config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const pkg = require('./package')

const { host, port } = config.get('webpack')

const isDev = process.env.NODE_ENV === 'development'

const extractSass = new ExtractTextPlugin({
  disable: isDev,
  filename: '[name].[contenthash].css',
})

const cfg = {
  context: path.resolve(__dirname, './src/'),
  entry: './entry.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].[chunkhash].js',
  },
  
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            fix: isDev,
            emitWarning: isDev,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },  
    ],
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src/'),
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      minify: isDev ? undefined : {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
      },
    }),

    extractSass,
  ],

  devServer: {
    host,
    port,
  },
}

if(!isDev) {
  cfg.plugins.push(new BabelMinifyPlugin({
    removeConsole: true,
  }))
}

module.exports = cfg