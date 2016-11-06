/**
 * Collapsible component
 */
var FieldList = React.createClass({
  getInitialState: function() {
    return {
      fields: []
    };
  },

  addField: function() {
    this.props.count += 1;
    this.forceUpdate();
  },

  removeField: function(index) {
    this.state.fields.splice(index);
    this.props.count -= 1;
    this.forceUpdate();
  },

  render: function() {

    for (var index = 0; index < this.props.count; index++) {
      this.state.fields.push(<Field key={index} removeField={this.removeField} />);
    }

    return (
      <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel">
        <div className="panel-body">
          {this.state.fields}
          <div className="form-group">
            <button onClick={this.addField} className="btn btn-primary-outline">
              <span className="icon icon-plus"></span> Add Field
            </button>
          </div>
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
  removeField: function() {
    this.props.removeField(this.props.key);
  },

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
          <button className="btn btn-default-outline" onClick={() => {this.props.removeField(this.props.index)}}>
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
      collapsed: false,
      fieldCount: 1
    };
  },

  handleClick: function() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="panel-group" id="accordion" role="tablist">
            <div className="panel panel-default">
              <div className="panel-heading" role="tab">
                <h4 className="panel-title">
                  <div className="row">
                    <div className="col-xs-4">
                      <input placeholder="Model" className="form-control" type="text" autoFocus />
                    </div>
                    <div className="col-xs-8">
                      <button onClick={this.handleClick} className="pull-right btn btn-default" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                        <span className={"icon " + (this.state.collapsed ? "icon-squared-plus" : "icon-squared-minus")}></span>
                      </button>
                    </div>
                  </div>
                </h4>
              </div>
              <FieldList count={this.state.fieldCount} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Model />,
  document.getElementById('schema')
);
