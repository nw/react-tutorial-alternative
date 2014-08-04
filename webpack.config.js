var webpack = require('webpack')
  , path = require('path');

module.exports = {
    context: __dirname,
    entry: {
      comments: './client/comments',
      vendor: ['react', 'jquery', 'marked']
    },
    output: {
        path: path.join(__dirname, "public/js")
      , filename: "[name]-bundle.js"
    },
    module: {
      loaders: [
        { test: /\.jade$/, loader: "react-jade-loader?split=true" }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor-bundle.js', 'common.js'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.optimize.UglifyJsPlugin()
    ]
}