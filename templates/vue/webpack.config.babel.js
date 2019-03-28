import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import VueLoader from 'vue-loader';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import HappyPack from 'happypack';
import {
  BundleAnalyzerPlugin
} from 'webpack-bundle-analyzer';

// base config
const config = {
  mode: process.env.NODE_ENV === 'dll' ? 'none' : process.env.NODE_ENV,
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve('dist'),
    publicPath: '/'
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    alias: {
      vue: 'vue/dist/vue'
    },
    extensions: ['.js', '.json', '.vue', '.css', '.less']
  },
  module: {
    rules: [{
      test: /\.(css|less)$/,
      use: [{
        loader: process.env.NODE_ENV === 'development'
          ? 'style-loader'
          : MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader'
      }, {
        loader: 'less-loader'
      }]
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'happypack/loader'
      }]
    },
    {
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader'
      }]
    }]
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    open: true
    // progress: true
  },
  externals: {}
};

if (process.env.NODE_ENV === 'dll') {
  config.entry = {
    vendor: [
      'axios',
      'vue',
      'vue-axios',
      'vue-router',
      'vuex',
      'vuex-router-sync',
      '@babel/polyfill'
    ]
  };
  config.output = {
    filename: 'js/[name].dll.js',
    path: path.resolve('dll'),
    library: '[name]_lib'
  };
  config.plugins = [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_lib'
    })
  ];
} else {
  config.plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new VueLoader.VueLoaderPlugin(),
    new HappyPack({
      loaders: ['babel-loader']
    })
  ];
}

// development config
if (process.env.NODE_ENV === 'development') {
  config.plugins.push(
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, 'dll'),
      manifest: require('./dll/vendor-manifest.json')
    })
  );
  config.output.filename = 'js/[name].[hash:8].js';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.optimization = {
    minimize: false
  };
}

// production config
if (process.env.NODE_ENV === 'production') {
  delete config.devtool;
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

export default config;
