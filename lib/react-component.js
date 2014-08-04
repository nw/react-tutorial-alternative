var react = require('react')
  , merge = require('extend')
  , components = {}
  , settings = {};

module.exports = {
  set: function(opts){ merge(settings, opts); }
, create: create
, render: render
, components: components
};

function create(name, options){
  options = options || {};
  
  var template = options.tpl
    , render = options.render;
  
  if(typeof options === 'function'){
    template = options;
    options = {};
  };
  
  
  options.displayName = name;

  options.render = function(){
    var self = this;
    
    if(typeof render === 'function'){
      return render.call(self, view);
    } else {
      return view.call(self);
    }
    
    function view(locals){
      var payload = merge({view: self, state: self.state, props: self.props}, locals || {});
      return template(payload, components);
    }
  }
  
  return components[name] = react.createClass(options);
};

function render(name, props, container){
  if(typeof container === 'string') container = document.getElementById(container);
  var component = components[name];
  if(!component) return;
  return react.renderComponent(component(props), container);
}
