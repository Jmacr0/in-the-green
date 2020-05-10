const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
	new CleanWebpackPlugin(),
	new HtmlWebpackPlugin({
		title: 'In The Green',
		filename: 'index.html',
		template: './index.ejs'
	}),
];

module.exports = {
	entry: {
		main: './src/index.ts',
		// materialize: './src/ASSETS/js/materialize.js'
	},
	plugins,
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			exclude: '/node_modules/',
			use: 'ts-loader',
		},
		{
			test: /\.css$/i,
			exclude: '/node_modules/',
			use: ['style-loader', 'css-loader'],
		},
		{
			test: /\.scss$/i,
			exclude: '/node_modules/',
			use: ['style-loader', 'css-loader', 'sass-loader'],
		},
		{
			test: /\.exec\.js$/,
			use: ['script-loader']
		},
		{
			test: /\.(png|svg|jpg|gif)$/,
			use: ['file-loader']
		}],
	},
	// devServer: {
	// 	contentBase: path.join(__dirname, 'dist'),
	// 	compress: true,
	// 	https: true,
	// 	port: 3000,
	// 	proxy: {
	// 		'/api': {
	// 			target: 'https://localhost:8080',
	// 			secure: false,
	// 		},
	// 	},
	// 	historyApiFallback: true,
	// },
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
};
