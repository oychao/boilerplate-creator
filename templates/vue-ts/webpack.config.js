const path = require('path');
const webpack = require('webpack');
const TsConfigPathsPlugin = require('ts-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoader = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// base config
const config = {
  mode: process.env.NODE_ENV,
  entry: './index.ts',
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'vue', '.json', '.less'],
    alias: {
      vue: 'vue/dist/vue.js',
      style: path.resolve(__dirname, 'src', 'style'),
      comps: path.resolve(__dirname, 'src', 'components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: [
          {
            loader: 'source-map-loader'
          }
        ]
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader:
              process.env.NODE_ENV === 'development'
                ? 'style-loader'
                : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    open: true
  },
  externals: {},
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
    new HtmlWebpackPlugin({
      title: 'Hello World',
      template: path.resolve(__dirname, 'index.html')
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new VueLoader.VueLoaderPlugin()
  ]
};

// development config
if (process.env.NODE_ENV === 'development') {
  config.output.filename = 'js/[name].[hash:8].js';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.optimization = {
    minimize: false
  };
}

// production config
if (process.env.NODE_ENV === 'production') {
  config.devtool = 'source-map';
  [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new MiniCssExtractPlugin({
      debug: false,
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({})
  ].forEach(plugin => config.plugins.push(plugin));
  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  };
  config.performance = {
    hints: false
  };
}

// debug
if (process.env.WEBPACK_DEBUG) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
