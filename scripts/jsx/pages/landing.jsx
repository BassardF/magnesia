import React from 'react'

import DRAWING from '../properties/demodrawing'
import DEMONODES from '../properties/demonodes'

class LandingPage extends React.Component {

	constructor(props) {
	    super(props);

	    this.scrollToSecondBlock = this.scrollToSecondBlock.bind(this);

	    this.state = {
	    	drawDone : false,
	    	thirdLine1 : false,
	    	thirdLine2 : false,
	    	thirdLine3 : false
	    };
	}

	componentDidMount(){
		let view = document.getElementById('landing-page');
		let target = document.getElementById('landing-page-second-section');
		let tl1 = document.getElementById('third-line-1');
		let tl2 = document.getElementById('third-line-2');
		let tl3 = document.getElementById('third-line-3');
		this.checkSecondSectionInView(view, target, false);
		this.checkTlInVew(view, tl1, false);
		this.checkTlInVew(view, tl2, false);
		this.checkTlInVew(view, tl3, false);
		view.addEventListener('scroll', () => {
			if(!this.state.drawDone) this.checkSecondSectionInView(view, target, true);
			if(!this.state.thirdLine1) this.checkTlInVew(view, tl1, true, "thirdLine1");
			if(!this.state.thirdLine2) this.checkTlInVew(view, tl2, true, "thirdLine2");
			if(!this.state.thirdLine3) this.checkTlInVew(view, tl3, true, "thirdLine3");
		});
	}

	checkTlInVew(view, target, scroll, name){
		var elemTop = target.getBoundingClientRect().top;
	    var elemBottom = target.getBoundingClientRect().bottom;
	    if(elemTop < window.innerHeight && elemBottom >= 0){
	    	var st = this.state;
	    	st[name] = true
	    	this.setState(st);
	    }
	}

	checkSecondSectionInView(view, target, scroll){
		var elemTop = target.getBoundingClientRect().top;
	    var elemBottom = target.getBoundingClientRect().bottom;
	    if(elemTop+100 < window.innerHeight && elemBottom >= 0){
	    	this.setState({
	    		drawDone: true
	    	}, ()=>{
	    		if(scroll) this.scrollToSecondBlock();
	    	});
	    }
	}

	scrollToSecondBlock(){
 		let startY = document.getElementById('landing-page').scrollTop;
 		var stopY = 0;
 		var elm = document.getElementById("landing-page-second-section");
 		if(elm){
 			var y = elm.offsetTop;
	 		var node = elm;
	 		while (node.offsetParent && node.offsetParent != document.body) {
	 			node = node.offsetParent;
	 			y += node.offsetTop;
	 		}
	 		stopY = y - 31;

	 		var distance = stopY > startY ? stopY - startY : startY - stopY;
	 		if (distance < 100) {
	 			scrollTo(0, stopY); return;
	 		}
	 		var speed = Math.round(distance / 50);
	 		if (speed >= 20) speed = 20;
	 		var step = Math.round(distance / 25);
	 		var leapY = stopY > startY ? startY + step : startY - step;
	 		var timer = 0;
	 		if (stopY > startY) {
	 			for ( var i=startY; i<stopY; i+=step ) {
	 				setTimeout("document.getElementById('landing-page').scrollTop = " + leapY, timer * speed);
	 				leapY += step; if (leapY > stopY) leapY = stopY; timer++;
	 			} return;
	 		}
	 		for ( var i=startY; i>stopY; i-=step ) {
	 			setTimeout("document.getElementById('landing-page').scrollTop = " + leapY, timer * speed);
	 			leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
	 		}
 		}
	}

