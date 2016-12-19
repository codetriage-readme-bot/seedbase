import React, { Component } from 'react';

var Condition = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-6">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="condition" />
          </div>
        </div>
        <div className="col-xs-3">
          <div className="form-group">
            <select className="form-control">
              <option>Regular Expression</option>
            </select>
          </div>
        </div>
        <div className="col-xs-1">
          <button className="btn btn-default-outline" onClick={this.showOptionsModal}>
            <span className="icon icon-tools"></span>
          </button>
        </div>
        <div className="col-xs-1">
          <button className="btn btn-default-outline" onClick={this.props.onRemove}>
            <span className="icon icon-erase"></span>
          </button>
        </div>
      </div>
    );
  }
});

export default Condition;