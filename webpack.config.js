var webpack = require('webpack')
  , path = require('path');

module.exports = {
    context: __dirname,
    entry: './client/comments',
    output: {
        path: path.join(__dirname, "public/js")
      , filename: "comments.js"
    },
    module: {
      loaders: [
        { test: /\.jade$/, loader: "react-jade-loader" }
      ]
    },
    plugins: [
    //new webpack.IgnorePlugin(/react/)
      new webpack.optimize.UglifyJsPlugin()
    ]
}