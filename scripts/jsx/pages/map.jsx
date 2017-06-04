import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import Map from '../models/map'
import LeftPanel from './dumbs/leftpanel'
import Advice from './dumbs/advice'
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
		this.sendMessage = this.sendMessage.bind(this);
		this.resizeSvg = this.resizeSvg.bind(this);
		this.addNewLink = this.addNewLink.bind(this);

		this.changeNodeText = this.changeNodeText.bind(this);
		this.changeNodeDescription = this.changeNodeDescription.bind(this);
		this.changeNodeScale = this.changeNodeScale.bind(this);
		
		this.deleteSelectedNode = this.deleteSelectedNode.bind(this);
		this.deleteLink = this.deleteLink.bind(this);

		this.drawPointers = this.drawPointers.bind(this);

		this.changeMode = this.changeMode.bind(this);
		this.makeSideInView = this.makeSideInView.bind(this);

		this.changeNodeColor = this.changeNodeColor.bind(this);
		this.changeNodeBcgColor = this.changeNodeBcgColor.bind(this);
		this.changeNodeBorderColor = this.changeNodeBorderColor.bind(this);

 	    this.state = {
 	    	mode : 1,
 	    	yShift : 0,
 	    	xShift : 0
 	    };
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
						if(!this.state.map) {
							var map = new Map(snap.val());
							this.setState({map : map});
							document.title = map.title;
						} else {
							var map = this.state.map;
							map.upgradeFromServer(snap.val());
							document.title = map.title;
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
		    	if(!document.activeElement || (document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA")) 
		    		this.deleteSelectedNode();
		    }
		};	
	}

	componentWillUnMount(){
		if(this.state.mapRef) mapRef.off();
	}

	changeMode(mode){
		this.setState({
			mode : mode
		});
	}

	resizeSvg(){
		setTimeout(() => { 
			this.draw();
		}, 0);
	}

	deleteSelectedNode(optionalNid){
		if(optionalNid !== undefined || (this.state.selectedNode !== undefined && this.state.selectedNode !== null)){
			swal({
			  title: "Are you sure?",
			  text: "Do you want to delete this node?",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Yes!",
			  closeOnConfirm: true,
			  closeOnCancel: true
			}, function(){
				if(optionalNid || optionalNid === 0) this.state.map.deleteNode(optionalNid);
				else if(this.state.selectedNode !== null) this.state.map.deleteNode(this.state.selectedNode);
				this.selectNode(null);
			}.bind(this));
		}
	}

	deleteLink(l){
		if(l && this.state.map) this.state.map.deleteLink(l);
	}

	selectNode(nid, cb){
		this.setState({
			selectedNode : this.state.selectedNode === nid ? null : nid
		}, ()=>{
			if(cb) cb();
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

	addNewLink(nid1, nid2){
		if(this.state.map) {
			var map = this.state.map;
			map.addNewLink(AuthServices.getUid(), nid1, nid2);
			map.save();
		}
	}

	sendMessage(msg){
		var uid = AuthServices.getUid();
		var name = this.props.user ? this.props.user.name : "John Doe";
		this.state.map.sendMessage(msg, uid, name);
	}

	changeNodeColor(color){
		var map = this.state.map;
		var node = map.nodes[this.state.selectedNode];
		node.color = color;
		node.save();
	}

	changeNodeBcgColor(color){
		var map = this.state.map;
		var node = map.nodes[this.state.selectedNode];
		node.bcg_color = color;
		node.save();
	}

	changeNodeBorderColor(color){
		var map = this.state.map;
		var node = map.nodes[this.state.selectedNode];
		node.border_color = color;
		node.save();
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

			if(this.state.map.nodes){
				this.drawNodes(svg, width, height);
				this.drawPointers(svg, width, height);
			}

			svg.on("dblclick", (d) => {
				if(!d3.event.defaultPrevented){
					if(this.state.mode === 1){
						this.addNewNode(
							d3.event.x - (document.getElementById("left-panel").offsetWidth) - width.animVal.value/2 - this.state.xShift, 
							d3.event.y - height.animVal.value/2 - this.state.yShift
						);
					}
				}
			})
			.call(d3.drag()
				.on("drag", (d) => {
		        	this.setState({
		        		xShift : this.state.xShift + d3.event.dx,
		        		yShift : this.state.yShift + d3.event.dy
		        	});
				})
		    );
		}
	}

	makeSideInView(side){
		let svg = d3.select("svg"),
			width = svg.property("width"),
    		height = svg.property("height");
    	let nodes = this.state.map.nodes;
    	let extreme = 0;
    	
    	if(side && side == "top"){
    		for (var i = 0; i < nodes.length; i++) {
    			if(-nodes[i].y > height.animVal.value/2 && -nodes[i].y - height.animVal.value/3 > extreme) extreme = -nodes[i].y - height.animVal.value/3;
    		}
    		this.setState({yShift : extreme});
    	} else if(side && side == "bottom"){
    		for (var i = 0; i < nodes.length; i++) {
    			if(nodes[i].y > height.animVal.value/2 && nodes[i].y - height.animVal.value/3 > extreme) extreme = nodes[i].y - height.animVal.value/3;
    		}
    		this.setState({yShift : -extreme});
		} else if(side && side == "left"){
			for (var i = 0; i < nodes.length; i++) {
    			if(-nodes[i].x > width.animVal.value/2 && -nodes[i].x - width.animVal.value/3 > extreme) extreme = -nodes[i].x - width.animVal.value/3;
    		}
    		this.setState({xShift : extreme});
		} else if(side && side == "right"){
			for (var i = 0; i < nodes.length; i++) {
    			if(nodes[i].x > width.animVal.value/2 && nodes[i].x - width.animVal.value/3 > extreme) extreme = nodes[i].x - width.animVal.value/3;
    		}
    		this.setState({xShift : -extreme});
		}
	}

	drawPointers(svg, width, height){
		let nodes = this.state.map.nodes;
		let oob = {left:0, top:0, right:0, bottom:0};
		if(nodes && nodes.length){
			for (let i = 0; i < nodes.length; i++) {
				let node = nodes[i];
				if(node.x > width.animVal.value/2 - this.state.xShift) oob.right++;
				if(-node.x > width.animVal.value/2 + this.state.xShift) oob.left++;
				if(node.y > height.animVal.value/2 - this.state.yShift) oob.bottom++;
				if(-node.y > height.animVal.value/2 + this.state.yShift) oob.top++;
			}
		}
		let pointers = [], counters = [];
		for(let side in oob){
			let d = {}, t = {};
			if(oob[side]){
				if(side === "left"){
					d.x = 10, d.y = height.animVal.value/2 - 10;
					t.x = 18, t.y = height.animVal.value/2;
					d.transform = 180;
				}
				if(side === "right"){
					d.x = width.animVal.value - 10, d.y = height.animVal.value/2;
					t.x = width.animVal.value - 18, t.y = height.animVal.value/2;
					d.transform = 0;
				}
				if(side === "top"){
					d.x = width.animVal.value/2 + 5, d.y = 10;
					t.x = width.animVal.value/2, t.y = 25;
					d.transform = -90;
				}
				if(side === "bottom"){
					d.x = width.animVal.value/2 - 5, d.y = height.animVal.value - 10;
					t.x = width.animVal.value/2, t.y = height.animVal.value - 15;
					d.transform = 90;
				}
				d.side = side;
				d.text = "&#10095;";
				pointers.push(d);
	
				t.side = side;
				t.text = oob[side];
				counters.push(t);
			}
		}
		
		//pointers
		let gs = svg.select("g#pointers").selectAll("g.pointers").data(pointers, function(d, ind) {
			return d;
		});

		//Exit
		gs.exit().remove();

		//Enter
		let elemtEnter = gs.enter().append("g").attr("class", "pointers");

		elemtEnter.append("text")
	        .attr("fill", "#CE93D8")
	        .attr("text-anchor", "middle")
	        .attr("class", "noselect")
	        .attr("cursor", "pointer")
	      .merge(gs.selectAll("text")) 
	        .attr("dx", function(d, i) {return 0})
	        .attr("dy", function(d, i) {return 0})
	        .html((d, i) => {return pointers[i].text;})
	        .attr("transform", function(d, i) {
				return "translate("+pointers[i].x+","+pointers[i].y+") rotate("+pointers[i].transform+")";
			});

	    //counters
		let gs2 = svg.select("g#counters").selectAll("g.counters").data(counters, function(d, ind) {
			return d;
		});

		//Exit
		gs2.exit().remove();

		//Enter
		let elemtEnter2 = gs2.enter().append("g").attr("class", "counters");

		elemtEnter2.append("text")
	        .attr("fill", "#CE93D8")
	        .attr("text-anchor", "middle")
	        .attr("class", "noselect")
	        .attr("cursor", "pointer")
	      .merge(gs2.selectAll("text")) 
	        .attr("dx", function(d, i) {return counters[i].x})
	        .attr("dy", function(d, i) {return counters[i].y})
	        .text((d, i) => {return counters[i].text;});

	    svg.selectAll("g.pointers").on("click", (d) => {
	    	if(!d3.event.defaultPrevented){
				d3.event.preventDefault();
				if(d && typeof d.nid !== undefined) {
					this.makeSideInView(d.side);
				}
			}
		});
		svg.selectAll("g.counters").on("click", (d) => {
	    	if(!d3.event.defaultPrevented){
				d3.event.preventDefault();
				if(d && typeof d.nid !== undefined) {
					this.makeSideInView(d.side);
				}
			}
		});
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

		elemtEnter.append("ellipse")
    		.style("cursor", "pointer")
    	 .merge(gs.selectAll("ellipse"))
    	 	.attr("fill", (d, i)=> {return nodes[i].bcg_color || "white"})
    	 	.attr("ry", function(d, i) {return 40 * (nodes[i].scale ? +nodes[i].scale : 1);})
    	    .attr("rx", function(d, i) {
    	    	let naturalWidth = 40 * (nodes[i].scale ? +nodes[i].scale : 1);
    	    	let textWidth = nodes[i].title ? (nodes[i].title.length * 7 / 2) + 10 : 0;
    	    	return naturalWidth > textWidth ? naturalWidth : textWidth;
    	    })
    	  	.attr("cy", (d, i) => {return this.state.yShift + height.animVal.value/2 + (nodes[i].y ? +nodes[i].y : 0)})
		    .attr("cx", (d, i) => {return this.state.xShift + width.animVal.value/2 + (nodes[i].x ? +nodes[i].x : 0)})
		    .attr("stroke", (d, i) => {return nodes[i].nid == this.state.selectedNode ? DRAWING.selectedCircleStrokeColor : (nodes[i].border_color || DRAWING.defaultCircleStrokeColor)})
		    .attr("stroke-width", (d, i) => {return nodes[i].nid == this.state.selectedNode ? DRAWING.selectedCircleStrokeWidth : DRAWING.defaultCircleStrokeWidth});
    		
    	elemtEnter.append("text")
	        .attr("text-anchor", "middle")
	        .attr("class", "noselect")
	      .merge(gs.selectAll("text")) 
	      	.attr("fill", (d, i) => {return nodes[i].color || DRAWING.defaultTextColor})
	        .attr("dx", (d, i) => {return this.state.xShift + width.animVal.value/2 + (nodes[i].x ? +nodes[i].x : 0);})
	        .attr("dy", (d, i) => {return this.state.yShift + height.animVal.value/2 + (nodes[i].y ? +nodes[i].y : 0) + 5;})
	        .text((d, i) => {return nodes[i].title;});

	    //Actions
	    svg.selectAll("g.node text").call(this.makeEditable, "tmp", this);

	    svg.selectAll("g.node").on("click", (d) => {
	    	if(!d3.event.defaultPrevented){
				d3.event.preventDefault();
				if(d && typeof d.nid !== undefined) {
					if(this.state.mode === 2 && (this.state.selectedNode || this.state.selectedNode === 0) && d.nid != this.state.selectedNode){
						this.addNewLink(d.nid, this.state.selectedNode);
					} else {
						this.selectNode(d.nid);
					}
				}
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
    	  		return width.animVal.value/2 + this.state.xShift + (origin.x ? +origin.x : 0);
    	  	})
		    .attr("y1", (d, i) => {
		    	let origin = this.state.map.nodes[Object.keys(links[i].nodes)[0]];
		    	return height.animVal.value/2 + this.state.yShift + (origin.y ? +origin.y : 0);
		    })
		    .attr("x2", (d, i) => {
		    	let destination = this.state.map.nodes[Object.keys(links[i].nodes)[1]];
    	  		return width.animVal.value/2 + this.state.xShift +  (destination.x ? +destination.x : 0);
		    })
		    .attr("y2", (d, i) => {
		    	let destination = this.state.map.nodes[Object.keys(links[i].nodes)[1]];
		    	return height.animVal.value/2 + this.state.yShift + (destination.y ? +destination.y : 0);
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

	    	let textWidth = d.title ? (d.title.length * 7 / 2) + 10 : 0;
	    	let naturalWidth = 40 * (d.scale ? +d.scale : 1);
	    	let r = textWidth > naturalWidth ? textWidth : naturalWidth;
	        xy.x = width.animVal.value/2 + (d.x ? +d.x : 0) - r + 5 + thisRef.state.xShift;
	        xy.y = height.animVal.value/2 + (d.y ? +d.y : 0) - 10 + thisRef.state.yShift;
	        
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
	                                } catch(e) {}
	                                
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
				<Advice user={this.props.user} map={this.state.map}  selectedNode={this.state.selectedNode}/>
				<div className="flex" style={{height:"100%"}}>
				<LeftPanel map={this.state.map} 
						   user={this.props.user}
						   mode={this.state.mode}
						   changeNodeColor={this.changeNodeColor}
						   changeNodeBcgColor={this.changeNodeBcgColor}
						   changeNodeBorderColor={this.changeNodeBorderColor}
						   changeMode={this.changeMode}
						   changeNodeText={this.changeNodeText} changeNodeDescription={this.changeNodeDescription}
						   selectedLink={this.state.selectedLink} selectLink={this.selectLink} 
						   selectedNode={this.state.selectedNode} selectNode={this.selectNode}
						   changeNodeScale={this.changeNodeScale}
						   resizeSvg={this.resizeSvg}
						   deleteSelectedNode={this.deleteSelectedNode}
						   deleteLink={this.deleteLink}
						   sendMessage={this.sendMessage} />

					<div id="drawing-wrapper" className="flex-grow-1" style={{height:"100%"}}>
						<svg ref="svg" style={{height: '100%', width: '100%'}}>
							<g id="links"></g>
							<g id="nodes"></g>
							<g id="pointers"></g>
							<g id="counters"></g>
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