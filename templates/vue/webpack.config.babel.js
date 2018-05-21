import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import VueLoader from 'vue-loader';

export default {
    mode: 'development',
    entry: ['./index.js', ],
    output: {
        publicPath: '/',
        path: path.resolve('dist'),
        filename: 'bundle.js',
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules'),
        ],
        alias: {
            vue: 'vue/dist/vue',
        },
        extensions: ['.js', '.json', '.vue', '.css', '.less', ],
    },
    module: {
        rules: [{
            test: /\.(css|less)$/,
            use: ['vue-style-loader', 'css-loader', 'less-loader', ],
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader', ],
        }, {
            test: /\.vue$/,
            use: ['vue-loader', ],
        }, ],
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        open: true,
        // progress: true
    },
    externals: {
        // 'react': 'React',
        // 'react-dom': 'ReactDOM',
        // 'redux': 'Redux',
        // 'react-redux': 'ReactRedux',
    },
    plugins: [
        new CleanWebpackPlugin(['dist', ]),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer',
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoader.VueLoaderPlugin(),
    ],
};