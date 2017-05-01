import React from 'react'

class InviteLine extends React.Component {

	render() {

		return (
			<div className="invite-line" onClick={null}>
				<div>{this.props.invite.title}</div>
				<div style={{marginTop: "5px"}}>
					<div className="invite-line-buttons" onClick={this.props.validate}>
						<span style={{marginRight: "3px"}} className="inline-block">&#x2713;</span>
						<span className="inline-block" style={{marginRight:"3px"}}>accept</span>
						
					</div>
					<div className="invite-line-buttons" onClick={this.props.cancel}>
						<span style={{marginRight: "3px"}} className="inline-block">&#xd7;</span>
						<span className="inline-block" style={{marginRight:"3px"}}>cancel</span>
					</div>
				</div>
			</div>
		);
	}
};

export default InviteLine;