import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import Map from '../models/map'
import NavigationPanel from './dumbs/navigationpanel'
import ToolsPanel from './dumbs/toolspanel'
import DRAWING from '../properties/drawing'


class MapPageComp extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {};
	}

	componentWillMount(){
		if(this.props.routeParams && this.props.routeParams.mid){
			let mid = this.props.routeParams.mid;
			if(mid){
				if(this.state.mapRef) mapRef.off();
				var mapRef = firebase.database().ref('maps/' + mid);
				this.setState({mapRef : mapRef});
				mapRef.on("value", (snap) => {
					if(snap && snap.val()) {
						console.log("N from serv");
						this.setState({map : new Map(snap.val())});
					}
				});
			}
		}
	}

	componentWillUnMount(){
		if(this.state.mapRef) mapRef.off();
	}

	selectNode(nid){
		this.setState({
			selectedNode : this.state.selectedNode === nid ? null : nid
		});
	}

	addNewNode(x, y){
		console.log("add new node", x, y);
	}

	draw(){
		if(this.state.map && this.state.map.nodes){
			console.log("draw");

			let svg = d3.select("svg"),
				width = svg.property("width"),
	    		height = svg.property("height");

			let gs = svg.selectAll("g").data(this.state.map.nodes, function(d) { return d; });

			//Exit
			gs.exit().remove();

			//Enter
			let elemtEnter = gs.enter().append("g");

			elemtEnter.append("circle")
				.attr("cy", function(d, i) {return height.animVal.value/2 + (d.y ? +d.y : 0)})
			    .attr("cx", function(d, i) {return width.animVal.value/2 + (d.x ? +d.x : 0)})
			    .attr("r", function(d, i) {return 40 * (d.scale ? +d.scale : 1);})
			    .attr("stroke", function(d, i){return DRAWING.defaultCircleStrokeColor})
			    .attr("stroke-width", function(d, i){return DRAWING.defaultCircleStrokeWidth})
	    		.attr("fill", "white")
	    		
	    	elemtEnter.append("text")
		        .attr("dx", function(d, i){return width.animVal.value/2 + (d.x ? +d.x : 0);})
		        .attr("dy", function(d, i){return height.animVal.value/2 + (d.y ? +d.y : 0) + 5;})
		        .attr("color", DRAWING.defaultTextColor)
		        .attr("text-anchor", "middle")
		        .text(function(d, i){
		        	return d.title;
		        })

		    //Update
		    gs.selectAll("circle")
				.attr("cy", function(d, i) {return height.animVal.value/2 + (d.y ? +d.y : 0)})
			    .attr("cx", function(d, i) {return width.animVal.value/2 + (d.x ? +d.x : 0)})

			gs.selectAll("circle").transition()
			    .attr("stroke", (d, i) => {return d.active || d.nid == this.state.selectedNode ? DRAWING.selectedCircleStrokeColor : DRAWING.defaultCircleStrokeColor})
			    .attr("stroke-width", function(d, i){return d.active ? DRAWING.selectedCircleStrokeWidth : DRAWING.defaultCircleStrokeWidth})
			    .duration(70)

			gs.selectAll("text")
				.attr("dx", function(d, i){return width.animVal.value/2 + (d.x ? +d.x : 0);})
		        .attr("dy", function(d, i){return height.animVal.value/2 + (d.y ? +d.y : 0) + 5;})

		    //Actions
		    svg.on("click", (d) => {
				if(!d3.event.defaultPrevented){
					this.addNewNode(d3.event.x - width.animVal.value/2, d3.event.y - height.animVal.value/2);
				}
			})

		    svg.selectAll("g").on("click", (d) => {
		    	console.log("click");
				d3.event.preventDefault();
				if(d && typeof d.nid !== undefined) this.selectNode(d.nid);
			})
		    .call(d3.drag()
		        .on("drag", (d) => {
		        	console.log("drag");
		        	d.active = true;
		        	var imap = this.state.map;
		        	var r = 40 * (d.scale ? +d.scale : 1);
				  	imap.changeNodeLocation(d.nid, d3.event.x, d3.event.y);
				  	this.setState({
				  		map : imap
				  	});
				})
		        .on("end", (d) => {
		        	console.log("drag end");
		        	if(d.active){
		        		var imap = this.state.map;
			        	d.active = false;
			        	var r = 40 * (d.scale ? +d.scale : 1);
					  	imap.changeNodeLocation(d.nid, d3.event.x, d3.event.y);
					  	// this.setState({
					  	// 	map : imap
					  	// });
					  	imap.save();
		        	}
				})
		    );   
		}
	}

	componentDidUpdate(){
		this.draw();
	}

	shouldComponentUpdate(){
		return true;
	}

	render() {
		var space = document.body.offsetHeight - document.getElementById("topbar-wrapper").offsetHeight;
		return (
			<div id="maps-page">
				<div>
					<div className="flex" style={{maxHeight : space}}>
						<div className="flex-grow-0">
							<NavigationPanel/>
						</div>

						<div id="drawing-wrapper" className="flex-grow-1">
							<svg style={{height: space+'px', width: '100%'}}>
							</svg>
						</div>

						<div className="flex-grow-0">
							<ToolsPanel/>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		user : state.user
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    replaceUser: (user) => {
      dispatch(replaceUser(user));
    }
  }
}

const MapPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapPageComp)

export default MapPage;