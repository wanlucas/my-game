const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: '/src/game/index.ts',
	mode: 'development', 
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	resolve: {
		extensions: ['.ts']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
		]
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: './src/game/index.html', to: 'index.html' },
			]
		})
	]
};