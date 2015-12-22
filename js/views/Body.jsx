var React = require('react');
var BodyStores = require('../stores/BodyStores.jsx');
var BodyActions = require('../actions/BodyActions.jsx');

function getBodyState() {
  return {
    body: BodyStores.getAll()
  };
}

var Body = React.createClass({
  getInitialState: function() {
    return getBodyState();
  },
  componentDidMount: function() {
    BodyActions.getBody(this.props.params.id);
    BodyStores.addChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getBodyState());
  },
  render:function(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div dangerouslySetInnerHTML={{__html: this.state.body}}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Body;
