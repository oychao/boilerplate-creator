const path = require('path');
const webpack = require('webpack');
const TsConfigPathsPlugin = require('ts-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoader = require('vue-loader');

const config = {
    mode: process.env.NODE_ENV,
    entry: './index.ts',
    output: {
        filename: 'bundle.js',
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
                use: ['vue-loader']
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
                use: ['source-map-loader']
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        open: true
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
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

if (process.env.NODE_ENV === 'production') {
    config.mode = 'production';
    config.devtool = 'source-map';
    [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ].forEach(plugin => void config.plugins.push(plugin));
}

module.exports = config;
