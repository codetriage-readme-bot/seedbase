import React, { Component } from 'react';
import FieldList from './fieldList';

var Model = React.createClass({
  getInitialState: function() {
    return {
      collapsed: false,
      name: this.props.name
    };
  },

  handleCollapse: function(e) {
    e.preventDefault();
    this.setState({
      collapsed: !this.state.collapsed
    });
  },

  handleModelNameChange: function(e) {
    let value = e.target.value.replace(" ", "_").replace(/\b[a-z]/g, (letter) => {
      return letter.toUpperCase();
    });
    this.setState({ name: value });
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
                      <input placeholder="Name" className="form-control" value={this.props.name} onChange={this.handleModelNameChange} type="text" autoFocus required />
                    </div>
                    <div className="col-xs-8">
                      <button onClick={this.props.onRemove} className="pull-right btn btn-default">
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
                  <FieldList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Model;
