import React, { Component } from 'react';

var Field = React.createClass({
  showOptionsModal: function(e) {
    e.preventDefault();
    console.log("Show options modal...");
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-xs-3">
          <div className="form-group">
            <input type="text" className="form-control" data-name="name" value={this.props.name} placeholder="name" />
          </div>
        </div>
        <div className="col-xs-3">
          <div className="form-group">
            <input className="form-control" data-name="data_type" value={this.props.dataType} />
          </div>
        </div>
        <div className="col-xs-3">
          <div className="form-group">
            <input className="form-control" data-name="parentNode" value={this.props.parentNode} />
          </div>
        </div>
        <div className="col-xs-1">
          <button className="btn btn-default-outline" onClick={this.showOptionsModal}>
            <span className="icon icon-tools"></span>
          </button>
        </div>
        <div className="col-xs-1">
          <button className="btn btn-default-outline" onClick={this.props.fieldCallbacks.delete.bind(null, this.props.modelId, this.props.fieldId, this.props.index)}>
            <span className="icon icon-erase"></span>
          </button>
        </div>
      </div>
    );
  }
});

export default Field;
