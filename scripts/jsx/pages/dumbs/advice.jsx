import React from 'react'

class Advice extends React.Component {

	constructor(props) {
	    super(props);

	    this.changePage = this.changePage.bind(this);
	    this.getTutoNode = this.getTutoNode.bind(this);
	    this.dismiss = this.dismiss.bind(this);

	    this.state = {
	    	map : null,
	    	page : 0
	    };
	}

	dismiss(){
		console.log("dismiss");
	}

	changePage(page){
		this.setState({
			page : page
		});
	}

	getTutoNode(count, action, how, img, mtop){
		return <div key={"tuto-" + count} className="flex" style={{display : this.state.page == count ? "" : "none"}}>
			<div className="flex-grow-1"  style={{verticalAlign:"middle"}}>
				<div style={{minWidth:"190px", fontWeight:"bold"}}>{action}</div>
				<div>{how}</div>
			</div>
			<div className="flex-grow-0" style={{verticalAlign:"middle"}}>
				<div style={{minWidth:"40px"}}>
					<img style={{height:"30px", marginRight:"5px", marginLeft:"5px"}} src={"../assets/images/" + img}/>
				</div>
			</div>
		</div>
	}

	render() {
		var dom = [], pages = [], count = 0;
		if(true){
			dom.push(this.getTutoNode(count, "New node", "double click on the background", "tuto-dbclick.svg", 7));
			count++;
		}
		if(true){
			dom.push(this.getTutoNode(count, "Select a node", "click on his background", "tuto-select-node.png", 12));
			count++;
		}
		if(true){
			dom.push(this.getTutoNode(count, "Modify title", "click on it", "tuto-change-title.png", 12));
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
			<div className="border-shadow" style={{padding:"10px", position:"absolute", top:"10px", right:"10px", fontSize:"12px"}}>
				<div>{dom}</div>
				<div style={{marginTop:'3px'}}>
					{pages}
					<span style={{float:"right", cursor:"pointer"}} className="purple">
						<span onClick={this.changePage.bind(this, this.state.page + 1)} style={{display : this.state.page == pages.length - 1 ? "none" : "inline"}}>next <span style={{marginLeft:"3px"}}>&#10095;</span></span>
						<span onClick={this.dismiss} style={{display : this.state.page == pages.length - 1 ? "inline" : "none"}}>dismiss <span style={{marginLeft:"3px"}}>&#10005;</span></span>
					</span>
				</div>
			</div>
		);
	}
};

export default Advice;