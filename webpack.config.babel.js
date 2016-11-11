const {resolve} = require('path')
const webpackValidator = require('webpack-validator')

module.exports = () => {
  return webpackValidator({
    context: resolve('src'),
    entry: './index.js',
    output: {
      path: resolve('dist'),
      filename: 'bundle.js',
    },
  })
}
