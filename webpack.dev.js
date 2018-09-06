const config = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require('webpack');

const devConfig = {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		port: 8888,
		proxy: {},
		contentBase: 'build',
		compress: true,
		historyApiFallback: true,
		hot: true,
		https: false,
		open: true,
		openPage: 'app.html',
		//publicPath: 'build/assets/'
	},

	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
}

module.exports = merge(config, devConfig);