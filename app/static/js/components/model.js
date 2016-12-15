import React, { Component, PropTypes } from 'react';
import FieldList from './fieldList';

var Model = React.createClass({
  getInitialState: function() {
    return {
      collapsed: false
    };
  },

  handleCollapse: function() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  },

  handleChange: function(e) {
    this.props.modelCallbacks.update(this.props.modelId, "name", e.target.value)
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="panel-group" id={"accordion-" + this.props.index} role="tablist">
            <div className="panel panel-default">
              <div className="panel-heading" role="tab">
                <h4 className="panel-title">
                  <div className="row">
                    <div className="col-xs-4">
                      <input placeholder="Name" className="form-control" onChange={this.handleChange} defaultValue={this.props.name} type="text" autoFocus />
                    </div>
                    <div className="col-xs-8">
                      <button onClick={this.props.modelCallbacks.delete.bind(null, this.props.modelId, this.props.index)} className="pull-right btn btn-default">
                      <span className="icon icon-squared-cross"></span>
                      </button>
                      <button onClick={this.handleCollapse} className="pull-right btn btn-default" data-toggle="collapse" data-target={"#collapse-" + this.props.index}>
                        <span className={"icon " + (this.state.collapsed ? "icon-squared-plus" : "icon-squared-minus")}></span>
                      </button>
                    </div>
                  </div>
                </h4>
              </div>
              <div id={"collapse-" + this.props.index} className="panel-collapse collapse in" role="tabpanel">
                <div className="panel-body">
                  <FieldList fields={this.props.fields} fieldCallbacks={this.props.fieldCallbacks} modelId={this.props.modelId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

Model.propTypes = {
  name: PropTypes.string,
  index: PropTypes.number,
  fields: PropTypes.arrayOf(PropTypes.object),
  modelCallbacks: PropTypes.object,
  fieldCallbacks: PropTypes.object
}

export default Model;
