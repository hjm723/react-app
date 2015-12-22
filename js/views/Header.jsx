var React = require('react');
var $ = require('jQuery');
var ListActions = require('../actions/ListActions.jsx');

var Header = React.createClass({
  render: function(){
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">react sample</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
              <div className="navbar-form navbar-right" >
                <div className="form-group">
                  <input id="search-box" className="form-control" placeholder="キーワードを入力" defaultValue=""/>
                </div>
                <button type="button" className="btn btn-success search-btn" onClick={this.handleSubmit}>
                  <span className="glyphicon glyphicon-search"></span>検索
                </button>
              </div>
          </div>
        </div>
      </nav>
    );
  },
  handleSubmit:function(e){
    var text = $('#search-box').val();
    ListActions.destroyCompleted();
    ListActions.getList(text);
  },
});

module.exports = Header;
