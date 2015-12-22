var BodyDispatcher = require('../dispatcher/BodyDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants.jsx');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _body = "";

function create(obj) {
  _body = obj.rendered_body;
}

var BodyStores = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _body;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
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
BodyDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case AppConstants.CREATE:

      articleList = action.articleList;
      if (text !== '') {
        create(articleList);
        BodyStores.emitChange();
      }
      break;

    case AppConstants.DESTROY:
      destroy(action.id);
      BodyStores.emitChange();
      break;

    case AppConstants.DESTROY_COMPLETED:
      BodyStores.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = BodyStores;
