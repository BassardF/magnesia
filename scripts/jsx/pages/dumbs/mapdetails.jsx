import React from 'react'

class MapDetails extends React.Component {

	render() {
		let map = this.props.map;
		var counts = {
			nodes : this.props.map.nodes.length,
			users : this.props.map.users ? Object.keys(this.props.map.users).length : 0,
			messages : this.props.map.messages ? Object.keys(this.props.map.messages).length : 0,
			links : this.props.map.links ? Object.keys(this.props.map.links).length : 0	
		};
		var max = Math.max(counts.nodes, counts.users, counts.messages, counts.links, 5);

		return (
			<div className="map-details">
				<div id="map-details-title" onClick={this.props.promptChangeTitle}>
					<div>
						<span id="map-details-title-content">{this.props.map.title}</span>
					</div>
					<div style={{marginTop:"7px"}}>
						<span id="map-details-title-sub">
							<img style={{verticalAlign:"middle", width:"10px", marginRight : "5px"}} src="../assets/images/edit.svg"/>
							<span style={{verticalAlign:"middle"}}>edit</span>
						</span>
					</div>
				</div>

				<div style={{fontSize:"14px", height:"20px"}}>
					<div onClick={this.props.leaveMap} className="purple-unerlined-hover" style={{marginRight:"10px", cursor:"pointer", float:"right", display:"inline-block"}}>
						<img style={{verticalAlign:"middle", width:"10px", marginRight : "5px"}} src="../assets/images/exit.svg"/>
						<span style={{verticalAlign:"middle"}}>leave map</span>
					</div>
					<div style={{float:"right", display:"inline-block", marginLeft: "10px", marginRight: "10px"}}> | </div>
					<div onClick={this.props.toggleManageUsers} className="purple-unerlined-hover" style={{cursor:"pointer", float:"right", display:"inline-block"}}>
						<img style={{verticalAlign:"middle", width:"10px", marginRight : "5px"}} src="../assets/images/invite.svg"/>
						<span style={{verticalAlign:"middle"}}>manage users</span>
					</div>
					<div style={{float:"right", display:"inline-block", marginLeft: "10px", marginRight: "10px"}}> | </div>
					<div onClick={this.props.goToMap} className="purple-unerlined-hover" style={{cursor:"pointer", float:"right", display:"inline-block"}}>
						<img style={{verticalAlign:"middle", width:"10px", marginRight : "5px"}} src="../assets/images/map.svg"/>
						<span style={{verticalAlign:"middle"}}>get in</span>
					</div>
				</div>

				<div style={{paddingLeft:"40px", paddingRight:"40px"}}>
					
					<div className="flex" style={{marginTop:"30px"}}>
						<div className="flex-grow-0">
							<div style={{width:"100px"}}>
								<div style={{marginTop:"10px"}}>users</div>
								<div style={{float:"right", marginTop:"-17px", marginRight: "5px"}}>{counts.users}</div>
							</div>
						</div>
						<div className="flex-grow-1">
							<div>
								<div style={{width: (counts.users*100/max) + "%"}} className="maps-progress-bar blue0-bcg"></div>
							</div>
						</div>
					</div>

					<div className="flex" style={{marginTop:"30px"}}>
						<div className="flex-grow-0">
							<div style={{width:"100px"}}>
								<div style={{marginTop:"10px"}}>nodes</div>
								<div style={{float:"right", marginTop:"-17px", marginRight: "5px"}}>{counts.nodes}</div>
							</div>
						</div>
						<div className="flex-grow-1">
							<div>
								<div style={{width: (counts.nodes*100/max) + "%"}} className="maps-progress-bar blue1-bcg"></div>
							</div>
						</div>
					</div>

					<div className="flex" style={{marginTop:"30px"}}>
						<div className="flex-grow-0">
							<div style={{width:"100px"}}>
								<div style={{marginTop:"10px"}}>links</div>
								<div style={{float:"right", marginTop:"-17px", marginRight: "5px"}}>{counts.links}</div>
							</div>
						</div>
						<div className="flex-grow-1">
							<div>
								<div style={{width: (counts.links*100/max) + "%"}} className="maps-progress-bar blue2-bcg"></div>
							</div>
						</div>
					</div>	

					<div className="flex" style={{marginTop:"30px"}}>
						<div className="flex-grow-0">
							<div style={{width:"100px"}}>
								<div style={{marginTop:"10px"}}>messages</div>
								<div style={{float:"right", marginTop:"-17px", marginRight: "5px"}}>{counts.messages}</div>
							</div>
						</div>
						<div className="flex-grow-1">
							<div>
								<div style={{width: (counts.messages*100/max) + "%"}} className="maps-progress-bar blue3-bcg"></div>
							</div>
						</div>
					</div>

				</div>
			</div>
		);
	}
};

export default MapDetails;