/**
 * Collapsible component
 */
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

/**
 * Select dropdown for type
 */
var Type = React.createClass({
  render: function() {
    return (
      <div className="col-xs-3">
        <div className="form-group">
          <select className="form-control">
            <option>Regular Expression</option>
          </select>
        </div>
      </div>
    );
  }
});

/**
 * The condition component
 */
var Condition = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-6">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="condition" />
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
 * The custom data type component
 */
var CustomDataType = React.createClass({
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
                  <ConditionList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var CustomDataTypeList = React.createClass({
  getInitialState: function() {
    return {
      customDataTypes: [0],
      counter: 1
    };
  },

  addCustomDataType: function(e) {
    e.preventDefault();
    this.setState({
      customDataType: this.state.customDataType.concat(this.state.counter),
      counter: this.state.counter + 1
    });
  },

  removeCustomDataType: function(key) {
    var i = this.state.customDataTypes.indexOf(key);
    this.state.customDataTypes.splice(i, 1);
    this.setState({customDataTypes: this.state.customDataTypes});
  },

  render: function() {
    let customDataTypes = this.state.customDataTypes.map((cdt) => <CustomDataType key={cdt.toString()} index={cdt} onRemove={this.removeCustomDataType.bind(null, cdt)} />)
    return (
      <div>
        {customDataTypes}
        <div class="row">
          <div class="col-sm-9">
            <button onClick={this.addCustomDataType} className="btn btn-primary-outline p-x m-t m-r">
              <span class="icon icon-plus"></span> Add Custom Data Type
            </button>
            <button className="btn btn-success-outline p-x m-t pull-right" disabled={!customDataTypes.length}>Continue</button>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <CustomDataTypeList />,
  document.getElementById('data-types')
);
