const path = require('path');

module.exports = {
  target: 'web',
  entry: './src/brains.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'brainsweb.js'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' }
    ]
  },
  plugins: [ ]
}
