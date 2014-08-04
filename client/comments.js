var component = require('../lib/react-component');

require('./components/comments');

component.render('CommentBox', {
  url: "comments.json"
, pollInterval: 2000
}, 'content');
