import React from 'react'

class FullButton extends React.Component {

	render() {

		return (
			<div className="full-button" onClick={this.props.action || null}>
				<span className="full-button-words" style={{marginRight:"3px"}}>{this.props.label}</span>
			</div>
		);
	}
};

export default FullButton;