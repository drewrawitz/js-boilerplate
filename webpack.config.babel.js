const {resolve} = require('path')
const webpackValidator = require('webpack-validator')

module.exports = env => {
  return webpackValidator({
    context: resolve('src'),
    entry: './index.js',
    output: {
      path: resolve('dist'),
      filename: 'bundle.js',
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
      ]
    }
  })
}
