var BodyDispatcher = require('../dispatcher/BodyDispatcher.jsx');
var AppConstants = require('../constants/AppConstants.jsx');
var $ = require('jQuery');

var BodyActions = {
  getBody: function(id) {
    var url = ["https://qiita.com/api/v2/items/", id].join('');
    $.ajax({
      type: "GET"
      , cache: false
      , url: url
    }).done(function(res) {
      BodyDispatcher.dispatch({
        actionType: AppConstants.CREATE,
        articleList: res
      });
    }.bind(this));
  }
};

module.exports = BodyActions;
