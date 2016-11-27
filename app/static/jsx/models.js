/**
 * Collapsible component
 */
var FieldList = React.createClass({
  getInitialState: function() {
    return {
      fields: [0],
      counter: 1,
      objects: [],
      fieldNames: {"0": ""}
    };

    this.handleUserInput = this.handleUserInput.bind(this);
  },

  addField: function(e) {
    e.preventDefault();
    this.setState({
      fields: this.state.fields.concat(this.state.counter),
      counter: this.state.counter + 1
    });
  },

  removeField: function(key) {
    var i = this.state.fields.indexOf(key);
    this.state.fields.splice(i, 1);
    this.setState({fields: this.state.fields});
  },

  handleDataTypeChange: function(key, value, name) {
    var objects;

    if (value == "JSON Object") {
      objects = this.state.objects;
      objects.push(key);
      this.setState({ objects: objects });
    } else {
      objects = this.state.objects;
      objects.splice(objects.indexOf(key), 1);
      this.setState({ objects: objects });
    }
  },

  /* Update the state object that holds field names
   * with key as key of field and value as field name
   * E.G. {"0": "field_name_1", "1": "field_name_2"}
   */
  handleFieldNameChange: function(key, value) {
    for (var fieldName in this.state.fieldNames) {
      let fieldNames = this.state.fieldNames;
      fieldNames[key.toString()] = value;
      this.setState({ fieldNames: fieldNames });
    }
  },

  render: function() {
    let fields = this.state.fields.map((field) => <Field key={field}
                                                         onRemove={this.removeField.bind(null, field)}
                                                         onDataTypeChanged={this.handleDataTypeChange.bind(null, field)}
                                                         onFieldNameChanged={this.handleFieldNameChange.bind(null, field)}
                                                         objects={this.state.objects}
                                                         names={this.state.fieldNames} />)
    return (
      <div>
        <div className="row">
          <div className="col-xs-3">Field Name</div>
          <div className="col-xs-3">Data Type</div>
          <div className="col-xs-3">Parent Node</div>
        </div>
        {fields}
        <div className="form-group">
          <button onClick={this.addField} className="btn btn-primary-outline">
            <span className="icon icon-plus"></span> Add Field
          </button>
        </div>
      </div>
    );
  }
});

/**
 * The field component
 */
var Field = React.createClass({
  getInitialState: function() {
    return {
      name: null
    };
  },

  showOptionsModal: function(e) {
    e.preventDefault();
    console.log("Show options modal...");
  },

  handleFieldNameChange: function(e) {
    let value = e.target.value.replace(" ", "_");
    this.setState({ name: value });
    this.props.onFieldNameChanged(value);
  },

  handleDataTypeChange: function() {
    this.props.onDataTypeChanged(this.dataTypeInput.value, this.state.name);
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-xs-3">
          <div className="form-group">
            <input type="text" className="form-control" value={this.state.name} placeholder="name" onChange={this.handleFieldNameChange} required />
          </div>
        </div>
        <div className="col-xs-3">
          <div className="form-group">
            <select className="form-control" onChange={this.handleDataTypeChange} ref={(input) => this.dataTypeInput = input} required>
              <option>Boolean</option>
              <option>Random Number</option>
              <option>Random String</option>
              <option>JSON Object</option>
              <option>JSON Array</option>
              <option>Array</option>
            </select>
          </div>
        </div>
        <div className="col-xs-3">
          <div className="form-group">
            <select className="form-control">
              <option></option>
              {this.props.objects.map(function(field) {
                if (this.state.name != this.props.names[field.toString()]) {
                  return <option key={field} value={this.props.names[field.toString()]}>{this.props.names[field.toString()]}</option>;
                }
              }.bind(this))}
            </select>
          </div>
        </div>
        <div className="col-xs-1">
          <button className="btn btn-default-outline" onClick={this.showOptionsModal}>
            <span className="icon icon-tools"></span>
          </button>
        </div>
        <div className="col-xs-1">
          <button className="btn btn-default-outline" onClick={this.props.onRemove}>
            <span className="icon icon-erase"></span>
          </button>
        </div>
      </div>
    );
  }
});

/**
 * The model component
 */
var Model = React.createClass({
  getInitialState: function() {
    return {
      collapsed: false
    };
  },

  handleCollapse: function(e) {
    e.preventDefault();
    this.setState({
      collapsed: !this.state.collapsed
    });
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
                      <input placeholder="Name" className="form-control" type="text" autoFocus required />
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

var ModelList = React.createClass({
  getInitialState: function() {
    return {
      models: [0],
      counter: 1
    };
  },

  addModel: function(e) {
    e.preventDefault();
    this.setState({
      models: this.state.models.concat(this.state.counter),
      counter: this.state.counter + 1
    });
  },

  removeModel: function(key) {
    var i = this.state.models.indexOf(key);
    this.state.models.splice(i, 1);
    this.setState({models: this.state.models});
  },

  handleSubmit: function(event) {
    event.preventDefault();

    let data = {
      models: [
        {
          model_name: 'model_name',
          fields: [
            {
              field_name: 'parent_node',
              data_type: 'json_object',
              parent_node: null,
              options: {}
            },
            {
              field_name: 'child_node',
              data_type: 'boolean',
              parent_node: 'parent_node',
              options: {}
            }
          ]
        }
      ]
    };

    $.ajax({
      url: '/generator/models',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(data) {
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err);
      }.bind(this)
    });
  },

  render: function() {
    let models = this.state.models.map((model) => <Model key={model.toString()} index={model} onRemove={this.removeModel.bind(null, model)} />)
    return (
      <form onSubmit={this.handleSubmit}>
        {models}
        <div class="row">
          <div class="col-sm-9">
            <button onClick={this.addModel} className="btn btn-primary-outline p-x m-t m-r">
              <span class="icon icon-plus"></span> Add Model
            </button>
            <button type="submit" className="btn btn-success-outline p-x m-t pull-right" disabled={!models.length}>Continue</button>
          </div>
        </div>
      </form>
    );
  }
});

ReactDOM.render(
  <ModelList />,
  document.getElementById('models')
);
