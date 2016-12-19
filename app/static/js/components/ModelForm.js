import React, { Component, PropTypes } from 'react';

class ModelForm extends Component {
	componentDidMount() {
		$('.modal').modal('show');
	};

	handleChange(field, event) {
		this.props.handleChange(field, event.target.value);
	};

	handleClose(event) {
		event.preventDefault();
		this.props.handleClose();
	};

	render() {
		return(
			<div>
				<div className="modal fade" data-backdrop="static" tabIndex="-1">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close"><span>&times;</span></button>
								<h4 className="modal-title">{this.props.modalTitle}</h4>
							</div>
							<div className="modal-body">
								<p>One fine body&hellip;</p>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" onClick={this.handleClose.bind(this)}>Close</button>
								<button type="button" className="btn btn-primary">Save changes</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ModelForm;