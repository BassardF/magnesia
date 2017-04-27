import React from 'react'
import DeleteButton from './deletebutton'

class LeftPanel extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	nav : 0
	    };
	}

	componentWillMount(){
	}

	componentWillUnMount(){
	}

	selectNav(nav){
		this.setState({
			nav : nav
		});
	}

	render() {
		
		var dom = null, title = "";
		var nodeSelected = !(this.props.selectedNode === undefined || this.props.selectedNode === null);
		if(!nodeSelected && this.state.nav == 1) this.state.nav = 0;
		switch(this.state.nav) {
		    case 0:
		        dom = <NodeTree map={this.props.map} 
		        				selectedNode={this.props.selectedNode} selectNode={this.props.selectNode} 
		        				selectedLink={this.props.selectedLink} selectLink={this.props.selectLink}
		        				deleteSelectedNode={this.props.deleteSelectedNode} 
		        				deleteLink={this.props.deleteLink}/>;
		        title = "Navigation Tree";
		        break;
		    case 1:
		    	dom = <NodeDetails map={this.props.map} 
		    				   changeNodeText={this.props.changeNodeText} changeNodeDescription={this.props.changeNodeDescription}
		        			   selectedNode={this.props.selectedNode} selectNode={this.props.selectNode} 
		        			   changeNodeScale={this.props.changeNodeScale}/>;
		        title = "Node Details";
		        break;
		    case 2:
		        title = "Messages";
		        break;
		    case 3:
		        title = "Logs";
		        break;
		}

		return (
			<div id="left-panel">
				<div id="logo">Mg.</div>
				<div className="">

					<div className="flex">
						<div onClick={this.selectNav.bind(this, 0)} className={this.state.nav == 0 ? "left-panel-nav-selected" : "left-panel-nav"}>
							<img style={{marginTop:"10px", display : "block", marginLeft:"auto", marginRight:"auto"}} src={"../magnesia/assets/images/"+ (this.state.nav == 0 ? "placeholder.svg" : "placeholder-white.svg")}/>
						</div>
						<div onClick={nodeSelected ? this.selectNav.bind(this, 1) : null} className={this.state.nav == 1 ? "left-panel-nav-selected" : "left-panel-nav"}>
							<img style={{marginTop:"10px", display : "block", marginLeft:"auto", marginRight:"auto", opacity : (nodeSelected ? "1" : ".5")}} src={"../magnesia/assets/images/"+ (this.state.nav == 1 ? "placeholder.svg" : "placeholder-white.svg")}/>
						</div>
						<div onClick={this.selectNav.bind(this, 2)} className={this.state.nav == 2 ? "left-panel-nav-selected" : "left-panel-nav"}>
							<img style={{marginTop:"10px", display : "block", marginLeft:"auto", marginRight:"auto"}} src={"../magnesia/assets/images/"+ (this.state.nav == 2 ? "placeholder.svg" : "placeholder-white.svg")}/>
						</div>
						<div onClick={this.selectNav.bind(this, 3)} className={this.state.nav == 3 ? "left-panel-nav-selected" : "left-panel-nav"}>
							<img style={{marginTop:"10px", display : "block", marginLeft:"auto", marginRight:"auto"}} src={"../magnesia/assets/images/"+ (this.state.nav == 3 ? "placeholder.svg" : "placeholder-white.svg")}/>
						</div>
					</div>

				</div>
				<div className="left-panel-title">{title}</div>
				<div style={{padding:"10px"}}>{dom}</div>
			</div>
		);
	}
};

export default LeftPanel;

class NodeTree extends React.Component {

	render() {
		var domNodes = [];
		if(this.props.map && this.props.map.nodes){
			domNodes = this.props.map.nodes.map((n, ind) => {
				return n && (n.nid || n.nid == 0) ?
					<NodeLine key={"key-lp-node-line-" + n.nid} nodes={this.props.map.nodes} 
							  links={this.props.map.links} selectedLink={this.props.selectedLink} selectLink={this.props.selectLink} 
							  node={n} selectedNode={this.props.selectedNode} selectNode={this.props.selectNode}
							  deleteSelectedNode={this.props.deleteSelectedNode}
							  deleteLink={this.props.deleteLink}/>
					: null;
			});
		}
		return (
			<div>
				{domNodes}
			</div>
		);
	}
};

