var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var AppConstants = require('../constants/AppConstants.jsx');

var CHANGE_EVENT = 'change';

var _articles = {};

function create(articleList) {
  for (var i in articleList) {
    var id = articleList[i].id;
    _articles[id] = {
      id: id,
      title: articleList[i].title,
      author: articleList[i].user.id,
      tags: articleList[i].tags,
      icon_url: articleList[i].user.profile_image_url
    }
  }
}

function destroy(id) {
  delete _articles[id];
}

function destroyCompleted() {
  for (var id in _articles) {
    destroy(id);
  }
}

var AppStores = assign({}, EventEmitter.prototype, {

  areAllComplete: function() {
    for (var id in _articles) {
      if (!_articles[id].complete) {
        return false;
      }
    }
    return true;
  },

  getAll: function() {
    return _articles;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case AppConstants.CREATE:
      articleList = action.articleList;
      if (text !== '') {
        create(articleList);
        AppStores.emitChange();
      }
      break;

    case AppConstants.DESTROY:
      destroy(action.id);
      AppStores.emitChange();
      break;

    case AppConstants.DESTROY_COMPLETED:
      destroyCompleted();
      AppStores.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = AppStores;
