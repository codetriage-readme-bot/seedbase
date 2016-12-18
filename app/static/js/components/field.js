import React, { Component } from 'react';

var Field = React.createClass({
  showOptionsModal: function(e) {
    e.preventDefault();
    console.log("Show options modal...");
  },

  handleChange: function(e) {
    this.props.fieldCallbacks.update(this.props.modelId, this.props.fieldId, e.target.getAttribute('data-name'), e.target.value)
  },

  render: function() {
    var parentNodes = this.props.parentNodes.map((field, index) => {
      return <option key={index}>{field.name}</option>
    });

    return (
      <div className="row">
        <div className="col-xs-3">
          <div className="form-group">
            <input type="text" className="form-control" data-name="name" defaultValue={this.props.name} onChange={this.handleChange} placeholder="name" />
          </div>
        </div>
        <div className="col-xs-3">
          <div className="form-group">
            <select className="form-control" data-name="data_type" value={this.props.dataType} onChange={this.handleChange}>
              <option>Boolean</option>
              <option>Random Number</option>
              <option>Random String</option>
              <option>JSON Object</option>
              <option>JSON Array</option>
              <option>Array</option>
            </select>
          </div>
        </div>
        <div className="col-xs-3">
          <div className="form-group">
            <select className="form-control" data-name="parentNode" defaultValue={this.props.parentNode} onChange={this.handleChange}>
              <option></option>
              {parentNodes}
            </select>
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
