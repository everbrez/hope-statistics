const config = require('./webpack.common');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const prodConfig = {
    mode: 'production',

    module: {
        rules: [{
            test: /\.s?css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            })
        }]
    },

    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new ExtractTextPlugin('[name][hash].css'),
    ],
}

module.exports = merge(config, prodConfig);