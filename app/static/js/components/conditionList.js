import React, { Component } from 'react';
import Condition from './condition'

var ConditionList = React.createClass({
  getInitialState: function() {
    return {
      conditions: [0],
      counter: 1
    };
  },

  addCondition: function(e) {
    e.preventDefault();
    this.setState({
      conditions: this.state.conditions.concat(this.state.counter),
      counter: this.state.counter + 1
    });
  },

  removeCondition: function(key) {
    var i = this.state.conditions.indexOf(key);
    this.state.conditions.splice(i, 1);
    this.setState({conditions: this.state.conditions});
  },

  render: function() {
    let conditions = this.state.conditions.map((condition) => <Condition key={condition.toString()} onRemove={this.removeCondition.bind(null, condition)} />)
    return (
      <div>
        {conditions}
        <div className="form-group">
          <button onClick={this.addCondition} className="btn btn-primary-outline">
            <span className="icon icon-plus"></span> Add Condition
          </button>
        </div>
      </div>
    );
  }
});

export default ConditionList;