
# React comment box example

This is an alternative example to the offical [tutorial](https://github.com/reactjs/react-tutorial). The article about this tutorial is located in [facebook react docs](http://facebook.github.io/react/docs/tutorial.html). 

This example also includes server side component rendering. 

## Setup

```
   git clone https://github.com/nw/react-tutorial-alternative.git
   cd react-tutorial-alternative
   npm install
   npm start
```
webpack middleware is installed into the server. It will auto compile any changes made to the client application files.

__All__ client code is located in `client/` folder. Start the server, poke around and watch your changes on localhost:3000. (The rendered server response needs a server restart to refresh changes). 

## Overview

This version is an experiment with [react-jade](https://github.com/ForbesLindesay/react-jade). Currently it uses an experimental branch that allows for auto tag expansion into `react` components. It solves the issue of expanding tags that match user created react classes much like the convenience of jsx. If a tag is not found in `react.DOM` namespace it will default to a div instead of throwing an error at runtime.

A simple wrapper around `react.createClass` is used, see `lib/react-component`. The main purpose is to handle dependency injection into the views/templates. When you pass a `render` function it will be bound to the react class instance and passed a view. This view is a template function compiled by `react-jade`. 

```js

component.create('Comment', {
  tpl: tpl.comment,
  render: function(view) {
    var rawMarkup = converter.makeHtml(this.props.text);
    return view({rawMarkup: rawMarkup});
  }
});

```

For really simple components you can omit the options and just pass a `react-jade` template.

```js

component.create('CommentList', views.list); 

```

You can also omit the render function if you pass tpl in options as well.

## Views

`jade-react` function signature has been modified to allow `locals` and `components` to be passed. The wrapper automatically injects the following:

All components created with `component`

* __view__: instance of the react class. Ideally this would be `this`. Because of the code generation it makes it extremely difficult to manage with the closures created in the generated code.
* __props__: shortcut to view.props
* __state__: shortcut to view.state
* __components__: all custom created components are injected automatically

Along with any other properties you pass in. Similar to jsx autobinding is implemented via `react-jade`.

Example template:

```jade
  .commentBox
    h1 Comments
    CommentList(data=state.data)
    CommentForm(onCommentSubmit=view.handleCommentSubmit)
```
Provided CommentList and CommentForm have already been registered. These components will be rendered properly. Giving you similar power and freedom of `jsx`.

__Bonus__

Utilizing `webpack` and `react-jade-loader` you can define multiple react views in a single file. See: `client/components/comments/view.jade`


## Why?

I really like the concept of jsx but I hate html and more importantly inlined in my js. This approach while still not as elegant starts to bridge the gap in building your view logic with the same ease.

Jade has a lot of helpers that make writing js inside cleaner and easier (my opinion). 

* jade already has powerful className merging functionality, no need for a plugin.
* special helpers like `each` loops
* `react-jade` just introduced mixins as well. 


I believe this will offer a powerful abstraction layer for building even more complex UIs with ease.


## License

The MIT License (MIT)

Copyright (c) 2014 Nathan White

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.




