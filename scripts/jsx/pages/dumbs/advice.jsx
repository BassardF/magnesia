import React from 'react'

import AuthServices from '../../services/auth'

class Advice extends React.Component {

	constructor(props) {
	    super(props);

	    this.changePage = this.changePage.bind(this);
	    this.getTutoNode = this.getTutoNode.bind(this);
	    this.dismiss = this.dismiss.bind(this);

	    this.state = {
	    	map : null,
	    	current : null,
	    	page : 0
	    };
	}

	componentWillReceiveProps(np){
		var hasNNS = (np.user && np.user.advice && np.user.advice['no-node-selected']);
		var hasNS = (np.user && np.user.advice && np.user.advice['node-selected']);
		if(np.map && !np.selectedNode && np.selectedNode !== 0 && !hasNNS){
			this.setState({
				current : "no-node-selected"
			});
		} else if(np.map && (np.selectedNode || np.selectedNode === 0) && !hasNS){
			this.setState({
				current : "node-selected"
			});
		} else {
			this.setState({
				page : 0,
				current : null
			});
		}
	}

	dismiss(){
		this.refs.advicewrapper.className = "border-shadow advice-wrapper";
		setTimeout(()=>{
			if(this.props.user) this.props.user.dismissAdvice(AuthServices.getUid(), this.state.current);
			this.setState({
				page : 0,
				current : null
			});
		}, 500);
	}

	changePage(page){
		this.setState({
			page : page
		});
	}

	getTutoNode(count, action, how, img, mtop){
		return <div key={"tuto-" + count} className="flex" style={{display : this.state.page == count ? "" : "none"}}>
			<div className="flex-grow-1"  style={{verticalAlign:"middle", marginBottom:"3px"}}>
				<div style={{minWidth:"190px", fontWeight:"bold", marginBottom:"3px"}}>{action}</div>
				<div>{how}</div>
			</div>
			<div className="flex-grow-0" style={{verticalAlign:"middle"}}>
				<div style={{minWidth:"40px"}}>
					<img style={{height:"30px", marginRight:"5px", marginLeft:"5px"}} src={"../assets/images/" + img}/>
				</div>
			</div>
		</div>
	}

	componentDidUpdate(){
		if(this.state.current){
			this.refs.advicewrapper.className = "border-shadow advice-wrapper advice-wrapper-shown";
		} else {
			this.refs.advicewrapper.className = "border-shadow advice-wrapper";
		}
	}

	render() {
		var dom = [], pages = [], count = 0;
		if(this.state.current == "no-node-selected"){
			dom.push(this.getTutoNode(count, "New node", "double click on the background", "tuto-dbclick.svg"));
			count++;
			dom.push(this.getTutoNode(count, "Select a node", "click on its background", "tuto-select-node.png"));
			count++;
			dom.push(this.getTutoNode(count, "Modify title", "click on it", "tuto-change-title.png"));
			count++;
		} else if(this.state.current == "node-selected"){
			dom.push(this.getTutoNode(count, "New related node", "double click on the background", "tuto-dbclick.svg"));
			count++;
			dom.push(this.getTutoNode(count, "More options", "get into the option tab!", "node.svg"));
			count++;
			dom.push(this.getTutoNode(count, "Deselect", "click on the node again", "tuto-select-node.png"));
			count++;
			dom.push(this.getTutoNode(count, "Delete this node", "press 'delete'", "tuto-delete.svg"));
			count++;
		}

		for (var i = 0; i < dom.length; i++) {
			pages.push(
				<span onClick={this.changePage.bind(this, i)} style={{cursor:"pointer"}} key={"pager-" + i} className={i == this.state.page ? "purple bold" : "extra-light-purple"}>
					&#9737;
				</span>
			);
		}

		return (
			<div ref="advicewrapper" className={"advice-wrapper " + (count ? "border-shadow " : "")} style={{padding:"10px", position:"absolute", top:"10px", fontSize:"12px"}}>
				<div>{dom}</div>
				<div style={{marginTop:'3px'}}>
					{pages}
					<span style={{display : (count ? "inline" : "none"), float:"right", cursor:"pointer", fontSize: "14px"}} className="purple">
						<span onClick={this.changePage.bind(this, this.state.page + 1)} style={{display : this.state.page == pages.length - 1 ? "none" : "inline"}}>next <span style={{marginLeft:"3px"}}>&#10095;</span></span>
						<span onClick={this.dismiss} style={{display : this.state.page == pages.length - 1 ? "inline" : "none"}}>dismiss <span style={{marginLeft:"3px"}}>&#10005;</span></span>
					</span>
				</div>
			</div>
		);
	}
};

export default Advice;