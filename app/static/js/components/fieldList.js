import React, { Component } from 'react';
import Field from './field';

var FieldList = React.createClass({
  getInitialState: function() {
    return {
      fields: [0],
      counter: 1,
      objects: [],
      fieldNames: {"0": ""}
    };

    this.handleUserInput = this.handleUserInput.bind(this);
  },

  addField: function(e) {
    e.preventDefault();
    this.setState({
      fields: this.state.fields.concat(this.state.counter),
      counter: this.state.counter + 1
    });
  },

  removeField: function(key) {
    var i = this.state.fields.indexOf(key);
    this.state.fields.splice(i, 1);
    this.setState({fields: this.state.fields});
  },

  handleDataTypeChange: function(key, value, name) {
    var objects;

    if (value == "JSON Object") {
      objects = this.state.objects;
      objects.push(key);
      this.setState({ objects: objects });
    } else {
      objects = this.state.objects;
      for (var index = 0; index < objects.length; index++) {
        if (objects[index] == key) {
          objects.splice(index, 1);
          this.setState({ objects: objects });
        }
      }
    }
  },

  /* Update the state object that holds field names
   * with key as key of field and value as field name
   * E.G. {"0": "field_name_1", "1": "field_name_2"}
   */
  handleFieldNameChange: function(key, value) {
    for (var fieldName in this.state.fieldNames) {
      let fieldNames = this.state.fieldNames;
      fieldNames[key.toString()] = value;
      this.setState({ fieldNames: fieldNames });
    }
  },

  render: function() {
    let fields = this.state.fields.map((field) => <Field key={field}
                                                         onRemove={this.removeField.bind(null, field)}
                                                         onDataTypeChanged={this.handleDataTypeChange.bind(null, field)}
                                                         onFieldNameChanged={this.handleFieldNameChange.bind(null, field)}
                                                         objects={this.state.objects}
                                                         names={this.state.fieldNames} />)
    return (
      <div>
        <div className="row">
          <div className="col-xs-3">Field Name</div>
          <div className="col-xs-3">Data Type</div>
          <div className="col-xs-3">Parent Node</div>
        </div>
        {fields}
        <div className="form-group">
          <button onClick={this.addField} className="btn btn-primary-outline">
            <span className="icon icon-plus"></span> Add Field
          </button>
        </div>
      </div>
    );
  }
});

export default FieldList;
