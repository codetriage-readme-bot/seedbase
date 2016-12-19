import React, { Component } from 'react';
import Field from './Field';

var FieldList = React.createClass({
  render: function() {
    let fields = this.props.fields.map((field, index) => {
      return <Field key={field.id}
                    name={field.name}
                    dataType={field.data_type}
                    parentNode={field.parent_node}
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
      </div>
    );
  }
});

export default FieldList;
