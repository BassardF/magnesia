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
					if(snap && snap.val()) this.setState({map : new Map(snap.val())});
				});
			}
		}
	}

	componentWillUnMount(){
		if(this.state.mapRef) mapRef.off();
	}

	draw(map){
		if(this.state.map && this.state.map.nodes){

			let svg = d3.select("svg"),
				width = svg.property("width"),
	    		height = svg.property("height");
			
			let gs = svg.selectAll("g")
			    .data([map ? map.nodes : this.state.map.nodes], function(d) { return d; });

			//Exit
			gs.exit().remove();

			//Enter
			let elemtEnter = gs.enter().append("g");

			elemtEnter
			    .call(d3.drag()
			        .on("start", (d)=>{
					  	d3.event.subject.active = true;
					})
			        .on("drag", (d) =>{
			        	var map = this.state.map;
			        	var r = 40 * (d[0].scale ? +d[0].scale : 1);
					  	map.changeNodeLocation(d[0].nid, d3.event.x - width.animVal.value/2, d3.event.y - width.animVal.value/2 + r);
					  	this.draw(map);
					})
			        .on("end", (d)=>{
			        	var map = this.state.map;
			        	var r = 40 * (d[0].scale ? +d[0].scale : 1);
					  	map.changeNodeLocation(d[0].nid, d3.event.x - width.animVal.value/2, d3.event.y - width.animVal.value/2 + r);
					  	this.setState({map : map});
					})
			    );

			elemtEnter.append("circle")
				.attr("cy", function(d, i) {return height.animVal.value/2 + (d[i].y ? +d[i].y : 0)})
			    .attr("cx", function(d, i) {return width.animVal.value/2 + (d[i].x ? +d[i].x : 0)})
			    .attr("r", function(d, i) {return 40 * (d[i].scale ? +d[i].scale : 1);})
			    .attr("stroke", DRAWING.defaultCircleStrokeColor)
			    .attr("stroke-width", DRAWING.defaultCircleStrokeWidth)
	    		.attr("fill", "white")
	    		
	    	elemtEnter.append("text")
		        .attr("dx", function(d, i){return width.animVal.value/2 + (d[i].x ? +d[i].x : 0);})
		        .attr("dy", function(d, i){return height.animVal.value/2 + (d[i].y ? +d[i].y : 0) + 5;})
		        .attr("color", DRAWING.defaultTextColor)
		        .attr("text-anchor", "middle")
		        .text(function(d, i){
		        	return d[i].title;
		        })

		    //Update
			gs.selectAll("circle")
				.attr("cy", function(d, i) {return height.animVal.value/2 + (d[i].y ? +d[i].y : 0)})
			    .attr("cx", function(d, i) {return width.animVal.value/2 + (d[i].x ? +d[i].x : 0)})

			gs.selectAll("text")
				.attr("dx", function(d, i){return width.animVal.value/2 + (d[i].x ? +d[i].x : 0);})
		        .attr("dy", function(d, i){return height.animVal.value/2 + (d[i].y ? +d[i].y : 0) + 5;})
		}
	}

	componentDidUpdate(){
		this.draw();
	}

	shouldComponentUpdate(){
		console.log("shouldComponentUpdate");
		return true;
	}

	render() {
		var space = document.body.offsetHeight - document.getElementById("topbar-wrapper").offsetHeight;
		console.log("state", this.state);
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