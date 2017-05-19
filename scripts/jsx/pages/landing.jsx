import React from 'react'

import DRAWING from '../properties/demodrawing'
import DEMONODES from '../properties/demonodes'

class LandingPage extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	
	    };
	}

	render() {
		return (
			<div id="landing-page" style={{maxWidth:"1440px", marginLeft:"auto", marginRight:"auto"}}>
				<TopSection/>

				<h1>ideas</h1>
				
				<h3>Why / How / What / Ex</h3>
				<div>W : Ideas worth blooming - Growing brilliant ideas - Nurture your best ideas</div>
				<div>H : Visual representation | Structuration | Sharing @team</div>
				<div>Wh : Magnesia</div>

				<h3>tools ID</h3>
				<div>node/user count</div>

				<div></div>
			</div>
		);
	}
};

class TopSection extends React.Component {

	constructor(props) {
	    super(props);
	   	this.draw = this.draw.bind(this);
		this.drawNodes = this.drawNodes.bind(this);
		this.drawLinks = this.drawLinks.bind(this);
	    this.state = {
	    };
	}

	componentDidMount(){
		console.log("componentDidMount", DEMONODES);
		this.draw();
	}

	draw(){
		let svg = d3.select("#headersvg"),
			width = svg.property("width"),
    		height = svg.property("height");

    	var wd = document.body.offsetWidth;
    	this.drawNodes(svg, wd, 300);
		this.drawLinks(svg, wd, 300);
	}

	drawNodes(svg, width, height){
		
		let nodes = DEMONODES.nodes;
		
		let gs = svg.select("g#nodes").selectAll("g.node").data(nodes, function(d, ind) {
			return d;
		});

		//Enter
		let elemtEnter = gs.enter().append("g").attr("class", "node");

		elemtEnter.append("circle")
		    .attr("stroke", function(d, i){return DRAWING.defaultCircleStrokeColor})
		    .attr("stroke-width", function(d, i){return DRAWING.defaultCircleStrokeWidth})
    		.attr("fill", "#9C27B0")
    		.style("cursor", "pointer")
    	 .merge(gs.selectAll("circle"))
    	    .attr("r", function(d, i) {return 40 * (nodes[i].scale ? +nodes[i].scale : 1);}) 
    	  	.attr("cy", function(d, i) {return height/2 + (nodes[i].y ? +nodes[i].y : 0)})
		    .attr("cx", function(d, i) {return width/2 + (nodes[i].x ? +nodes[i].x : 0)})
		    .attr("stroke", (d, i) => {return nodes[i].nid == this.state.selectedNode ? DRAWING.selectedCircleStrokeColor : DRAWING.defaultCircleStrokeColor})
		    .attr("stroke-width", (d, i) => {return nodes[i].nid == this.state.selectedNode ? DRAWING.selectedCircleStrokeWidth : DRAWING.defaultCircleStrokeWidth});
    		
    	elemtEnter.append("text")
	        .attr("fill", DRAWING.defaultTextColor)
	        .attr("text-anchor", "middle")
	        .attr("class", "noselect")
	      .merge(gs.selectAll("text")) 
	        .attr("dx", function(d, i) {return width/2 + (nodes[i].x ? +nodes[i].x : 0);})
	        .attr("dy", function(d, i) {return height/2 + (nodes[i].y ? +nodes[i].y : 0) + 5;})
	        .text((d, i) => {return nodes[i].title;});

	}

	drawLinks(svg, width, height){
		
		let links = DEMONODES.links;
		let gs = svg.select("g#links").selectAll("g.link").data(links, function(d) { return d; });

		//Enter
		let elemtEnter = gs.enter().append("g").attr("class", "link");

		elemtEnter.append("line")
		    .attr("stroke-width", function(d, i){return DRAWING.defaultCircleStrokeWidth})
    	  .merge(gs.selectAll("line")) 
    	  	.attr("stroke", (d, i) => {
    	  		let id = Object.keys(links[i].nodes).join("");
    	  		return DRAWING.defaultCircleStrokeColor
    	  	})
    	  	.attr("x1", (d, i) => {
    	  		let origin = DEMONODES.nodes[Object.keys(links[i].nodes)[0]];
    	  		return width/2 + (origin.x ? +origin.x : 0);
    	  	})
		    .attr("y1", (d, i) => {
		    	let origin = DEMONODES.nodes[Object.keys(links[i].nodes)[0]];
		    	return height/2 + (origin.y ? +origin.y : 0);
		    })
		    .attr("x2", (d, i) => {
		    	let destination = DEMONODES.nodes[Object.keys(links[i].nodes)[1]];
    	  		return width/2 + (destination.x ? +destination.x : 0);
		    })
		    .attr("y2", (d, i) => {
		    	let destination = DEMONODES.nodes[Object.keys(links[i].nodes)[1]];
		    	return height/2 + (destination.y ? +destination.y : 0);
		    })
	}

	render() {
		return (
			<div>
				<div id="landing-page-top-section" className="section purple-bcg">
					<div id="lp-header-section">Mg.</div>
					<div id="lp-header-name">Magnesia</div>
					<div id="lp-header-sub-name">Nurture your brilliant ideas</div>
				</div>
				<svg id="headersvg" style={{width:"100%", height:"300px", marginTop:"-300px"}}>
					<g id="links"></g>
					<g id="nodes"></g>
				</svg>
			</div>
		);
	}
};

export default LandingPage;