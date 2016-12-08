import React, { Component } from 'react';

var Field = React.createClass({
  getInitialState: function() {
    return {
      name: ""
    };
  },

  showOptionsModal: function(e) {
    e.preventDefault();
    console.log("Show options modal...");
  },

  handleFieldNameChange: function(e) {
    let value = e.target.value.replace(" ", "_");
    this.setState({ name: value });
    this.props.onFieldNameChanged(value);
  },

  handleDataTypeChange: function() {
    this.props.onDataTypeChanged(this.dataTypeInput.value, this.state.name);
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-xs-3">
          <div className="form-group">
            <input type="text" className="form-control" value={this.state.name} placeholder="name" onChange={this.handleFieldNameChange} required />
          </div>
        </div>
        <div className="col-xs-3">
          <div className="form-group">
            <select className="form-control" onChange={this.handleDataTypeChange} ref={(input) => this.dataTypeInput = input} required>
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
            <select className="form-control">
              <option></option>
              {this.props.objects.map(function(field) {
                if (this.state.name != this.props.names[field.toString()]) {
                  return <option key={field} value={this.props.names[field.toString()]}>{this.props.names[field.toString()]}</option>;
                }
              }.bind(this))}
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

export default Field;