	render() {
		return (
			<div id="landing-page" style={{maxWidth:"1440px", marginLeft:"auto", marginRight:"auto", overflow:"auto", height:"100%"}}>
				<TopSection scrollToSecondBlock={this.scrollToSecondBlock}/>
				<SecondSection drawDone={this.state.drawDone}/>
				<ThirdSection thirdLine1={this.state.thirdLine1} thirdLine2={this.state.thirdLine2} thirdLine3={this.state.thirdLine3}/>
				<FourthSection/>

				<div style={{display:"none"}}>
					<h1>ideas</h1>
					
					<h3>Why / How / What / Ex</h3>
					<div>W : Ideas worth blooming - Growing brilliant ideas - Nurture your best ideas</div>
					<div>H : Visual representation | Structuration | Sharing @team</div>
					<div>Wh : Magnesia</div>

					<h3>tools ID</h3>
					<div>node/user count</div>

					<div></div>
				</div>
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
		this.draw();
	}

	draw(){
		let svg = d3.select("#headersvg"),
			width = svg.property("width"),
    		height = svg.property("height");

    	var wd = document.getElementById("landing-page-top-section").offsetWidth;
    	this.drawNodes(svg, wd, 300, DEMONODES.mainNode, 1);
    	setTimeout(()=>{ this.drawNodes(svg, wd, 300, DEMONODES.secondaryNodes, 2); }, 1000);
    	setTimeout(()=>{ this.drawNodes(svg, wd, 300, DEMONODES.tertiaryNodes, 3); }, 2000);

    	setTimeout(()=>{ this.drawLinks(svg, wd, 300, DEMONODES.firstLinks, 1); }, 1500);
    	setTimeout(()=>{ this.drawLinks(svg, wd, 300, DEMONODES.secondaryLinks, 2); }, 2500);
	}

	drawNodes(svg, width, height, nodes, nb){
		
		let gs = svg.select("g#nodes" + nb).selectAll("g.node").data(nodes, function(d, ind) {
			return d;
		});

		//Enter
		let elemtEnter = gs.enter().append("g").attr("class", "node");

		let t = d3.transition().duration(500);

		elemtEnter.append("circle")
		    .attr("stroke", function(d, i){return DRAWING.defaultCircleStrokeColor})
		    .attr("stroke-width", function(d, i){return DRAWING.defaultCircleStrokeWidth})
    		.attr("fill", "#9C27B0")
    	    .attr("r", function(d, i) {return 40 * (nodes[i].scale ? +nodes[i].scale : 1);}) 
    	  	.attr("cy", function(d, i) {return height/2 + (nodes[i].y ? +nodes[i].y : 0)})
		    .attr("cx", function(d, i) {return width/2 + (nodes[i].x ? +nodes[i].x : 0)})
		    .attr("stroke", (d, i) => {return nodes[i].nid == this.state.selectedNode ? DRAWING.selectedCircleStrokeColor : DRAWING.defaultCircleStrokeColor})
		    .attr("stroke-width", (d, i) => {return nodes[i].nid == this.state.selectedNode ? DRAWING.selectedCircleStrokeWidth : DRAWING.defaultCircleStrokeWidth})
		    .style("opacity", 0)
	      .transition(t)
	      	.style("opacity", 1);
    		
    	elemtEnter.append("text")
	        .attr("fill", DRAWING.defaultTextColor)
	        .attr("text-anchor", "middle")
	        .attr("class", "noselect")
	        .attr("dx", function(d, i) {return width/2 + (nodes[i].x ? +nodes[i].x : 0);})
	        .attr("dy", function(d, i) {return height/2 + (nodes[i].y ? +nodes[i].y : 0) + 5;})
	        .text((d, i) => {return nodes[i].title;})
	        .style("opacity", 0)
	      .transition(t)
	      	.style("opacity", 1);

	}

	drawLinks(svg, width, height, links, nb){
		
		let gs = svg.select("g#links" + nb).selectAll("g.link").data(links, function(d) { return d; });

		//Enter
		let elemtEnter = gs.enter().append("g").attr("class", "link");
		var allNodes = DEMONODES.mainNode.concat(DEMONODES.secondaryNodes).concat(DEMONODES.tertiaryNodes);

		let t = d3.transition().duration(500);

		elemtEnter.append("line")
		    .attr("stroke-width", function(d, i){return DRAWING.defaultCircleStrokeWidth})
    	  	.attr("stroke", (d, i) => {
    	  		let id = Object.keys(links[i].nodes).join("");
    	  		return DRAWING.defaultCircleStrokeColor
    	  	})
    	  	.attr("x1", (d, i) => {
    	  		let origin = allNodes[Object.keys(links[i].nodes)[0]];
    	  		return width/2 + (origin.x ? +origin.x : 0);
    	  	})
		    .attr("y1", (d, i) => {
		    	let origin = allNodes[Object.keys(links[i].nodes)[0]];
		    	return height/2 + (origin.y ? +origin.y : 0);
		    })
		    .attr("x2", (d, i) => {
		    	let destination = allNodes[Object.keys(links[i].nodes)[1]];
    	  		return width/2 + (destination.x ? +destination.x : 0);
		    })
		    .attr("y2", (d, i) => {
		    	let destination = allNodes[Object.keys(links[i].nodes)[1]];
		    	return height/2 + (destination.y ? +destination.y : 0);
		    })
		    .style("opacity", 0)
	      .transition(t)
	      	.style("opacity", 1);
	}

	render() {
		return (
			<div>
				<div id="landing-page-top-section" className="purple-bcg">
					<div id="lp-header-section">Mg.</div>
					<div id="lp-header-name">Magnesia</div>
					<div id="lp-header-sub-name">Nurture your brilliant ideas</div>

					<svg id="headersvg" style={{width:"100%", height:"300px"}}>
						<g id="links1"></g>
						<g id="links2"></g>
						<g id="nodes1"></g>
						<g id="nodes2"></g>
						<g id="nodes3"></g>
					</svg>
					<div style={{display:"flex"}}>
						<div id="triangle-left" style={{flexGrow:0}}></div>
						<div onClick={this.props.scrollToSecondBlock} id="" style={{flexGrow:1, textAlign:"center", color:"white", cursor:"pointer"}}>
							<div>Get your early access</div>
							<div style={{height:"20px", width:"20px", marginLeft:"auto", marginRight:"auto"}} className="rotate-90 vertical-bounce">
								&#10095;
							</div>
						</div>
						<div id="triangle-right" style={{flexGrow:0}}></div>
					</div>
				</div>
				
			</div>
		);
	}
};

class SecondSection extends React.Component {