class NodeLine extends React.Component {

	constructor(props) {
	    super(props);
	    this.selectNode = this.selectNode.bind(this);
	    this.deleteNode = this.deleteNode.bind(this);
	    this.state = {};
	}

	selectNode(){
		this.props.selectNode(this.props.node.nid);
	}

	deleteNode(e){
		e.stopPropagation();
		this.props.deleteSelectedNode(this.props.node.nid);
	}

	render() {
		var selected = this.props.selectedNode == this.props.node.nid;
		var domLinks = [];
		if(this.props.links && selected){
			for (var i = 0; i < this.props.links.length; i++) {
				var link = this.props.links[i];
				if(link && link.nodes && link.nodes[this.props.node.nid]){
					domLinks.push(
						<LinkLine key={"key-node-" + this.props.node.nid + "-link-" + i} link={link} nodes={this.props.nodes} 
								  selectedNode={this.props.selectedNode} selectedLink={this.props.selectedLink} selectLink={this.props.selectLink}
								  deleteLink={this.props.deleteLink}/>
					);
				}
			}
		}
		return (
			<div>
				<div onClick={this.selectNode} className={ selected ? "selected-node-line" : "node-line" }>
					<div className="arrow-right v-align-middle inline-block"></div>
					<span className="v-align-middle" style={{marginLeft : (selected ? "4px" : "5px")}}>{this.props.node.title}</span>
					<DeleteButton label="delete" action={this.deleteNode}/>
				</div>
				<div>
					{domLinks}
				</div>
				<div style={{opacity:".5", marginLeft:"10px", marginTop: "3px", marginBottom: "3px"}} className={!selected || (domLinks && domLinks.length) ? "hide" : ""}>
					<div style={{display:"inline-block", verticalAlign:"middle"}} className="tiny-sphere"></div>
					<div style={{display:"inline-block", verticalAlign:"middle", marginLeft:"3px"}}>
						no link
					</div>
				</div>
			</div>
		);
	}
};

class LinkLine extends React.Component {

	constructor(props) {
	    super(props);
	    this.selectLink = this.selectLink.bind(this);
	    this.deleteLink = this.deleteLink.bind(this);
	    this.state = {};
	}

	selectLink(){
		this.props.selectLink(this.props.link);
	}

	deleteLink(e){
		e.stopPropagation();
		var link = this.props.link;
		var nkeys = link && link.nodes ? Object.keys(link.nodes).join("") : null;
		if(nkeys) this.props.deleteLink(nkeys);
	}

	render() {
		var link = this.props.link;
		var nkeys = link && link.nodes ? Object.keys(link.nodes) : [];
		var selected = !!(link.nodes && this.props.selectedLink && this.props.selectedLink == nkeys.join(""));
		var targetNid = 0;
		if(nkeys.length){
			if(nkeys[0] == this.props.selectedNode) targetNid = nkeys[1];
			else targetNid = nkeys[0];
		}

		return (
			<div>
				<div onClick={this.selectLink} className={ selected ? "selected-link-line" : "link-line" }>
					<div className="arrow-right v-align-middle inline-block">&#8212;</div>
					<span className="v-align-middle" style={{marginLeft : "5px"}}>
						{this.props.nodes && this.props.nodes[targetNid] ? this.props.nodes[targetNid].title : "" }
					</span>
					<DeleteButton label="unlink" action={this.deleteLink}/>
				</div>
			</div>
		);
	}
};

class NodeDetails extends React.Component {

	constructor(props) {
	    super(props);
	    
	    this.deleteNode = this.deleteNode.bind(this);
	    this.changeText = this.changeText.bind(this);
	    this.changeDescription = this.changeDescription.bind(this);
	    this.appl = this.appl.bind(this);
		this.okd = this.okd.bind(this);
		this.appl2 = this.appl2.bind(this);
		this.changeNodeScale = this.changeNodeScale.bind(this);

	    var node = this.props.map && this.props.map.nodes && this.props.selectedNode !== undefined && this.props.map.nodes[this.props.selectedNode];
	    
	    this.state = {
	    	text : node ? node.title : "",
	    	description : node ? node.description : ""
	    };
	}

