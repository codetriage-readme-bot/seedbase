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

    let previousState = this.state;
    let newModel = { id: Date.now(), name: modelName, fields: [] };

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
        this.setState({ models: this.state.models })
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log("jqXHR: ", jqXHR);
        console.log("textStatus: ", textStatus);
        console.log("errorThrown: ", errorThrown);
        this.setState(previousState);
      }
    });
  },

  updateModel: function(modelId, key, value) {
    console.log("Updating model.");

    let modelIndex = this.state.models.findIndex((model) => model.id == modelId);
    let model = this.state.models[modelIndex];

    this.setState(update(this.state, {
      models: {
        [modelIndex]: {
          [key]: { $set: value }
        }
      }
    }));
  },

  deleteModel: function(modelId, modelIndex) {
    console.log("Deleting model.")
    console.log("Model ID: ", modelId);
    console.log("Model Index: ", modelIndex);

    let previousState = this.state;
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
        this.setState(previousState);
      }
    });
  },

  addField: function(modelId, fieldName, dataType, parentNode) {
    console.log("Adding field.")

    let previousState = this.state;
    let modelIndex = this.state.models.findIndex((model) => model.id == modelId);
    let newField = { id: Date.now(), name: fieldName, dataType: dataType, parentNode: parentNode };
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
        this.setState(previousState);
      }
    });
  },

  updateField: function(modelId, fieldId, key, value) {
    console.log("Updating field.");

    let modelIndex = this.state.models.findIndex((model) => model.id == modelId);
    let model = this.state.models[modelIndex];
    let fieldIndex = model.fields.findIndex((field) => field.id == fieldId);
    let field = model.fields[fieldIndex];

    this.setState(update(this.state, {
      models: {
        [modelIndex]: {
          fields: { 
            [fieldIndex]: {
              [key]: { $set: value }
            }
          }
        }
      }
    }));
  },

  deleteField: function(modelId, fieldId, fieldIndex) {
    console.log("Deleting field.")

    let previousState = this.state;
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
        this.setState(previousState);
      }
    });
  },

  save: function() {
    $.ajax({
      type: 'PUT',
      url: `/api/models/update_many`,
      data: JSON.stringify({models: this.state.models}),
      contentType: 'application/json',
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
                  delete: this.deleteModel,
                     add: this.addModel,
                  update: this.updateModel }}
                 fieldCallbacks={{
                  delete: this.deleteField,
                     add: this.addField,
                  update: this.updateField }}
                  onSave={this.save} />
    );
  }
});

export default ModelContainer;
