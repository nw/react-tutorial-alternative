var component = require('../../lib/react-component');
var marked = require('marked');
var $ = require('jquery');

// Hack: I want the react-component to handle.
// webpack wasn't handling delayed/dynamic dependencies well. 
var tpl = ['box', 'comment', 'form', 'list'].reduce(function(obj, name){
  obj[name] = require('../views/comment/'+name+'.jade');
  return obj;
},{});

/* Individual Comment */
component.create('Comment', {
  tpl: tpl.comment,
  render: function(view) {
    var rawMarkup = marked(this.props.text);
    return view({rawMarkup: rawMarkup});
  }
});

/* List of Comments */
component.create('CommentList', {
  tpl: tpl.list,
  render: function(view) {
    return view();
  }
});

/* Comment Form (add new comment) - requires parent to pass onCommentSubmit fn*/
component.create('CommentForm', {
  tpl: tpl.form,
  handleSubmit: function() {
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return false;
  },
  render: function(view) {
    return view();
  }

});

/* Comment Box - polling and update handling */
component.create('CommentBox', {
  tpl: tpl.box,
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comments.push(comment);
    this.setState({data: comments}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function(view) {
    return view();
  }
});