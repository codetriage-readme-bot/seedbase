/**
 * Collapsible component
 */
var FieldList = React.createClass({
  getInitialState: function() {
    return {
      fields: [0],
      counter: 1
    };
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

  render: function() {
    let fields = this.state.fields.map((field) => <Field key={field.toString()} onRemove={this.removeField.bind(null, field)} />)
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
 * Select dropdown for type
 */
var Type = React.createClass({
  render: function() {
    return (
      <div className="col-xs-3">
        <div className="form-group">
          <select className="form-control">
            <option>Boolean</option>
            <option>Random Number</option>
            <option>Random String</option>
          </select>
        </div>
      </div>
    );
  }
});

/**
 * The field component
 */
var Field = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-6">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="field" />
          </div>
        </div>
        <Type />
        <div className="col-xs-3">
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
  document.getElementById('schema')
);
