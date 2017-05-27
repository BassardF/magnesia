import React from 'react'

class MapBlock extends React.Component {

	componentDidMount(){
		new Tippy('.tippymapblock', {
		    position: 'right',
		    animation: 'shift',
		    duration: 200,
		    arrow: true
		})
	}

	render() {

		if(this.props.map){
			return (
				<div className={this.props.selected ? "map-block-selected" : "map-block"} onClick={this.props.selected ? null : this.props.selectMap}>
					<div className="map-block-sub">

						<div onClick={this.props.goToMap} title="get in" className="purple-go-button tippymapblock">
							<img src="../assets/images/arrow-right-white.svg" style={{marginTop: "-34px", verticalAlign: "middle", width: "15px", marginRight: "5px"}}/>
						</div>

						<img style={{verticalAlign:"middle", height:"20px", width:"20px"}} src="../assets/images/map.svg"/>
						<span style={{fontSize:"15px", verticalAlign:"middle", marginLeft:"10px"}}>{this.props.map.title}</span>
						<div className={"flex " + (this.props.selected ? "hide" : "")} style={{fontSize:"11px", marginTop:"10px"}}>
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
					<div style={{marginTop:"10px"}}>
						<div style={{fontSize:"14px", marginRight:"10px"}}>Create a new Map</div>
						<div style={{fontSize:"25px", marginRight:"10px"}}>
							<img className="first-map-small-img" src="../assets/images/newmap.svg" style={{display:"block", marginLeft:"auto", marginRight:"auto"}}/>
						</div>
					</div>
				</div>
			);
		}
		
	}
};

export default MapBlock;