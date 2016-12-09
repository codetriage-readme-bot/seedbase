import React, { Component } from 'react';
import CustomDataType from './customDataType';

var CustomDataTypeList = React.createClass({
  getInitialState: function() {
    return {
      customDataTypes: [0],
      counter: 1
    };
  },

  addCustomDataType: function(e) {
    e.preventDefault();
    this.setState({
      customDataTypes: this.state.customDataTypes.concat(this.state.counter),
      counter: this.state.counter + 1
    });
    console.log(this.state.customDataTypes)
  },

  removeCustomDataType: function(key) {
    var i = this.state.customDataTypes.indexOf(key);
    this.state.customDataTypes.splice(i, 1);
    this.setState({customDataTypes: this.state.customDataTypes});
  },

  render: function() {
    let customDataTypes = this.state.customDataTypes.map((cdt) => <CustomDataType key={cdt.toString()} index={cdt} onRemove={this.removeCustomDataType.bind(null, cdt)} />)
    return (
      <div>
        {customDataTypes}
        <div className="row">
          <div className="col-sm-9">
            <button onClick={this.addCustomDataType} className="btn btn-primary-outline p-x m-t m-r">
              <span className="icon icon-plus"></span> Add Custom Data Type
            </button>
            <button className="btn btn-success-outline p-x m-t pull-right" disabled={!customDataTypes.length}>Continue</button>
          </div>
        </div>
      </div>
    );
  }
});

export default CustomDataTypeList;
