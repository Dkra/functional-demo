const webpack = require('webpack');

module.exports = {
  entry: {
    indexEntry: ['./public/src/index.js'],
    noteEntry: ['./public/src/note.js']
  },

  output: {
    path: __dirname + '/public/javascripts/',
    publicPath: '/',
    filename: "[name].js"
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
}
