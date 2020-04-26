const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const plugins = [
	new CleanWebpackPlugin()
];

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	entry: './src/index.ts',
	output: {
		filename: 'bundle.js',
	},
	plugins,
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: 'ts-loader',
		}],
	},
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
};
