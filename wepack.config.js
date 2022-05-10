const webpack = require('webpack');

module.exports = {
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
			hot: true,
			port: 4444,
	},
	mode: 'development',
};

