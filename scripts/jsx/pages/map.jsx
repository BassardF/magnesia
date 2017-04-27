import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import Map from '../models/map'
import LeftPanel from './dumbs/leftpanel'
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
		this.selectLink = this.selectLink.bind(this);

		this.changeNodeText = this.changeNodeText.bind(this);
		this.changeNodeDescription = this.changeNodeDescription.bind(this);
		this.changeNodeScale = this.changeNodeScale.bind(this);
		
		this.deleteSelectedNode = this.deleteSelectedNode.bind(this);
		this.deleteLink = this.deleteLink.bind(this);
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

	componentDidMount(){
		document.body.onkeydown = (e) => {
		    if(e.keyCode == 8){
		    	if(!document.activeElement || document.activeElement.tagName !== "INPUT" || document.activeElement.tagName !== "TEXTAREA") this.deleteSelectedNode();
		    }
		};	
	}

	componentWillUnMount(){
		if(this.state.mapRef) mapRef.off();
	}

	deleteSelectedNode(optionalNid){
		if(optionalNid || optionalNid === 0) this.state.map.deleteNode(optionalNid);
		else if(this.state.selectedNode !== null) this.state.map.deleteNode(this.state.selectedNode);
		this.selectNode(null);
	}

	deleteLink(l){
		if(l && this.state.map) this.state.map.deleteLink(l);
	}

	selectNode(nid){
		this.setState({
			selectedNode : this.state.selectedNode === nid ? null : nid
		});
	}

	selectLink(link){
		let id = Object.keys(link.nodes).join("");
		this.setState({
			selectedLink : this.state.selectedLink === id ? null : id
		});
	}

	addNewNode(x, y){
		var map = this.state.map;
		map.addNewNode(AuthServices.getUid(), x, y, this.state.selectedNode);
		map.save();
	}

	changeNodeScale(nid, scale){
		var map = this.state.map;
		var node = map.nodes[nid];
		node.scale = scale || 1;
		node.save();
	}

	changeNodeText(nid, text){
		var map = this.state.map;
		var node = map.nodes[nid];
		node.title = text || "------";
		node.save();
	}

	changeNodeDescription(nid, description){
		var map = this.state.map;
		var node = map.nodes[nid];
		node.description = description || "";
		node.save();
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

			svg.on("dblclick", (d) => {
				if(!d3.event.defaultPrevented){
					this.addNewNode(
						d3.event.x - 200 - width.animVal.value/2, 
						d3.event.y - height.animVal.value/2
					);
				}
			});
		}
	}

	drawNodes(svg, width, height){
		
		let nodes = this.state.map.nodes;
		let gs = svg.select("g#nodes").selectAll("g.node").data(nodes, function(d, ind) {
			return d;
		});

		//Exit
		gs.exit().remove();

		//Enter
		let elemtEnter = gs.enter().append("g").attr("class", "node");

		elemtEnter.append("circle")
		    .attr("stroke", function(d, i){return DRAWING.defaultCircleStrokeColor})
		    .attr("stroke-width", function(d, i){return DRAWING.defaultCircleStrokeWidth})
    		.attr("fill", "white")
    	  .merge(gs.selectAll("circle"))
    	    .attr("r", function(d, i) {return 40 * (nodes[i].scale ? +nodes[i].scale : 1);}) 
    	  	.attr("cy", function(d, i) {return height.animVal.value/2 + (nodes[i].y ? +nodes[i].y : 0)})
		    .attr("cx", function(d, i) {return width.animVal.value/2 + (nodes[i].x ? +nodes[i].x : 0)})
		    .attr("stroke", (d, i) => {return nodes[i].nid == this.state.selectedNode ? DRAWING.selectedCircleStrokeColor : DRAWING.defaultCircleStrokeColor})
		    .attr("stroke-width", (d, i) => {return nodes[i].nid == this.state.selectedNode ? DRAWING.selectedCircleStrokeWidth : DRAWING.defaultCircleStrokeWidth});
    		
    	elemtEnter.append("text")
	        .attr("color", DRAWING.defaultTextColor)
	        .attr("text-anchor", "middle")
	        .attr("class", "noselect")
	      .merge(gs.selectAll("text")) 
	        .attr("dx", function(d, i) {return width.animVal.value/2 + (nodes[i].x ? +nodes[i].x : 0);})
	        .attr("dy", function(d, i) {return height.animVal.value/2 + (nodes[i].y ? +nodes[i].y : 0) + 5;})
	        .text((d, i) => {return nodes[i].title;});

	    //Actions
	    svg.selectAll("g.node text").call(this.makeEditable, "tmp", this);

	    svg.selectAll("g.node").on("click", (d) => {
	    	if(!d3.event.defaultPrevented){
				d3.event.preventDefault();
				if(d && typeof d.nid !== undefined) this.selectNode(d.nid);
			}
		}).on("dblclick", (d) => {
	    	if(!d3.event.defaultPrevented){
				d3.event.preventDefault();
			}
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
		
		let links = this.state.map.links;
		let gs = svg.select("g#links").selectAll("g.link").data(links, function(d) { return d; });

		//Exit
		gs.exit().remove();

		//Enter
		let elemtEnter = gs.enter().append("g").attr("class", "link");

		elemtEnter.append("line")
		    .attr("stroke-width", function(d, i){return DRAWING.defaultCircleStrokeWidth})
    	  .merge(gs.selectAll("line")) 
    	  	.attr("stroke", (d, i) => {
    	  		let id = Object.keys(links[i].nodes).join("");
    	  		let selected = this.state.selectedLink && id == this.state.selectedLink;
    	  		return selected ? DRAWING.selectedCircleStrokeColor : DRAWING.defaultCircleStrokeColor
    	  	})
    	  	.attr("x1", (d, i) => {
    	  		let origin = this.state.map.nodes[Object.keys(links[i].nodes)[0]];
    	  		return width.animVal.value/2 + (origin.x ? +origin.x : 0);
    	  	})
		    .attr("y1", (d, i) => {
		    	let origin = this.state.map.nodes[Object.keys(links[i].nodes)[0]];
		    	return height.animVal.value/2 + (origin.y ? +origin.y : 0);
		    })
		    .attr("x2", (d, i) => {
		    	let destination = this.state.map.nodes[Object.keys(links[i].nodes)[1]];
    	  		return width.animVal.value/2 + (destination.x ? +destination.x : 0);
		    })
		    .attr("y2", (d, i) => {
		    	let destination = this.state.map.nodes[Object.keys(links[i].nodes)[1]];
		    	return height.animVal.value/2 + (destination.y ? +destination.y : 0);
		    })

		    svg.selectAll("g.link").on("click", (d) => {
				d3.event.preventDefault();
				if(d && typeof d.nid !== undefined && d.nodes) this.selectLink(d);
			})
	}

	makeEditable(d, field, thisRef){
	    d.on("mouseover", function() {
	        d3.select(this).style("fill", "#c380ac").style("cursor", "pointer");
	      })
	      .on("mouseout", function() {
	        d3.select(this).style("fill", null);
	      })
	      .on("click", function(d) {

	      	d3.event.preventDefault();

	        var p = this.parentNode;
	        var xy = this.getBBox();
	        var p_xy = p.getBBox();

	        let svg = d3.select("svg"),
				width = svg.property("width"),
	    		height = svg.property("height");

	    	var r = 40 * (d.scale ? +d.scale : 1);
	        xy.x = width.animVal.value/2 + (d.x ? +d.x : 0) - r + 5;
	        xy.y = height.animVal.value/2 + (d.y ? +d.y : 0) - 10;
	        
	        var el = d3.select(this);
	        var p_el = d3.select(p);

	        var frm = p_el.append("foreignObject");

	        var inp = frm
	            .attr("x", xy.x)
	            .attr("y", xy.y)
	            .attr("width", r*2 - 10)
	            .attr("height", 25)
	            .append("xhtml:form")
	                    .append("input")
	                    	.attr("class", "node-text-input")
	                        .attr("value", function() {
	                            // nasty spot to place this call, but here we are sure that the <input> tag is available
	                            // and is handily pointed at by 'this':
	                            this.focus();
	                            return d[field];
	                        })
	                        .attr("style", "width: " + (r*2 - 10) + "px;")
	                        // make the form go away when you jump out (form looses focus) or hit ENTER:
	                        .on("blur", function() {
	                            
	                            var txt = inp.node().value;
	                            d[field] = txt;
	                            el.text(function(d) { return d[field]; });

	                            // Note to self: frm.remove() will remove the entire <g> group! Remember the D3 selection logic!
	                            p_el.select("foreignObject").remove();

	                            thisRef.changeNodeText(d.nid, txt);

	                        })
	                        .on("keypress", function() {
	                            // IE fix
	                            if (!d3.event) d3.event = window.event;

	                            var e = d3.event;
	                            if (e.keyCode == 13){
	                                if (typeof(e.cancelBubble) !== 'undefined') // IE
	                                  e.cancelBubble = true;
	                                if (e.stopPropagation)
	                                  e.stopPropagation();
	                                e.preventDefault();

	                                var txt = inp.node().value;

	                                d[field] = txt;
	                                el.text(function(d) { return d[field]; });

	                                thisRef.changeNodeText(d.nid, txt);
	                                // odd. Should work in Safari, but the debugger crashes on this instead.
	                                // Anyway, it SHOULD be here and it doesn't hurt otherwise.
	                                try {
	                                	p_el.select("foreignObject").remove();
	                                } catch(e) {

	                                }
	                                
	                            }
	                        });
	      });
	}

	componentDidUpdate(){
		this.draw();
	}

	shouldComponentUpdate(){
		return true;
	}

	render() {
		
		return (
			<div id="maps-page" style={{height:"100%"}}>
				
				<div className="flex" style={{height:"100%"}}>
					<div id="left-panel-wrapper" style={{width:"200px", height:"100%"}} className="flex-grow-0">
						<LeftPanel map={this.state.map} 
								   changeNodeText={this.changeNodeText} changeNodeDescription={this.changeNodeDescription}
								   selectedLink={this.state.selectedLink} selectLink={this.selectLink} 
								   selectedNode={this.state.selectedNode} selectNode={this.selectNode}
								   changeNodeScale={this.changeNodeScale}
								   deleteSelectedNode={this.deleteSelectedNode}
								   deleteLink={this.deleteLink}
								   />
					</div>

					<div id="drawing-wrapper" className="flex-grow-1" style={{height:"100%"}}>
						<svg style={{height: '100%', width: '100%'}}>
							<g id="links"></g>
							<g id="nodes"></g>
						</svg>
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