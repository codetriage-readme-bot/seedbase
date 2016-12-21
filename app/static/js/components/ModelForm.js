import React, { Component, PropTypes } from 'react';
import Field from './Field';

class ModelForm extends Component {
	componentDidMount() {
		$('.modal').modal('show');
	};

	handleChange(field, event) {
		event.preventDefault()
		this.props.handleChange(field, event.target.value);
	};

	handleClose(event) {
		event.preventDefault();
		this.props.handleClose();
	};

	render() {
		let fields = this.props.draftModel.fields.map((field, index) => {
			return <Field key={field.id}
										name={field.name}
										dataType={field.data_type}
										parentNode={field.parent_node}
										modelId={this.props.modelId}
										fieldId={field.id}
										index={index}
										handleUpdateField={this.props.handleUpdateField}
										handleRemoveField={this.props.handleRemoveField}
										handleChange={this.props.handleChange}
										parentNodes={this.props.draftModel.fields.filter((field) => {
											return field.data_type == 'JSON Object';
										})} />
		});
		return(
			<form onSubmit={this.props.handleSubmit.bind(this)}>
				<div className="modal fade" data-backdrop="static" tabIndex="-1">
					<div className="modal-dialog modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" onClick={this.handleClose.bind(this)}><span>&times;</span></button>
								<h4 className="modal-title">{this.props.modalTitle}</h4>
							</div>
							<div className="modal-body">
								<div className="container-fluid">
									<div className="row">
										<div className="col-xs-6 col-xs-offset-3">
											<div className="form-group">
												<label>Model Name</label>
												<input type="text"
															 className="form-control"
															 defaultValue={this.props.draftModel.name}
															 placeholder="Model Name"
															 onChange={(event) => this.handleChange('name', event)}
															 required={true} />
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-xs-3">Field Name</div>
										<div className="col-xs-3">Data Type</div>
										<div className="col-xs-3">Parent Node</div>
									</div>
									{fields}
									<div className="form-group">
										<button onClick={this.props.handleAddField.bind(this)} className="btn btn-primary-outline">
											<span className="icon icon-plus"></span> Add Field
										</button>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" onClick={this.handleClose.bind(this)}>Close</button>
								<button type="submit" className="btn btn-primary">Save changes</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		);
	}
}

export default ModelForm;