import React from 'react'

class MapBlock extends React.Component {

	render() {

		if(this.props.map){
			return (
				<div className={this.props.selected ? "map-block-selected" : "map-block"} onClick={this.props.selected ? null : this.props.selectMap}>
					<div className="map-block-sub">
						<img style={{verticalAlign:"middle", height:"20px", width:"20px"}} src="../magnesia/assets/images/map.svg"/>
						<span style={{verticalAlign:"middle", marginLeft:"10px"}}>{this.props.map.title}</span>
						<div className={"flex " + (this.props.selected ? "hide" : "")} style={{fontSize:"12px", marginTop:"10px"}}>
							<div className="flex-grow-1">
								<div>
									<span className="purple">{this.props.map.nodes.length}</span> nodes
								</div>
								<div style={{marginTop:"3px"}}>
									<span className="purple">{this.props.map.users ? Object.keys(this.props.map.users).length : 0}</span> users
								</div>
							</div>
							<div className="flex-grow-1">
								<div>
									<span className="purple">{this.props.map.messages ? Object.keys(this.props.map.messages).length : 0}</span> messages
								</div>
								<div style={{marginTop:"3px"}}>
									<span className="purple">{this.props.map.links ? Object.keys(this.props.map.links).length : 0}</span> links
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div onClick={this.props.createMap} className="empty-map-block" style={{textAlign:"center", cursor : "pointer"}}>
					<div style={{marginTop:"20px"}}>
						<span style={{verticalAlign:"middle", fontSize:"25px", marginRight:"10px"}}>+</span>
					</div>
				</div>
			);
		}
		
	}
};

export default MapBlock;