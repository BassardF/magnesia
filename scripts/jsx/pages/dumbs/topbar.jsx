import React from 'react'

class TopBar extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {};
	}

	componentWillMount(){
	}

	componentWillUnMount(){
	}

	render() {
		return (
			<div id="topbar-wrapper">
				<div id="topbar-body" className="flex">
					<div className="brand flex-grow-0">Magnesia.</div>
					<div className="links flex-grow-1">
						<span className="flex-grow-0">Maps</span>
						<span className="flex-grow-0">logout</span>
					</div>
				</div>
			</div>
		);
	}
};

export default TopBar;