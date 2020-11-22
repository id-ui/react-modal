const path = require('path');

module.exports = {
  entry: './src/index.js',
  // Will defer minifaction to Applications bundler
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },

  externals: [
    'react',
    'react-dom',
    'lodash',
    'prop-types',
    'styled-components',
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
