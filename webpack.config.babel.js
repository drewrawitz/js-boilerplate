const { resolve } = require('path');
const webpack = require('webpack');
const webpackValidator = require('webpack-validator');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/* PostCSS Plugins */
const pixrem = require('pixrem');
const postcssApply = require('postcss-apply');
const postcssAssets = require('postcss-assets');
const postcssImport = require('postcss-import');
const stylelint = require('stylelint');

module.exports = env =>
  webpackValidator({
    context: resolve('src'),
    entry: {
      application: [
        './js/index.js',
        './css/styles.css',
      ],
    },
    output: {
      path: resolve('dist'),
      filename: 'js/bundle.js',
      publicPath: '/dist/',
      pathinfo: !env.prod,
    },
    devtool: !env.prod ? 'source-map' : 'eval',
    module: {
      loaders: [
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=img/[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
          ],
        },
        {
          test: /\.js$/,
          loaders: ['babel', 'eslint'],
          exclude: /node_modules/,
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
                  importLoaders: true,
                },
              },
              'postcss-loader',
            ],
          }),
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [
            stylelint(),
            postcssImport(),
            postcssApply(),
            postcssAssets({
              basePath: 'src/',
              cachebuster: true,
              loadPaths: ['img/'],
              relative: true,
            }),
            pixrem(),
          ],
        },
      }),
      new ExtractTextPlugin({ filename: 'css/main.css', disable: false, allChunks: true }),
    ],
  });
