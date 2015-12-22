var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var ReactDOM = require('react-dom');
var Top = require('./views/Top.jsx');
var Body = require('./views/Body.jsx');

var Index = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
});

var Routes = (
  <Route path="/" component={Index}>
      <IndexRoute component={Top}/>
      <Route path="/items/:id" component={Body}/>
  </Route>
);

ReactDOM.render(
  <Router>{Routes}</Router>, document.getElementById("content")
);
