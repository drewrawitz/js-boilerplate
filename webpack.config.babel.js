const {resolve} = require('path')
const webpack = require('webpack')
const webpackValidator = require('webpack-validator')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = env => {
  return webpackValidator({
    context: resolve('src'),
    entry: './js/index.js',
    output: {
      path: resolve('dist'),
      filename: 'js/bundle.js',
      publicPath: '/dist/',
			pathinfo: env.prod ? false : true,
    },
    devtool: env.prod ? 'source-map' : 'eval',
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel'],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style',
						loader: [
							{
								loader: 'css-loader',
								query: {
									modules: true,
									sourceMaps: true,
									importLoaders: true
								}
							},
							'postcss-loader'
						]
          }),
          exclude: /node_modules/
        },
      ]
    },
    plugins: [
			new webpack.LoaderOptionsPlugin({
				options: {
					postcss: [
						require('stylelint')(),
						require('precss')()
					]
				}
			}),
      new ExtractTextPlugin({ filename: 'css/main.css', disable: false, allChunks: true  })
    ]
  })
}
