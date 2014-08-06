var webpack = require('webpack')
  , path = require('path');

module.exports = {
    context: __dirname,
    entry: {
      'comments-views': './client/components/comments/view.jade',
    },
    externals: [
      { react: true }
    ],
    output: {
        path: path.join(__dirname, "./client/components/comments/")
      , filename: "view.js"
      , libraryTarget: "commonjs2"
    },
    module: {
      loaders: [
        { test: /\.jade$/, loader: "react-jade-loader?split=true" }
      ]
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.optimize.UglifyJsPlugin()
    ]
}