import React, { Component } from 'react';
import ModelList from './ModelList';
import update from 'react-addons-update';

class ModelContainer extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      models: []
    };
  };

  addModel(newModel) {
    console.log(newModel)
    console.log("Adding model.")
    let previousState = this.state;

    this.setState({ models: this.state.models.concat(newModel) });

    $.ajax({
      type: 'POST',
      url: `/api/models`,
      data: JSON.stringify(newModel),
      contentType: 'application/json',
      success: (data, textStatus, jqXHR) => {
        console.log(data);
        newModel.id = data.id;
        this.setState({ models: this.state.models })
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log("jqXHR: ", jqXHR);
        console.log("textStatus: ", textStatus);
        console.log("errorThrown: ", errorThrown);
        this.setState(previousState);
      }
    });
  };

  updateModel(modelId, key, value) {
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
  };

  deleteModel(modelId, modelIndex) {
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
  };

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
  };

  render() {
    let modelList = this.props.children && React.cloneElement(this.props.children, {
      models: this.state.models,
      modelCallbacks:{
        delete: this.deleteModel.bind(this),
           add: this.addModel.bind(this),
        update: this.updateModel.bind(this)
      }
    });
    return modelList;
  };
}

export default ModelContainer;