	constructor(props) {
	    super(props);
	   	this.draw = this.draw.bind(this);
	   	this.changeEmail = this.changeEmail.bind(this);
	   	this.send = this.send.bind(this);
	   	
	    this.state = {
	    	email : ""
	    };
	}

	changeEmail(e){
		this.setState({email: e.target.value});
	}

	componentWillReceiveProps(np){
		if(np && np.drawDone){
			this.draw();
		}
	}

	draw(){
		let svg = d3.select("#secondsvg"),
			width = svg.property("width"),
    		height = svg.property("height");

    	var wd = document.getElementById("landing-page-second-section").offsetWidth;
    	//The idea
    	this.drawNodes(svg, wd, 300, [50], 1, "#424242");
    	this.drawText(svg, wd, 300, [{x : 0, y: 20, text:"The Idea"}], 1, "#424242");
    	this.drawLine(svg, wd, 300, [[50, 150]], "#424242");
    	//Version 0
    	setTimeout(()=>{ 
    		this.drawNodes(svg, wd, 300, [150], 1, "#424242"); 
    		this.drawText(svg, wd, 300, [{x : 80, y: 155, text:"First Version"}], 2, "#424242");
    		this.drawLine(svg, wd, 300, [[150, 250]], "#424242");
    	}, 1000);
    	//Pre launch
    	setTimeout(()=>{
    		this.drawNodes(svg, wd, 300, [250], 1, "#424242");
    		this.drawText(svg, wd, 300, [{x : -80, y: 255, text:"Pre-Launch"}], 3, "#424242");
    		this.drawLine(svg, wd, 300, [[250, 350]], "#BDBDBD");
    	}, 2000);
    	//Release
    	setTimeout(()=>{
    		this.drawNodes(svg, wd, 300, [350], 1, "#BDBDBD");
    		this.drawText(svg, wd, 300, [{x : 0, y: 390, text:"Release"}], 4, "#BDBDBD"); 
    		this.refs.getaccessblock.className = "show";
    	}, 3000);
	}

	drawText(svg, width, height, texts, nb, color){

		let gs = svg.select("g#stexts"+nb).selectAll("g.text").data(texts, function(d, ind) {
			return d;
		});

		//Enter
		let elemtEnter = gs.enter().append("g").attr("class", "text");

		let t = d3.transition().duration(200);

		elemtEnter.append("text")
	        .attr("fill", color)
	        .attr("text-anchor", "middle")
	        .attr("class", "noselect")
	        .attr("font-size", "20px")
	        .attr("dx", function(d, i) {return 150 + d.x})
	        .attr("dy", function(d, i) {return d.y})
	        .text((d, i) => {return d.text;})
	        .style("opacity", 0)
	      .transition(t)
	      	.style("opacity", 1);
	}

	drawNodes(svg, width, height, node, nb, color){
		
		let gs = svg.select("g#snodes" + nb).selectAll("g.node").data(node, function(d, ind) {
			return d;
		});

		//Enter
		let elemtEnter = gs.enter().append("g").attr("class", "node");

		let t = d3.transition().duration(200);

		elemtEnter.append("circle")
    		.attr("fill", color)
    	    .attr("r", function(d, i) {return 10;}) 
    	  	.attr("cy", function(d, i) {return node[0]})
		    .attr("cx", function(d, i) {return 150})
		    .style("opacity", 0)
	      .transition(t)
	      	.style("opacity", 1);

	}

	drawLine(svg, width, height, line, color){
		
		let gs = svg.select("g#sline").selectAll("g.link").data(line, function(d) { return d; });

		//Enter
		let elemtEnter = gs.enter().append("g").attr("class", "link");

		let t = d3.transition().duration(1000);

		elemtEnter.append("line")
		    .attr("stroke-width", "5px")
    	  	.attr("stroke", color)
    	  	.attr("x1", 150)
		    .attr("y1", (d, i) => {return d[0];})
		    .attr("x2", 150)
		    .attr("y2", (d, i) => {return d[0];})
	      .transition(t)
	      	.attr("y2", (d, i) => {return d[1];})
	}

