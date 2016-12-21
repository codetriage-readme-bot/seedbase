import React, { Component, PropTypes } from 'react';
import ModelForm from './ModelForm';
import { browserHistory } from 'react-router';
import update from 'react-addons-update';

class EditModel extends Component {
	componentWillMount() {
		let model = this.props.models.find((model) => model.id == this.props.params.model_id);
		this.setState({
			id: model.id,
			name: model.name,
			fields: model.fields
		});
	};

	handleChange(field, value) {
		this.setState({ [field]: value });
	};

	handleSubmit(event) {
		event.preventDefault();
		$('.modal').modal('hide');
		this.props.modelCallbacks.update(this.state);
		browserHistory.push('/generator/models');
	};

	handleClose() {
		$('.modal').modal('hide');
		browserHistory.push('/generator/models');
	};

	handleAddField(event) {
		event.preventDefault();

		let nextState = update(
			this.state.fields, { $push: [{ id: Date.now() }] }
		);

		this.setState({ fields: nextState });
	};

	handleUpdateField(fieldId, fieldName, fieldValue) {
		let fieldIndex = this.state.fields.findIndex((f) => f.id == fieldId);

		let nextState = update(
			this.state.fields, {
				[fieldIndex]: {
					[fieldName]: { $set: fieldValue }
				}
			}
		);

		this.setState({ fields: nextState });
	};

	handleRemoveField(fieldId) {
		let fieldIndex = this.state.fields.findIndex((field) => field.id == fieldId);
		let nextState = update(this.state.fields, { $splice: [[fieldIndex, 1]] });

		this.setState({ fields: nextState });
	};

	render() {
		return(
			<ModelForm draftModel={this.state}
								 modalTitle={"Edit Model"}
								 handleChange={this.handleChange.bind(this)}
								 handleSubmit={this.handleSubmit.bind(this)}
								 handleClose={this.handleClose.bind(this)}
								 handleAddField={this.handleAddField.bind(this)}
								 handleUpdateField={this.handleUpdateField.bind(this)}
								 handleRemoveField={this.handleRemoveField.bind(this)} />
		);
	}
}

EditModel.propTypes = {
	modelCallbacks: PropTypes.object
};

export default EditModel;