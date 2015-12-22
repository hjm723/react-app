var React = require('react');
var ReactPropTypes = React.PropTypes;
var ArticleItem = require('./ArticleItem.jsx');

var List = React.createClass({
  propTypes: {
    allArticles: ReactPropTypes.object.isRequired,
  },
  render: function() {
    if (Object.keys(this.props.allArticles).length < 1) {
      return null;
    }
    var allArticles = this.props.allArticles;
    var articles = [];
    for (var key in allArticles) {
      articles.push(
        <ArticleItem key={allArticles[key].id} obj={allArticles[key]} />
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            {articles}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = List;
