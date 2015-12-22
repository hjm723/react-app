var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var AppConstants = require('../constants/AppConstants.jsx');
var $ = require('jQuery');

var ListActions = {
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.DESTROY_COMPLETED
    });
  },
  getList: function(text) {
    var url = ["https://qiita.com/api/v2/items?page=1&per_page=20&query=", text].join('');
    $.ajax({
      type: "GET"
      , cache: false
      , url: url
    }).done(function(res, status, xhr) {
      AppDispatcher.dispatch({
        actionType: AppConstants.CREATE,
        articleList: res
      });
    }.bind(this));
  },
  getListByTag: function(text) {
    var search = ["tag:", text].join('');
    var url = ["https://qiita.com/api/v2/items?page=1&per_page=20&query=", search].join('');
    $.ajax({
      type: "GET"
      , cache: false
      , url: url
    }).done(function(res) {
      AppDispatcher.dispatch({
        actionType: AppConstants.CREATE,
        articleList: res
      });
    }.bind(this));
  }
};

module.exports = ListActions;
