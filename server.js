var express = require('express')
  , webpack = require('webpack')
  , webpackDevMiddleware = require('webpack-dev-middleware')
  , bodyParser = require('body-parser')
  , app = express()
  , compile_config = require('./webpack.config');

var comments = [{author: 'Pete Hunt', text: 'Hey there!'}];

compile_config.plugins = [];
var compiler = webpack(compile_config);
app.use(webpackDevMiddleware(compiler, {
    quiet: false,
    noInfo: false,
    lazy: false,
    watchDelay: 100,
    publicPath: "/js/",
    stats: { colors: true }
}));


app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/comments.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

app.post('/comments.json', function(req, res) {
  comments.push(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

app.listen(3000);

console.log('Server started: http://localhost:3000/');
