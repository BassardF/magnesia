import React from 'react'
import { browserHistory } from 'react-router';

import DeleteButton from './deletebutton'
import FullButton from './fullbutton'

import AuthServices from '../../services/auth'

class LeftPanel extends React.Component {

	constructor(props) {
	    super(props);
	    this.backToMyMaps = this.backToMyMaps.bind(this);
	    this.resetTutorial = this.resetTutorial.bind(this);
	    this.minimizeOrExpand = this.minimizeOrExpand.bind(this);

	    this.state = {
	    	nav : 0,
	    	minimize : false
	    };
	}

	componentWillMount(){
	}

	componentDidMount(){
		new Tippy('.tippyleftpanel', {
		    position: 'right',
		    animation: 'shift',
		    duration: 200,
		    arrow: true
		})
	}

	componentWillUnMount(){
	}

	minimizeOrExpand(){
		this.setState({
			minimize : !this.state.minimize
		}, ()=>{
			this.props.resizeSvg();
		});
	}

	selectNav(nav){
		this.setState({
			nav : nav,
			minimize : false
		});
	}

	backToMyMaps(){
		this.props.selectNode(null, ()=>{
			browserHistory.push('/maps');	
		});
	}

	resetTutorial(){
		this.props.user.resetTutorial(AuthServices.getUid());
	}

	render() {
		
		var dom = null, title = "";
		var nodeSelected = !(this.props.selectedNode === undefined || this.props.selectedNode === null);
		if(!nodeSelected && this.state.nav == 1) this.state.nav = 0;
		let subSpace = window.innerHeight - (39);
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
		        			   deleteSelectedNode={this.props.deleteSelectedNode} 
		        			   changeNodeScale={this.props.changeNodeScale}/>;
		        title = "Node Details";
		        break;
		    case 2:
		        title = "Messages";
		        dom = <MessageBlock vspace={subSpace} map={this.props.map} sendMessage={this.props.sendMessage}/>
		        break;
		    case 3:
		        title = "Logs";
		        dom = <LogsBlock/>
		        break;
		}

		var ls = !this.state.minimize ? (
			<div>
	 			<div className="left-panel-title">{title}</div>
	 			<div style={{padding:"10px"}}>{dom}</div>
	 		</div>
		 	) : null;

		return (
			<div id="left-panel-wrapper" ref="left-panel-wrapper" style={{width: (this.state.minimize ? "auto" : "250px"), height:"100%"}} className="flex-grow-0">
				<div id="left-panel">
					<div style={{paddingTop:"10px"}} id="logo">Mg.</div>
					<div className="flex">
						<div className="flex-grow-0">
							<div onClick={this.backToMyMaps} className={"left-panel-nav tippyleftpanel"} title="back to my maps" style={{cursor : "pointer"}}>
								<img className="rotate-180" style={{display : "block", marginLeft:"auto", marginRight:"auto"}} src="../assets/images/arrow-right-white.svg"/>
							</div>
							<div onClick={this.minimizeOrExpand} className={"left-panel-nav tippyleftpanel"} title="minimize" style={{cursor : "pointer", display : (this.state.minimize ? "none" : "block")}}>
								<img style={{display : "block", marginLeft:"auto", marginRight:"auto"}} src="../assets/images/minimize-white.svg"/>
							</div>
							<div onClick={this.minimizeOrExpand} className={"left-panel-nav tippyleftpanel"} title="expand" style={{cursor : "pointer", display : (this.state.minimize ? "block" : "none")}}>
								<img style={{display : "block", marginLeft:"auto", marginRight:"auto"}} src="../assets/images/expand-white.svg"/>
							</div>
							<div onClick={this.selectNav.bind(this, 0)} className={"tippyleftpanel " + (!this.state.minimize && this.state.nav == 0 ? "left-panel-nav-selected" : "left-panel-nav")} title="navigation tree" style={{cursor : "pointer"}}>
								<img style={{display : "block", marginLeft:"auto", marginRight:"auto"}} src={"../assets/images/"+ (!this.state.minimize && this.state.nav == 0 ? "tree.svg" : "tree-white.svg")}/>
							</div>
							<div onClick={nodeSelected ? this.selectNav.bind(this, 1) : null} className={"tippyleftpanel " + (!this.state.minimize && this.state.nav == 1 ? "left-panel-nav-selected" : "left-panel-nav")} title="modify node" style={{cursor : (nodeSelected ? "pointer" : "not-allowed")}}>
								<img style={{display : "block", marginLeft:"auto", marginRight:"auto", opacity : (nodeSelected ? "1" : ".5")}} src={"../assets/images/"+ (!this.state.minimize && this.state.nav == 1 ? "node.svg" : "node-white.svg")}/>
							</div>
							<div onClick={this.selectNav.bind(this, 2)} className={"tippyleftpanel " + (!this.state.minimize && this.state.nav == 2 ? "left-panel-nav-selected" : "left-panel-nav")} title="chat" style={{cursor : "pointer"}}>
								<img style={{display : "block", marginLeft:"auto", marginRight:"auto"}} src={"../assets/images/"+ (!this.state.minimize && this.state.nav == 2 ? "chat.svg" : "chat-white.svg")}/>
							</div>
							<div onClick={this.selectNav.bind(this, 3)} className={"tippyleftpanel " + (!this.state.minimize && this.state.nav == 3 ? "left-panel-nav-selected" : "left-panel-nav")} title="logs" style={{cursor : "pointer"}}>
								<img style={{display : "block", marginLeft:"auto", marginRight:"auto"}} src={"../assets/images/"+ (!this.state.minimize && this.state.nav == 3 ? "logs.svg" : "logs-white.svg")}/>
							</div>
							<div onClick={this.resetTutorial} className="tippyleftpanel left-panel-nav" title="reset tutorials" style={{cursor : "pointer", display : (this.props.user && this.props.user.advice ? "block" : "none")}}>
								<img style={{display : "block", marginLeft:"auto", marginRight:"auto"}} src="../assets/images/graphic-white.svg"/>
							</div>

						</div>
						<div className="flex-grow-1">
							{ls}
						</div>
					</div>
				</div>
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
		var node = this.props.map && this.props.map.nodes && this.props.selectedNode !== undefined && this.props.map.nodes[this.props.selectedNode];
		this.props.deleteSelectedNode(node.nid);
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
							<div><textarea rows="1" ref="lpnodedescription" className="no-outline" style={{textAlign:"center", fontSize:"12px", backgroundColor:"inherit", border : "none", borderBottom: "solid 1px black", resize: "none"}}
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
				<div style={{marginTop:"20px", textAlign:"center"}}>
					<FullButton label="delete this node" action={this.deleteNode}/>
				</div>
			</div>
		);
	}
};

