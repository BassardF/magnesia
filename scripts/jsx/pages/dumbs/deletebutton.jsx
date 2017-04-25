import React from 'react'

class DeleteButton extends React.Component {

	render() {

		return (
			<div className="delete-button" onClick={this.props.action || null}>
				<span className="delete-button-words" style={{marginRight:"3px"}}>{this.props.label}</span>
				<span className="delete-button-cross">&#xd7;</span>
			</div>
		);
	}
};

export default DeleteButton;