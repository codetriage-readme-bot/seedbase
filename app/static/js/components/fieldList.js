import React, { Component } from 'react';
import Field from './field';

var FieldList = React.createClass({
  render: function() {
    let fields = this.props.fields.map((field, index) => {
      return <Field key={field.id}
                    name={field.name}
                    dataType={field.dataType}
                    parentNode={field.parentNode}
                    fieldCallbacks={this.props.fieldCallbacks}
                    modelId={this.props.modelId}
                    fieldId={field.id}
                    index={index} />
    });
    return (
      <div>
        <div className="row">
          <div className="col-xs-3">Field Name</div>
          <div className="col-xs-3">Data Type</div>
          <div className="col-xs-3">Parent Node</div>
        </div>
        {fields}
        <div className="form-group">
          <button onClick={this.props.fieldCallbacks.add.bind(null, this.props.modelId, "", "", "")} className="btn btn-primary-outline">
            <span className="icon icon-plus"></span> Add Field
          </button>
        </div>
      </div>
    );
  }
});

export default FieldList;