class MessageBlock extends React.Component {

	constructor(props) {
	    super(props);
	    this.changePrompt = this.changePrompt.bind(this);
	    this.send = this.send.bind(this);
	    this.okd = this.okd.bind(this);
	    this.state = {};
	}

	componentDidMount(){
		this.refs.prompt.focus();
		var el = this.refs.messages;
		if(el) el.scrollTop = el.scrollHeight;
	}

	componentDidUpdate(){
		var el = this.refs.messages;
		if(el) el.scrollTop = el.scrollHeight;
	}

	changePrompt(e){
		this.setState({
			prompt : e.target.value
		}, function(){
			var el = this.refs.prompt;
			setTimeout(function(){
				var baseCss = "width:98%;text-align: center; font-size: 12px; background-color: inherit; border-top: none; border-right: none; border-bottom: 1px solid black; border-left: none; border-image: initial;resize: none;";
				el.style.cssText = baseCss + 'height:auto; padding:0';
				el.style.cssText = baseCss + 'height:' + el.scrollHeight + 'px';
			}, 0);
		});
	}

	okd(e){
		if(e.keyCode == 13 && this.state.prompt) {
			e.stopPropagation();
			e.preventDefault();
			this.send();
		}
	}

	send(){
		this.props.sendMessage(this.state.prompt);
		this.setState({
			prompt : ''
		});
	}

	render() {
		let msgs = [];
		if(this.props.map.messages){
			for(var mid in this.props.map.messages){
				msgs.push(
					<MessageLine key={"key-msg-" + mid} message={this.props.map.messages[mid]}/>
				);
			}
		}
		let headerHeight = 41;
		let headerNode = this.refs.msgactionwrapper;
		if(headerNode){
			headerHeight = headerNode.offsetHeight;	
		}

		let msgHeight = this.props.vspace - 40 - headerHeight;
		return (
			<div>
				<div ref="msgactionwrapper">
					<div>
						<div>
							<textarea ref="prompt" rows="1" onKeyDown={this.okd} className="no-outline" style={{width:"98%", textAlign:"center", fontSize:"12px", backgroundColor:"inherit", border : "none", borderBottom: "solid 1px black", resize: "none"}}
									  value={this.state.prompt} onChange={this.changePrompt} placeholder={"message..."}></textarea>
						</div>
					</div>
					<div style={{height:"17px"}}>
						<div onClick={this.state.prompt ? this.send : null} className={"hover-toggle " + (this.state.prompt ? "hover-active" : "")} style={{marginBottom:"5px", marginTop:"5px", fontSize:"14px", cursor:(this.state.prompt ? "pointer" : "default"), textAlign: "center"}}>&#x2712; send</div>
					</div>
				</div>
				<div ref='messages' style={{overflow:"scroll", height: msgHeight + "px"}}>
					{msgs}
				</div>
			</div>
		);
	}
};

class MessageLine extends React.Component {

	render() {
		let time = this.props.message && this.props.message.timestamp ? this.props.message.timestamp : null;
		if(time){
			let t = new Date(time), now = new Date();
			if(t.getDate() == now.getDate() && t.getMonth() == now.getMonth() && t.getFullYear() == now.getFullYear()){
				time = t.getHours() + ":" + (t.getMinutes()<10?'0':'') + t.getMinutes();
			} else {
				let months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
				time = t.getDate() + " " + (months[t.getMonth()]) + " " + (t.getFullYear()-2000);
			}
		}

		return (
			<div>
				<div>
					<h4 style={{fontSize:"15px", marginBottom:"0px"}}>{this.props.message.name}</h4>
					<div style={{fontSize:"11px", textAlign:"right"}}>{time}</div>
				</div>
				<div style={{fontSize:"13px"}}>
					{this.props.message.content} 
				</div>
			</div>
		);
	}
};

class LogsBlock extends React.Component {

	render() {

		return (
			<div>
				<div>
					<div style={{marginTop:"20px", marginBottom:"20px", textAlign:"center", fontSize : "22px"}}>Area under</div>
					<img style={{width:"70px", display : "block", marginLeft:"auto", marginRight:"auto"}} src="../assets/images/construction.svg"/>
					<div style={{marginTop:"20px", textAlign:"center", fontSize : "22px"}}>construction</div>
				</div>
			</div>
		);
	}
};