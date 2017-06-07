import React from 'react';
import { browserHistory } from 'react-router';

import DeleteButton from './deletebutton';
import FullButton from './fullbutton';

import DRAWING from '../../properties/drawing';

import AuthServices from '../../services/auth';

import {InnerManageUser} from './manageusers';

import Modal from 'boron/DropModal';

class LeftPanel extends React.Component {

	constructor(props) {
	    super(props);
	    this.backToMyMaps = this.backToMyMaps.bind(this);
	    this.resetTutorial = this.resetTutorial.bind(this);
	    this.minimizeOrExpand = this.minimizeOrExpand.bind(this);
	    this.changeMode = this.changeMode.bind(this);
	    this.printWindow = this.printWindow.bind(this);
	    this.showInviteModal = this.showInviteModal.bind(this);
	    this.hideInviteModal = this.hideInviteModal.bind(this);
	    
	    this.state = {
	    	nav : 0,
	    	minimize : false,
	    	showManageUserModal : false
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

	changeMode(mode){
		this.props.changeMode(mode);
	}

	printWindow(){
		window.print();
	}

	hideInviteModal(){
		console.log("hideInviteModal");
		this.refs.manageusermodal.hide();
		this.setState({
			showManageUserModal : false
		});
	}

	showInviteModal(){
		console.log("showInviteModal");
		console.log(this.refs.manageusermodal);
		this.refs.manageusermodal.show();
		this.setState({
			showManageUserModal : true
		});
	}

	render() {
		
		var dom = null, title = "";
		var nodeSelected = !(this.props.selectedNode === undefined || this.props.selectedNode === null);
		if(!nodeSelected && this.state.nav == 1) this.state.nav = 0;
		let subSpace = window.innerHeight - (65);
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
						changeNodeColor={this.props.changeNodeColor}
						changeNodeBcgColor={this.props.changeNodeBcgColor}
						changeNodeBorderColor={this.props.changeNodeBorderColor}
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
			<div>
				<Modal ref="manageusermodal" onHide={this.hideInviteModal}>
					<div style={{paddingLeft:"30px", paddingRight:"30px", marginTop: "20px", marginBottom: "20px", display:"flex"}}>
						<div style={{flexGrow:1}}><hr style={{opacity:".3", borderTop:"solid 1px #424242", borderBottom:"none"}}/></div>
						<div style={{flexGrow:0, fontSize:"14px", paddingLeft:"10px", paddingRight:"10px"}}><div>Manage Map Users</div></div>
						<div style={{flexGrow:1}}><hr style={{opacity:".3", borderTop:"solid 1px #424242", borderBottom:"none"}}/></div>
					</div>
                    <InnerManageUser map={this.props.map} user={this.props.user}/>
                </Modal>
				<div id="left-panel-wrapper" ref="left-panel-wrapper" style={{width: (this.state.minimize ? "auto" : "250px"), height:"100%"}} className="flex-grow-0">
					<div id="left-panel">
						<div className="flex" style={{paddingTop:"10px", paddingBottom:"10px"}}>
							<div className="flex-grow-0" style={{paddingTop:"10px", paddingLeft : (this.state.minimize ? "2px" : "10px"), paddingRight : (this.state.minimize ? "2px" : "10px")}} id="logo">Mg.</div>
							<div id="lp-node-block" className="flex-grow-1" style={{textAlign:"right", display : (this.state.minimize ? "none" : "block")}}>
								<div title="create and modify nodes" className={"tippyleftpanel " + (this.props.mode === 1 ? "selected-mode-line" : "un-selected-mode-line")} onClick={this.changeMode.bind(this, 1)}>
									<span style={{verticalAlign:"middle"}}>Creation</span>
									<img style={{verticalAlign:"middle", marginLeft:"5px", marginRight:"5px", width:"30px", marginTop:"3px"}} src={"../assets/images/mode-creation" + (this.props.mode === 1 ? "-purple.svg" : ".svg")}/>
								</div>
								<div title="create relations between nodes" className={"tippyleftpanel " + (this.props.mode === 2 ? "selected-mode-line" : "un-selected-mode-line")} onClick={this.changeMode.bind(this, 2)}>
									<span style={{verticalAlign:"middle"}}>Relation</span>
									<img style={{verticalAlign:"middle", marginLeft:"5px", marginRight:"5px", width:"30px", marginTop:"3px"}} src={"../assets/images/mode-relation" + (this.props.mode === 2 ? "-purple.svg" : ".svg")}/>
								</div>
							</div>
						</div>
						
						<div className="flex">
							<div className="flex-grow-0">
								<div style={{display : this.state.minimize ? "block" : "none"}}>
									<div title="create and modify nodes" className={"tippyleftpanel " + (this.props.mode === 1 ? "selected-mode-line" : "un-selected-mode-line")} onClick={this.changeMode.bind(this, 1)}>
										<img style={{cursor:"pointer", display:"block", marginLeft:"auto", marginRight:"auto", width:"20px", marginBottom:"10px"}} src={"../assets/images/mode-creation" + (this.props.mode === 1 ? "-purple.svg" : ".svg")}/>
									</div>
									<div title="create relations between nodes" className={"tippyleftpanel " + (this.props.mode === 2 ? "selected-mode-line" : "un-selected-mode-line")} onClick={this.changeMode.bind(this, 2)}>
										<img style={{cursor:"pointer", display:"block", marginLeft:"auto", marginRight:"auto", width:"20px", marginBottom:"10px"}} src={"../assets/images/mode-relation" + (this.props.mode === 2 ? "-purple.svg" : ".svg")}/>
									</div>
								</div>
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
								<div onClick={this.selectNav.bind(this, 3)} className={"tippyleftpanel " + (!this.state.minimize && this.state.nav == 3 ? "left-panel-nav-selected" : "left-panel-nav")} title="logs" style={{cursor : "pointer", display: "none"}}>
									<img style={{display : "block", marginLeft:"auto", marginRight:"auto"}} src={"../assets/images/"+ (!this.state.minimize && this.state.nav == 3 ? "logs.svg" : "logs-white.svg")}/>
								</div>
								<div onClick={this.showInviteModal} className="tippyleftpanel left-panel-nav" title="manage users" style={{cursor : "pointer"}}>
									<img style={{display : "block", marginLeft:"auto", marginRight:"auto"}} src="../assets/images/invite-white.svg"/>
								</div>
								<div onClick={this.printWindow} className="tippyleftpanel left-panel-nav" title="export" style={{cursor : "pointer"}}>
									<img style={{display : "block", marginLeft:"auto", marginRight:"auto"}} src="../assets/images/export-white.svg"/>
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
					<div className="v-align-middle" style={{maxWidth:"100px", overflow:"hidden", display:"inline-block", marginLeft : (selected ? "4px" : "5px")}}>
						{this.props.node.title}
					</div>
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
					<div className="v-align-middle" style={{display:"inline-block", maxWidth:"100px", overflow:"hidden", marginLeft : "5px"}}>
						{this.props.nodes && this.props.nodes[targetNid] ? this.props.nodes[targetNid].title : "" }
					</div>
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
		this.changeNodeColor = this.changeNodeColor.bind(this);
		this.changeNodeBcgColor = this.changeNodeBcgColor.bind(this);
		this.changeNodeBorderColor = this.changeNodeBorderColor.bind(this);


	    var node = this.props.map && this.props.map.nodes && this.props.selectedNode !== undefined && this.props.map.nodes[this.props.selectedNode];
	    
	    this.state = {
	    	text : node ? node.title : "",
	    	description : node ? node.description : "",
	    	showColor : 2
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

	changeNodeColor(color){
		this.props.changeNodeColor(color);
	}

	changeNodeBcgColor(color){
		this.props.changeNodeBcgColor(color);
	}

	changeNodeBorderColor(color){
		this.props.changeNodeBorderColor(color);
	}

	changeShowColor(showColor){
		this.setState({
			showColor : showColor
		});
	}

	render() {
		var node = this.props.map && this.props.map.nodes && this.props.selectedNode !== undefined && this.props.map.nodes[this.props.selectedNode];
		let textColors = [], bcgColors = [], borderColors = [], currentText = [], currentBcg = [], currentBorder = [];
		for (var i = 0; i < DRAWING.colors.length; i++) {
			
			currentText.push(
				<div className="flex-grow-1" key={"text-color-key-" + i}>
					<div onClick={this.changeNodeColor.bind(this, DRAWING.colors[i])} style={{backgroundColor: DRAWING.colors[i], height: "20px", cursor : "pointer", border : "solid 2px " + (node.color == DRAWING.colors[i] ? "white" : DRAWING.colors[i])}}>
					</div>
				</div>
			);
			currentBcg.push(
				<div className="flex-grow-1" key={"bcg-color-key-" + i}>
					<div onClick={this.changeNodeBcgColor.bind(this, DRAWING.colors[i])} style={{backgroundColor: DRAWING.colors[i], height: "20px", cursor : "pointer", border : "solid 2px " + (node.bcg_color == DRAWING.colors[i] ? "white" : DRAWING.colors[i])}}>
					</div>
				</div>
			);
			currentBorder.push(
				<div className="flex-grow-1" key={"border-color-key-" + i}>
					<div onClick={this.changeNodeBorderColor.bind(this, DRAWING.colors[i])} style={{backgroundColor: DRAWING.colors[i], height: "20px", cursor : "pointer", border : "solid 2px " + (node.border_color == DRAWING.colors[i] ? "white" : DRAWING.colors[i])}}>
					</div>
				</div>
			);

			if((i+1)%6 == 0 || i == DRAWING.colors.length - 1) {
				textColors.push(<div key={"flex-key-text-key" + i} className="flex">{currentText}</div>);
				bcgColors.push(<div key={"flex-key-bcg-key" + i} className="flex">{currentBcg}</div>);
				borderColors.push(<div key={"flex-key-border-key" + i} className="flex">{currentBorder}</div>);
				currentText = [];
				currentBcg = [];
				currentBorder = [];
			}
		}
		if(!node) return null;
		return (
			<div>
				
				<div>
					<h3 style={{marginTop:'0px'}}>Text</h3>
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
					<h3>Color</h3>
					<div style={{textAlign: "center", marginBottom:"5px"}}>
						<span style={{cursor: "pointer", color : (this.state.showColor === 2 ? "#9C27B0" : "#424242")}} onClick={this.changeShowColor.bind(this, 2)}>background</span>
						<span> | </span>
						<span style={{cursor: "pointer", color : (this.state.showColor === 1 ? "#9C27B0" : "#424242")}} onClick={this.changeShowColor.bind(this, 1)}>title</span>
						<span> | </span>
						<span style={{cursor: "pointer", color : (this.state.showColor === 3 ? "#9C27B0" : "#424242")}} onClick={this.changeShowColor.bind(this, 3)}>border</span>
					</div>
					<div style={{display : (this.state.showColor === 1 ? "block" : "none")}}>{textColors}</div>
					<div style={{display : (this.state.showColor === 2 ? "block" : "none")}}>{bcgColors}</div>
					<div style={{display : (this.state.showColor === 3 ? "block" : "none")}}>{borderColors}</div>
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

		let msgHeight = this.props.vspace - 70 - headerHeight;
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
					<div style={{marginTop:"20px", textAlign:"center", fontSize:"13px", display : (msgs.length ? "none" : "block")}}>
						Empty History
					</div>
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