	componentWillReceiveProps(np){
		var node = np.map && np.map.nodes && np.selectedNode !== undefined && np.map.nodes[np.selectedNode];
		if(node.title !== this.state.text){
			this.setState({
				text : node.title
			});
		}
	}

	deleteNode(e){
		e.stopPropagation();
		this.props.deleteSelectedNode(this.props.node.nid);
	}

	changeText(e){
		this.setState({
			text : e.target.value
		});
	}

	changeDescription(e){
		this.setState({
			description : e.target.value
		}, function(){
			var el = this.refs.lpnodedescription;
			setTimeout(function(){
				var baseCss = "text-align: center; font-size: 12px; background-color: inherit; border-top: none; border-right: none; border-bottom: 1px solid black; border-left: none; border-image: initial;resize: none;";
				el.style.cssText = baseCss + 'height:auto; padding:0';
				el.style.cssText = baseCss + 'height:' + el.scrollHeight + 'px';
			}, 0);
		});
	}
	
	okd(e){
		if(e.keyCode == 13 && this.state.text) this.appl();
	}

	appl(){
		this.props.changeNodeText(this.props.selectedNode, this.state.text);
		this.refs.lpnodeinput.blur();
	}

	appl2(){
		this.props.changeNodeDescription(this.props.selectedNode, this.state.description);
		this.refs.lpnodedescription.blur();
	}

	changeNodeScale(scale){
		this.props.changeNodeScale(this.props.selectedNode, scale);
	}

	render() {
		var node = this.props.map && this.props.map.nodes && this.props.selectedNode !== undefined && this.props.map.nodes[this.props.selectedNode];
		if(!node) return null;
		return (
			<div>
				<div>
					<h3>Text</h3>
					<div className="flex">
						<div className="flex-grow-1">
							<div><input ref="lpnodeinput" className="no-outline" style={{textAlign:"center", fontSize:"12px", backgroundColor:"inherit", border : "none", borderBottom: "solid 1px black"}}
										onKeyDown={this.okd} value={this.state.text} onChange={this.changeText} placeholder={"node's text"}/>
							</div>
						</div>
						<div className="flex-grow-0">
							<div onClick={this.appl} className={"hover-toggle " + (this.state.text == node.title ? "" : "hover-active")} style={{width:"50px", paddingLeft:"5px", fontSize:"12px", cursor:"pointer"}}>&#x2713; apply</div>
						</div>
					</div>
				</div>
				<div>
					<h3>Details</h3>
					<div className="flex">
						<div className="flex-grow-1">
							<div><textarea ref="lpnodedescription" className="no-outline" style={{textAlign:"center", fontSize:"12px", backgroundColor:"inherit", border : "none", borderBottom: "solid 1px black"}}
										value={this.state.description} onChange={this.changeDescription} placeholder={"node's description"}></textarea>
							</div>
						</div>
						<div className="flex-grow-0">
							<div onClick={this.appl2} className={"hover-toggle " + (this.state.description == node.description ? "" : "hover-active")} style={{width:"50px", paddingLeft:"5px", fontSize:"12px", cursor:"pointer"}}>&#x2713; apply</div>
						</div>
					</div>
				</div>
				<div>
					<h3>Scale</h3>
					<div className="flex">
						<div onClick={this.changeNodeScale.bind(this, 0.5)} className="flex-grow-1 scale-wrapper">
							<div style={{fontSize:"12px", textAlign:"center"}}>small</div>
							<div className={"scale-05 " + (node && node.scale == 0.5 ? "selected-scale" : "")}></div>
						</div>
						<div onClick={this.changeNodeScale.bind(this, 1)} className="flex-grow-1 scale-wrapper">
							<div style={{fontSize:"12px", textAlign:"center"}}>normal</div>
							<div className={"scale-1 " + (node && node.scale == 1 ? "selected-scale" : "")}></div>
						</div>
						<div onClick={this.changeNodeScale.bind(this, 2)} className="flex-grow-1 scale-wrapper">
							<div style={{fontSize:"12px", textAlign:"center"}}>large</div>
							<div className={"scale-2 " + (node && node.scale == 2 ? "selected-scale" : "")}></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

