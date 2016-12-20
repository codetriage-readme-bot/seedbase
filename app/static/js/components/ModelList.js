import React, { Component, PropTypes } from 'react';
import Model from './Model';
import { Link } from 'react-router';

var ModelList = React.createClass({
  render: function() {
    let models = this.props.models.map((model, index) => {
      return <Model name={model.name}
                    key={model.id}
                    modelId={model.id}
                    index={index}
                    fields={model.fields}
                    modelCallbacks={this.props.modelCallbacks} /> 
    });

    let modelModal = this.props.children && React.cloneElement(this.props.children, {
      models: this.props.models,
      modelCallbacks: this.props.modelCallbacks
    });

    return (
      <div>
        {models}
        <Link to='/generator/models/new' onClick={() => $('.modal').modal('show')} className="btn btn-primary-outline p-x m-t m-r"><span className="icon icon-plus"></span></Link>
        {modelModal}
      </div>
    );
  }
});

ModelList.propTypes = {
  modelCallbacks: PropTypes.object,
  models: PropTypes.arrayOf(PropTypes.object)
}

export default ModelList;
