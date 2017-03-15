import React from 'react'

class NavigationPanel extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {};
	}

	componentWillMount(){
	}

	componentWillUnMount(){
	}

	render() {
		var domNodes = [];
		if(this.props.map && this.props.map.nodes){
			domNodes = this.props.map.nodes.map((n, ind) => {
				return <NodeLine key={"key-lp-node-line-" + n.nid} node={n} selectedNode={this.props.selectedNode} selectNode={this.props.selectNode}/>;
			});
		}
		return (
			<div id="navigation-panel">
				{domNodes}
			</div>
		);
	}
};

export default NavigationPanel;

class NodeLine extends React.Component {

	constructor(props) {
	    super(props);
	    this.selectNode = this.selectNode.bind(this);
	    this.state = {};
	}

	selectNode(){
		this.props.selectNode(this.props.node.nid);
	}

	render() {
		return (
			<div onClick={this.selectNode} className={this.props.selectedNode == this.props.node.nid ? "selected-node-line" : "node-line" }>
				<div className="arrow-right v-align-middle inline-block"></div>
				<span className="v-align-middle" style={{marginLeft : "5px"}}>{this.props.node.title}</span>
			</div>
		);
	}
};