import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Model extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      collapsed: false
    };
  };

  handleCollapse() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    let fields = this.props.fields.map((field, index) => {
      return(
        <div className="row" key={field.id}>
          <div className="col-xs-4">
            <div className="form-group">
              <input className="form-control" value={field.name} readOnly />
            </div>
          </div>
          <div className="col-xs-4">
            <div className="form-group">
              <input className="form-control" value={field.data_type} readOnly />
            </div>
          </div>
          <div className="col-xs-4">
            <div className="form-group">
              <input className="form-control" value={field.parent_node || ""} readOnly />
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="panel-group" id={"accordion-" + this.props.index} role="tablist">
            <div className="panel panel-default">
              <div className="panel-heading" role="tab">
                <div className="panel-title">
                  <div className="row">
                    <div className="col-xs-4">
                      <h3>{this.props.name}</h3>
                    </div>
                    <div className="col-xs-8">
                      <button onClick={this.props.modelCallbacks.delete.bind(null, this.props.modelId, this.props.index)}
                              className="pull-right btn btn-default">
                        <span className="icon icon-squared-cross"></span>
                      </button>
                      <button onClick={this.handleCollapse.bind(this)}
                              className="pull-right btn btn-default"
                              data-toggle="collapse"
                              data-target={"#collapse-" + this.props.index}>
                        <span className={"icon " + (this.state.collapsed ? "icon-squared-plus" : "icon-squared-minus")}></span>
                      </button>
                      <Link to={`generator/models/${this.props.modelId}/edit`}
                            onClick={() => $('.modal').modal('show')}
                            className="pull-right btn btn-default">
                        <span className="icon icon-pencil"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div id={"collapse-" + this.props.index} className="panel-collapse collapse in" role="tabpanel">
                <div className="panel-body">
                  <div>
                    <div className="row">
                      <div className="col-xs-4">Field Name</div>
                      <div className="col-xs-4">Data Type</div>
                      <div className="col-xs-4">Parent Node</div>
                    </div>
                    {fields}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Model.propTypes = {
  name: PropTypes.string,
  index: PropTypes.number,
  fields: PropTypes.arrayOf(PropTypes.object),
  modelCallbacks: PropTypes.object,
  fieldCallbacks: PropTypes.object
}

export default Model;
