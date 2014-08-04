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
  var template = options.tpl
    , render = options.render;
  
  options.displayName = name;

  options.render = function(){
    var self = this;
    return render.call(self, function(locals){
      var payload = merge({view: self, state: self.state, props: self.props}, locals || {});
      return template(payload, components);
    }, self);
  }
  
  return components[name] = react.createClass(options);
};

function render(name, props, container){
  if(typeof container === 'string') container = document.getElementById(container);
  var component = components[name];
  if(!component) return;
  return react.renderComponent(component(props), container);
}
