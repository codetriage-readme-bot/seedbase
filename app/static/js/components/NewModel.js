import React, { Component, PropTypes } from 'react';
import ModelForm from './ModelForm';
import { browserHistory } from 'react-router';

class NewModel extends Component {
	componentWillMount() {
		this.setState({
			id: Date.now(),
			name: "",
			fields: []
		});
	};

	handleChange(field, value) {
		this.setState({ [field]: value });
	};

	handleSubmit() {
		this.props.modelCallbacks.addModel(this.state);
		browserHistory.push('/generator/models');
	};

	handleClose() {
		$('.modal').modal('hide');
		browserHistory.push('/generator/models');
	};

	render() {
		return(
			<ModelForm draftModel={this.state}
								 modalTitle={"New Model"}
								 handleChange={this.handleChange.bind(this)}
								 handleSubmit={this.handleSubmit.bind(this)}
								 handleClose={this.handleClose.bind(this)} />
		);
	}
}

NewModel.propTypes = {
	modelCallbacks: PropTypes.object
};

export default NewModel;