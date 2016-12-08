import React, { Component } from 'react';
import Model from './model';

var ModelList = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
  },

  render: function() {
    let models = this.props.models.map((model, index) => <Model name={model.name} key={model.id} index={model.id} onRemove={this.props.handleRemove.bind(null, model)} />)
    return (
      <form onSubmit={this.handleSubmit}>
        {models}
        <div className="row">
          <div className="col-sm-9">
            <button onClick={this.props.handleAdd} className="btn btn-primary-outline p-x m-t m-r">
              <span className="icon icon-plus"></span> Add Model
            </button>
            <button type="submit" className="btn btn-success-outline p-x m-t pull-right" disabled={!models.length}>Continue</button>
          </div>
        </div>
      </form>
    );
  }
});

export default ModelList;