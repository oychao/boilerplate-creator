import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

module.exports = {
    entry: ['@babel/polyfill', 'react-hot-loader/patch', './index.jsx',],
    output: {
        publicPath: '/',
        path: path.resolve('dist'),
        filename: 'bundle.js',
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules'),
        ],
        extensions: ['.js', '.json', '.jsx', '.css',],
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader',],
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader',],
        }, {
            test: /\.(worker\.js)$/,
            exclude: /node_modules/,
            use: ['worker-loader',],
        },],
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        open: true,
        // progress: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist',]),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer',
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
};