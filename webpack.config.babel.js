import { resolve } from 'path';
import webpack from 'webpack';
import webpackValidator from 'webpack-validator';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

/* PostCSS Plugins */
import pixrem from 'pixrem';
import postcssApply from 'postcss-apply';
import postcssAssets from 'postcss-assets';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import StyleLintPlugin from 'stylelint-webpack-plugin';

module.exports = env =>
  webpackValidator({
    devtool: !env.prod ? 'source-map' : 'eval',
    context: resolve('src'),
    entry: [
      './js/bootstrap.js',
    ],
    output: {
      path: resolve('dist'),
      filename: 'js/bundle.js',
      publicPath: '/dist/',
      pathinfo: !env.prod,
    },
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
          // loaders: ['babel', 'eslint'],
          loaders: ['babel'],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style',
            loader: [
              {
                loader: 'css',
                query: {
                  modules: true,
                  sourceMaps: true,
                  importLoaders: true,
                },
              },
              'postcss',
            ],
          }),
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve('src/index.html'),
        filename: 'index.html',
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [
            postcssImport({ addDependencyTo: webpack }),
            postcssApply(),
            postcssNested(),
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
      new StyleLintPlugin({
        configFile: '.stylelintrc',
        context: 'src/css',
        files: ['**/*.css'],
      }),
    ],
  });
