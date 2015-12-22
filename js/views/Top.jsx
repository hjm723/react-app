var React = require('react');
var Header = require('./Header.jsx');
var AppStores = require('../stores/AppStores.jsx');
var List = require('./List.jsx');

function getArticleState() {
  return {
    allArticles: AppStores.getAll()
  };
}

var Top = React.createClass({
  getInitialState: function() {
    return getArticleState();
  },
  componentDidMount: function() {
    AppStores.addChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getArticleState());
  },
  componentWillUnmount: function() {
    console.log('unmount');
    this.setState({
      allArticles: null
    });
  },
  render: function(){
    return (
      <div>
        <Header />
        <List allArticles={this.state.allArticles} />
      </div>
    );
  }
});

module.exports = Top;
