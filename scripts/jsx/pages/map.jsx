import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import Map from '../models/map'
import NavigationPanel from './dumbs/navigationpanel'
import ToolsPanel from './dumbs/toolspanel'
import DRAWING from '../properties/drawing'
import AuthServices from '../services/auth'


class MapPageComp extends React.Component {

	constructor(props) {
	    super(props);
	    this.selectNode = this.selectNode.bind(this);
		this.addNewNode = this.addNewNode.bind(this);
		this.draw = this.draw.bind(this);
		this.drawNodes = this.drawNodes.bind(this);
		this.drawLinks = this.drawLinks.bind(this);
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
						if(!this.state.map) this.setState({map : new Map(snap.val())});
						else {
							var map = this.state.map;
							map.upgradeFromServer(snap.val());
							this.setState({map : map});
						}
					}
				});
			}
		}
	}

	componentWillUnMount(){
		if(this.state.mapRef) mapRef.off();
	}

	selectNode(nid){
		console.log("selectNode", nid);
		this.setState({
			selectedNode : this.state.selectedNode === nid ? null : nid
		});
	}

	addNewNode(x, y){
		var map = this.state.map;
		map.addNewNode(AuthServices.getUid(), x, y, this.state.selectedNode);
		map.save();
	}

	draw(){
		if(this.state.map){
			let svg = d3.select("svg"),
				width = svg.property("width"),
	    		height = svg.property("height");

			if(this.state.map.links)
				this.drawLinks(svg, width, height);

			if(this.state.map.nodes)
				this.drawNodes(svg, width, height);

			svg.selectAll("g.node")
			svg.selectAll("g.link")
		}
	}

	drawNodes(svg, width, height){
		let gs = svg.select("g#nodes").selectAll("g.node").data(this.state.map.nodes, function(d) { return d; });

		//Exit
		gs.exit().remove();

		//Enter
		let elemtEnter = gs.enter().append("g").attr("class", "node");

		elemtEnter.append("circle")
		    .attr("r", function(d, i) {return 40 * (d.scale ? +d.scale : 1);})
		    .attr("stroke", function(d, i){return DRAWING.defaultCircleStrokeColor})
		    .attr("stroke-width", function(d, i){return DRAWING.defaultCircleStrokeWidth})
    		.attr("fill", "white")
    	  .merge(gs.selectAll("circle")) 
    	  	.attr("cy", function(d, i) {return height.animVal.value/2 + (d.y ? +d.y : 0)})
		    .attr("cx", function(d, i) {return width.animVal.value/2 + (d.x ? +d.x : 0)})
		    .attr("stroke", (d, i) => {return d.nid == this.state.selectedNode ? DRAWING.selectedCircleStrokeColor : DRAWING.defaultCircleStrokeColor})
		    .attr("stroke-width", function(d, i){return d.active ? DRAWING.selectedCircleStrokeWidth : DRAWING.defaultCircleStrokeWidth})
    		
    	elemtEnter.append("text")
	        .attr("color", DRAWING.defaultTextColor)
	        .attr("text-anchor", "middle")
	      .merge(gs.selectAll("text")) 
	        .attr("dx", function(d, i){return width.animVal.value/2 + (d.x ? +d.x : 0);})
	        .attr("dy", function(d, i){return height.animVal.value/2 + (d.y ? +d.y : 0) + 5;})
	        .text(function(d, i){return d.title;})

	    //Actions
	    svg.on("click", (d) => {
			if(!d3.event.defaultPrevented){
				this.addNewNode(d3.event.x - width.animVal.value/2 - 105, d3.event.y - height.animVal.value/2 - 60);
			}
		})

	    svg.selectAll("g").on("click", (d) => {
			d3.event.preventDefault();
			if(d && typeof d.nid !== undefined) this.selectNode(d.nid);
		})
	    .call(d3.drag()
	        .on("drag", (d) => {
	        	d.active = true;
	        	var imap = this.state.map;
	        	var r = 40 * (d.scale ? +d.scale : 1);
			  	imap.changeNodeLocation(d.nid, d3.event.x, d3.event.y);
			  	this.setState({
			  		map : imap
			  	});
			})
	        .on("end", (d) => {
	        	if(d.active){
	        		var imap = this.state.map;
		        	d.active = false;
		        	var r = 40 * (d.scale ? +d.scale : 1);
				  	imap.changeNodeLocation(d.nid, d3.event.x, d3.event.y);
				  	imap.save();
	        	}
			})
	    );   
	}

	drawLinks(svg, width, height){
		let gs = svg.select("g#links").selectAll("g.link").data(this.state.map.links, function(d) { return d; });

		//Exit
		gs.exit().remove();

		//Enter
		let elemtEnter = gs.enter().append("g").attr("class", "link");

		elemtEnter.append("line")
		    .attr("stroke", function(d, i){return DRAWING.defaultCircleStrokeColor})
		    .attr("stroke-width", function(d, i){return DRAWING.defaultCircleStrokeWidth})
    	  .merge(gs.selectAll("line")) 
    	  	.attr("x1", (d, i) => {
    	  		var origin = this.state.map.nodes[Object.keys(d.nodes)[0]];
    	  		return width.animVal.value/2 + (origin.x ? +origin.x : 0);
    	  	})
		    .attr("y1", (d, i) => {
		    	var origin = this.state.map.nodes[Object.keys(d.nodes)[0]];
		    	return height.animVal.value/2 + (origin.y ? +origin.y : 0);
		    })
		    .attr("x2", (d, i) => {
		    	var destination = this.state.map.nodes[Object.keys(d.nodes)[1]];
    	  		return width.animVal.value/2 + (destination.x ? +destination.x : 0);
		    })
		    .attr("y2", (d, i) => {
		    	var destination = this.state.map.nodes[Object.keys(d.nodes)[1]];
		    	return height.animVal.value/2 + (destination.y ? +destination.y : 0);
		    })
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
							<NavigationPanel map={this.state.map} selectedNode={this.state.selectedNode} selectNode={this.selectNode}/>
						</div>

						<div id="drawing-wrapper" className="flex-grow-1">
							<svg style={{height: space+'px', width: '100%'}}>
								<g id="links"></g>
								<g id="nodes"></g>
							</svg>
						</div>

						<div className="flex-grow-0">
							<ToolsPanel map={this.state.map} selectedNode={this.state.selectedNode}/>
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