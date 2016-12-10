import React, { Component } from 'react';
import ModelList from './modelList';
import update from 'react-addons-update';

var ModelContainer = React.createClass({
  getInitialState: function() {
    return {
      models: []
    };
  },

  addModel: function(modelName) {
    console.log("Adding model.")

    let newModel = { id: Date.now(), name: modelName };

    this.setState({ models: this.state.models.concat(newModel) });

    $.ajax({
      type: 'POST',
      url: `/api/models`,
      data: JSON.stringify(newModel),
      contentType: 'application/json',
      success: (data, textStatus, jqXHR) => {
        console.log(data);
        newModel.id = data.id;
        newModel.fields = data.fields;
        this.setState({ models: this.state.models.concat(newModel) })
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log("jqXHR: ", jqXHR);
        console.log("textStatus: ", textStatus);
        console.log("errorThrown: ", errorThrown);
      }
    });
  },

  deleteModel: function(modelId, modelIndex) {
    console.log("Deleting model.")
    console.log("Model ID: ", modelId);
    console.log("Model Index: ", modelIndex);
    let nextState = update(this.state.models, {
      $splice: [[modelIndex, 1]]
    });

    this.setState({ models: nextState });

    $.ajax({
      type: 'DELETE',
      url: `/api/models/${modelId}`,
      success: (data, textStatus, jqXHR) => {
        console.log(data);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log("jqXHR: ", jqXHR);
        console.log("textStatus: ", textStatus);
        console.log("errorThrown: ", errorThrown);
      }
    });
  },

  addField: function(modelId, fieldName, dataType) {
    console.log("Adding field.")

    let modelIndex = this.state.models.findIndex((model) => model.id == modelId);

    let newField = { id: Date.now(), name: fieldName, dataType: dataType };

    let nextState = update(this.state.models, {
      [modelIndex]: {
        fields: { $push: [newField] }
      }
    });

    this.setState({ models: nextState });

    $.ajax({
      type: 'POST',
      url: `/api/models/${modelId}/fields`,
      data: JSON.stringify(newField),
      contentType: 'application/json',
      success: (data, textStatus, jqXHR) => {
        console.log(data);
        newField.id = data.id;
        this.setState({ models: nextState });
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log("jqXHR: ", jqXHR);
        console.log("textStatus: ", textStatus);
        console.log("errorThrown: ", errorThrown);
      }
    });
  },

  deleteField: function(modelId, fieldId, fieldIndex) {
    console.log("Deleting field.")

    let modelIndex = this.state.models.findIndex((model) => model.id == modelId);

    let nextState = update(this.state.models, {
      [modelIndex]: {
        fields: { $splice: [[fieldIndex, 1]] }
      }
    });

    this.setState({ models: nextState });

    $.ajax({
      type: 'DELETE',
      url: `/api/models/${modelId}/fields/${fieldId}`,
      contentType: 'application/json',
      success: (data, textStatus, jqXHR) => {
        console.log("Successfully deleted.");
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log("jqXHR: ", jqXHR);
        console.log("textStatus: ", textStatus);
        console.log("errorThrown: ", errorThrown);
      }
    });
  },

  componentDidMount() {
    console.log("Getting models...")
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
      <ModelList models={this.state.models} 
                 modelCallbacks={{
                  toggle: this.toggleModel,
                  delete: this.deleteModel,
                     add: this.addModel }}
                 fieldCallbacks={{
                  delete: this.deleteField,
                     add: this.addField }} />
    );
  }
});

export default ModelContainer;
