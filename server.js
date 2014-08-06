var express = require('express')
  , webpack = require('webpack')
  , webpackDevMiddleware = require('webpack-dev-middleware')
  , bodyParser = require('body-parser')
  , app = express()
  , component = require('./lib/react-component')
  , compile_config = require('./webpack.config')
  , template_config = require('./webpack.templates')
  , compiler = webpack(compile_config)
  , tpl_compiler = webpack(template_config);

tpl_compiler.run(function(){
  
  // register components
  require('./client/components/comments');

  var comments = [{author: 'Pete Hunt', text: 'Hey there!'}];

  app
    .set('views', __dirname + '/public')
    .set('view options', {layout: false})
    .set('view engine', 'jade');

  app.use(webpackDevMiddleware(compiler, {
      quiet: false,
      noInfo: false,
      lazy: false,
      watchDelay: 100,
      publicPath: "/js/",
      stats: { colors: true }
  }));


  app.get('/', function(req, res){
    res.render("index", {
      content: component.renderString('CommentBox', {
          data: comments
        , url: "comments.json"
        , pollInterval: 2000
      })
    });
  });

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

});
