const path = require('path');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
        alias: {
            style: path.resolve(__dirname, 'src', 'style')
        },
        plugins: [
            new TsConfigPathsPlugin()
        ]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: ['awesome-typescript-loader']
        }, {
            enforce: 'pre',
            test: /\.js$/,
            use: ['source-map-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        open: true,
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello World',
            template: path.resolve(__dirname, 'index.html')
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist'))
    ],
};
