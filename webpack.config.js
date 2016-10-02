const webpack = require('webpack');

module.exports = {
  entry: {
    indexEntry: './public/src/index.js',
    githubEntry: './public/src/github.js'
  },

  output: {
    path: __dirname + '/public/javascripts/',
    filename: "[name].js"
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
