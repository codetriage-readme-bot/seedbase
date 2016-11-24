/**
 * Collapsible component
 */
var FieldList = React.createClass({
  getInitialState: function() {
    return {
      fields: [0],
      counter: 1,
      objects: []
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

  handleUserInput: function(key, value, name) {
    var objects;

    if (value == "JSON Object") {
      objects = this.state.objects;
      objects.push({name: name, key: key});
      this.setState({ objects: objects });
    } else {
      objects = this.state.objects;
      let i = objects.indexOf({name: name, key: key});
      objects.splice(i, 1);
      this.setState({ objects: objects });
    }
  },

  render: function() {
    let fields = this.state.fields.map((field) => <Field key={field.toString()}
                                                         onRemove={this.removeField.bind(null, field)}
                                                         onUserInput={this.handleUserInput.bind(null, field)}
                                                         data={this.state.objects} />)
    return (
      <div>
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
    this.setState({name: e.target.value});
    this.props.onUserInput(this.dataTypeInput.value, this.state.name);
  },

  handleDataTypeChange: function() {
    this.props.onUserInput(this.dataTypeInput.value, this.state.name);
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-xs-3">
          <div className="form-group">
            <input type="text" className="form-control" value={this.state.name} placeholder="field name" onChange={this.handleFieldNameChange} />
          </div>
        </div>
        <div className="col-xs-3">
          <div className="form-group">
            <select className="form-control" onChange={this.handleDataTypeChange} ref={(input) => this.dataTypeInput = input}>
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
              {this.props.data.map(function(field) {
                console.log(field)
                return <option key={field.key} value={field.name}>{field.name}</option>;
              })}
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
                      <input placeholder="Name" className="form-control" type="text" autoFocus />
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

  render: function() {
    let models = this.state.models.map((model) => <Model key={model.toString()} index={model} onRemove={this.removeModel.bind(null, model)} />)
    return (
      <div>
        {models}
        <div class="row">
          <div class="col-sm-9">
            <button onClick={this.addModel} className="btn btn-primary-outline p-x m-t m-r">
              <span class="icon icon-plus"></span> Add Model
            </button>
            <button className="btn btn-success-outline p-x m-t pull-right" disabled={!models.length}>Continue</button>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <ModelList />,
  document.getElementById('models')
);
