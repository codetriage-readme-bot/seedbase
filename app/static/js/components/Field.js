import React, { Component } from 'react';

class Field extends Component {
  showOptionsModal(event) {
    event.preventDefault();
    console.log("Show options modal...");
  };

  handleChange(field, event) {
    event.preventDefault();
    this.props.handleUpdateField(this.props.fieldId, field, event.target.value);
  };

  render() {
    let parentNodes = this.props.parentNodes.map((field, index) => {
      return <option key={index}>{field.name}</option>
    });

    return (
      <div className="row">
        <div className="col-xs-3">
          <div className="form-group">
            <input type="text" className="form-control" onChange={(event) => this.handleChange('name', event)} defaultValue={this.props.name} placeholder="name" required={true} />
          </div>
        </div>
        <div className="col-xs-3">
          <div className="form-group">
            <select className="form-control" defaultValue={this.props.dataType} onChange={(event) => this.handleChange('data_type', event)} required={true}>
              <option disabled selected></option>
              <option>Boolean</option>
              <option>Number</option>
              <option>String</option>
              <option>JSON Object</option>
              <option>JSON Array</option>
              <option>Array</option>
            </select>
          </div>
        </div>
        <div className="col-xs-3">
          <div className="form-group">
            <select className="form-control" defaultValue={this.props.parentNode} onChange={(event) => this.handleChange('parent_node', event)} required={true}>
              <option>&#123;&nbsp;&#125;</option>
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
          <button className="btn btn-default-outline" onClick={this.props.handleRemoveField.bind(this, this.props.fieldId)}>
            <span className="icon icon-erase"></span>
          </button>
        </div>
      </div>
    );
  };
}

export default Field;
