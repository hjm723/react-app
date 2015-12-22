var React = require('react');
var ReactPropTypes = React.PropTypes;
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var ListActions = require('../actions/ListActions.jsx');

var ArticleItem = React.createClass({
  propTypes: {
    obj: ReactPropTypes.object.isRequired,
  },
  render: function() {
    var obj = this.props.obj;
    var href = ['/items/', obj.id].join('');
    var tags = [];
    for (var key in obj.tags) {
      tags.push(
        <button type="button" className="btn btn-default btn-xs" key={key} onClick={this.onTagClick}>
          {obj.tags[key].name}
        </button>
      );
    }
    return (
      <div className="article">
        <p>
          <Link to={href} className="user-icon"><img src={obj.icon_url} /></Link>
          {obj.author} さんが投稿
        </p>
        <p className="article-title">
          <Link to={href} >{obj.title}</Link>
        </p>
        <p>{tags}</p>
        <hr />
      </div>
    );
  },
  onTagClick: function() {
    var tagName= event.target.innerHTML;
    $('#search-box').val('tag:' + tagName);
    ListActions.destroyCompleted();
    ListActions.getListByTag(tagName);
  }
});

module.exports = ArticleItem;
