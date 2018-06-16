const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        app: './src/app.jsx',
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].bundle.js',
        // publicPath: '/build/assets/',

        library: 'react',
        libraryTarget: 'umd'
    },

    module: {
        rules: [
            {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }],
        }, {
            test: /\.(png|jpe?g|gif|bmp)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name][hash].[ext]',
                    publicPath: 'assets/',
                }
            }]
        }, {
            test: /\.s?css$/,
            use: [{
                loader: "style-loader" // 将 JS 字符串生成为 style 节点
            }, {
                loader: "css-loader" //  将 CSS 转化成 CommonJS 模块
            }, {
                loader: "sass-loader", // 将 Sass 编译成 CSS
                options: {
                    sourceMap: true
                }
            }]
        }, {
            test: /\.(html)$/,
            use: {
                loader: 'html-loader',
                options: {
                    root: 'build/assets',
                    attrs: ['img:src', 'link:href'],
                    minimize: true,
                    removeComments: false,
                    collapseWhitespace: false
                }
            }
        }
    ],
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.json', '.css', '.html'],
    },

    context: __dirname,

   // externals: ["react", /^@angular\//],

    plugins: [
        new CleanWebpackPlugin(['./build/']),
        new HtmlWebpackPlugin({
            title: 'app',
            filename: 'app.html',
            template: './src/assets/html/app.ejs',
        }),

    ],
}

module.exports = config;