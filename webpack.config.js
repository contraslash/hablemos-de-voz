'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const remarkMath = require('remark-math');
const rehypeKatex = require('rehype-katex');

// Customized babel loader with the minimum we need to get `mdx` libraries
// working, which unfortunately codegen JSX instead of JS.
const babelLoader = {
  loader: require.resolve('babel-loader'),
  options: {
    // Use user-provided .babelrc
    babelrc: true,
    // ... with some additional needed options.
    presets: [require.resolve('@babel/preset-react')]
  }
};

/**
 * Base configuration for the CLI, core, and examples.
 */

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Default for boilerplate generation.
  output: {
    path: path.resolve('dist'),
    filename: 'deck.js'
  },
  devtool: 'source-map',
  module: {
    // Not we use `require.resolve` to make sure to use the loader installed
    // within _this_ project's `node_modules` traversal tree.
    rules: [
      {
        test: /\.jsx?$/,
        use: [babelLoader]
      },
      // `.md` files are processed as pure text.
      {
        test: /\.md$/,
        use: [require.resolve('raw-loader')]
      },
      // `.mdx` files go through babel and our mdx transforming loader.
      {
        test: /\.mdx$/,
        use: [
            babelLoader,
            require.resolve('spectacle-mdx-loader',
                {
                  remarkPlugins: [remarkMath],
                  rehypePlugins: [rehypeKatex]
                }
            )
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|wav)$/,
        use: [require.resolve('file-loader')]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  // Default for boilerplate generation.
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hablemos de Voz',
      template: './src/index.html'
    })
  ]
};
