import React, { Component } from 'react';
import ModelList from './modelList';

var ModelContainer = React.createClass({
  getInitialState: function() {
    return {
      models: []
    };
  },

  addModel: function(e) {
    e.preventDefault();
    this.setState({
      models: this.state.models.concat({}),
    });
  },

  removeModel: function(model) {
    var models = $.grep(this.state.models, (m) => {
      return m.id != model.id;
    });
    this.setState({models: models});
  },

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/api/models',
      success: (data, textStatus, jqXHR) => {
        console.log(data);
        this.setState({ models: data });
        window.scrollTo(0, 0);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log("jqXHR: ", jqXHR);
        console.log("textStatus: ", textStatus);
        console.log("errorThrown: ", errorThrown);
      }
    });
  },

  render() {
    return(
      <ModelList models={this.state.models} handleRemove={this.removeModel} handleAdd={this.addModel} />
    );
  }
});

export default ModelContainer;