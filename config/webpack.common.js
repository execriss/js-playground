const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const commonPaths = require('./paths');

module.exports = {
  entry: commonPaths.entryPath,
  module: {
    rules: [
      // --- NUEVA REGLA PARA IMÁGENES ---
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: 'asset/resource', // Usa Asset Modules de Webpack 5
        generator: {
          filename: 'static/media/[name].[contenthash][ext]', // Define cómo se guardan
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: commonPaths.publicPath,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader',
      },
    ],
    noParse: [require.resolve('typescript/lib/typescript.js')],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
      favicon: commonPaths.favIconPath,
    }),
    new MonacoWebpackPlugin({
      languages: ['javascript', 'typescript'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