	send(){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	if(!this.state.email || !re.test(this.state.email)){
    		swal("Invalid Email", "Please check your email address, it seems to be invalid", "warning");
    	} else {
    		swal("Thank You", "We are glad to count you in !", "success");
    		firebase.database().ref("prospects").push({
    			email : this.state.email,
    			date : new Date().getTime()
    		});
    		document.getElementById("get-access-block").style.display = "none";
    		document.getElementById("landing-page-second-section").style.maxWidth = "300px";
    	}
	}

	render() {
		return (
			<div>
				<div id="landing-page-second-section">
					<div ref="getaccessblock" id="get-access-block">
						<div id="gyac">Get your early access</div>
						<input value={this.state.email} onChange={this.changeEmail} type="email" placeholder="Email Address"/>
						<div onClick={this.send} id="i-m-in">I'm in !</div>
					</div>
					<svg id="secondsvg" style={{width:"100%", height:"400px"}}>
						<g id="sline"></g>
						<g id="snodes1"></g>
						<g id="stexts1"></g>
						<g id="stexts2"></g>
						<g id="stexts3"></g>
						<g id="stexts4"></g>
					</svg>
				</div>
				
			</div>
		);
	}
};

class ThirdSection extends React.Component {

	render() {
		return (
			<div>
				<div id="landing-page-third-section">
					<div id="third-line-1" className={this.props.thirdLine1 ? "sel-full-third-line full-third-line" : "full-third-line"} style={{display:"flex"}}>
						<div className="fg0 ls" style={{flexGrow:0}}>
							<div className="value-wrapper">Team</div>
						</div>
						<div className="fg1 rs" style={{flexGrow:1, paddingLeft:'20px', paddingRight:'20px'}}>
							<div style={{fontSize:"22px", letterSpacing:"1px", fontWeight:"bold", marginTop:"5px"}}>Thought out for teams</div>
							<div style={{fontSize:"16px", marginTop:"5px"}}>
								Idea are better grown in teams. 
								Wether you are working in the same room or on opposite emispheres, we will provide the best experience.
							</div>
						</div>
					</div>
					<div id="third-line-2" className={this.props.thirdLine2 ? "sel-full-third-line full-third-line" : "full-third-line"} style={{display:"flex", marginTop:"70px", marginBottom:"70px"}}>
						<div className="fg1 ls" style={{flexGrow:1, paddingLeft:'20px', paddingRight:'20px'}}>
							<div style={{fontSize:"22px", letterSpacing:"1px", textAlign:"right", fontWeight:"bold", marginTop:"15px"}}>Instant visual</div>
							<div style={{fontSize:"16px", marginTop:"5px", textAlign:"right"}}>
								Mouvement is key as most of us are visual first. We made every modification live to ease communication.
							</div>
						</div>
						<div  className="fg0 rs" style={{flexGrow:0}}>
							<div className="value-wrapper">Live</div>
						</div>
					</div>
					<div id="third-line-3" className={this.props.thirdLine3 ? "sel-full-third-line full-third-line" : "full-third-line"} style={{display:"flex"}}>
						<div className="fg0 ls" style={{flexGrow:0}}>
							<div className="value-wrapper">Simple</div>
						</div>
						<div className="fg1 rs" style={{flexGrow:1, paddingLeft:'20px', paddingRight:'20px'}}>
							<div style={{fontSize:"22px", letterSpacing:"1px", fontWeight:"bold", marginTop:"15px"}}>Simplicity is a priority</div>
							<div style={{fontSize:"16px", marginTop:"5px"}}>
								Keep all your brain power for your ideas. We focus on the main features to make it as easy to use as possible.
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

class FourthSection extends React.Component {

	render() {
		return (
			<div style={{backgroundColor:"#2196F3"}}>
				<div id="landing-page-fourth-section">
					<div>
						<div>
							<div style={{fontSize:"22px", letterSpacing:"1px", fontWeight:"bold", marginTop:"5px"}}>Your vision matters</div>
							<div style={{fontSize:"18px", marginTop:"10px"}}>
								Magnesia is based on feedback from Mind Map users. Let us know abour your vision and needs !
							</div>
							<div style={{fontSize:"18px", marginTop:"5px"}}>
								Or just get in touch, we are always keen on having a chat !
							</div>
						</div>
						<div>
							<input type="email" placeholder="email address"/>
							<textarea rows="6" placeholder="Share your vision or get in touch !"></textarea>
							<div id="send">Send</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default LandingPage;