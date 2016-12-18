import React, { Component, PropTypes } from 'react';
import Model from './model';

var ModelList = React.createClass({
  render: function() {
    let models = this.props.models.map((model, index) => {
      return <Model name={model.name}
                    key={model.id}
                    modelId={model.id}
                    index={index}
                    fields={model.fields}
                    modelCallbacks={this.props.modelCallbacks}
                    fieldCallbacks={this.props.fieldCallbacks} /> 
    });
    return (
      <form>
        {models}
        <div className="row">
          <div className="col-sm-12">
            <button onClick={this.props.modelCallbacks.add.bind(null, "")} className="btn btn-primary-outline p-x m-t m-r">
              <span className="icon icon-plus"></span> Add Model
            </button>
          </div>
        </div>
      </form>
    );
  }
});

ModelList.propTypes = {
  fieldCallbacks: PropTypes.object,
  modelCallbacks: PropTypes.object,
  models: PropTypes.arrayOf(PropTypes.object)
}

export default ModelList;
