import React, { Component, PropTypes } from 'react';
import ModelForm from './ModelForm';
import { browserHistory } from 'react-router';

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

	handleSubmit() {
		this.props.modelCallbacks.updateModel(this.state);
		browserHistory.push('/generator/models');
	};

	handleClose() {
		$('.modal').modal('hide');
		browserHistory.push('/generator/models');
	};

	render() {
		return(
			<ModelForm draftModel={this.state}
								 modalTitle={"Edit Model"}
								 handleChange={this.handleChange.bind(this)}
								 handleSubmit={this.handleSubmit.bind(this)}
								 handleClose={this.handleClose.bind(this)} />
		);
	}
}

EditModel.propTypes = {
	modelCallbacks: PropTypes.object
};

export default EditModel;