import React from 'react'

import DRAWING from '../properties/demodrawing'
import DEMONODES from '../properties/demonodes'

import RegisterPage from './register';

import Modal from 'boron/DropModal';

class LandingPage extends React.Component {

	constructor(props) {
	    super(props);

	    this.scrollToId = this.scrollToId.bind(this);
	    this.scrollToSecondBlock = this.scrollToSecondBlock.bind(this);
		this.scrollToSecondBlockMobile = this.scrollToSecondBlockMobile.bind(this);
	    this.scrollToThirdBlock = this.scrollToThirdBlock.bind(this);
		this.scrollToFourthBlock = this.scrollToFourthBlock.bind(this);
		this.checkTlInVew = this.checkTlInVew.bind(this);
		this.checkSecondSectionInView = this.checkSecondSectionInView.bind(this);
		this.sendPropsectMail = this.sendPropsectMail.bind(this);
		this.generateAccessCode = this.generateAccessCode.bind(this);
		this.showRegisterModal = this.showRegisterModal.bind(this);
		this.hideRegisterModal = this.hideRegisterModal.bind(this);
		this.showEarlyAccessModal = this.showEarlyAccessModal.bind(this);
		this.hideEarlyAccessModal = this.hideEarlyAccessModal.bind(this);

	    this.state = {
	    	drawDone : false,
	    	thirdLine1 : false,
	    	thirdLine2 : false,
	    	thirdLine3 : false,
	    	autoScroll: false,
	    	showRegisterModal : false,
	    	externalInvite : null,
	    	showEarlyAccessModal : false
	    };
	}

	showRegisterModal(ei){
		ga('send', 'pageview', "/register");
		this.setState({
			showRegisterModal : true,
			externalInvite : ei || null
		});
	}

	hideRegisterModal(){
		ga('send', 'pageview', "/");
		this.setState({
			showRegisterModal : false
		});
	}

	showEarlyAccessModal(){
		ga('send', 'pageview', "/earlyaccess");
		this.setState({
			showEarlyAccessModal : true
		});
	}

	hideEarlyAccessModal(){
		ga('send', 'pageview', "/");
		this.setState({
			showEarlyAccessModal : false
		});
	}

	componentDidMount(){
		//show modal hook
		if(location && location.search && location.search.indexOf("register") !== -1) this.showRegisterModal();
		//external invite
		if(location && location.search && location.search.indexOf("invited=true") !== -1){
			let search = location.search.substring(1);
			let split = search.split("&");
			let ei = {};
			for (var i = 0; i < split.length; i++) {
				let insplit = split[i].split("=");
				ei[insplit[0]] = insplit[1];
			};

			this.showRegisterModal(ei);
		}

		let view = document.getElementById('landing-page');
		let target = document.getElementById('landing-page-second-section');
		let tl1 = document.getElementById('third-line-1');
		let tl2 = document.getElementById('third-line-2');
		this.checkSecondSectionInView(view, target, false);
		this.checkTlInVew(view, tl1, false, "thirdLine1");
		this.checkTlInVew(view, tl2, false, "thirdLine2");
		view.addEventListener('scroll', () => {
			if(!this.state.drawDone) this.checkSecondSectionInView(view, target, true);
			if(!this.state.thirdLine1) this.checkTlInVew(view, tl1, true, "thirdLine1");
			if(!this.state.thirdLine2) this.checkTlInVew(view, tl2, true, "thirdLine2");
		});
	}

	checkTlInVew(view, target, scroll, name){
		var elemTop = target.getBoundingClientRect().top;
	    var elemBottom = target.getBoundingClientRect().bottom;
	    if(elemTop < window.innerHeight && elemBottom >= 0){
	    	var st = this.state;
	    	st.drawDone = true;
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
	    	});
	    }
	}

	scrollToSecondBlock(){
		ga('send', {
			hitType: 'event',
			eventCategory: "landing page",
			eventAction: "scroll to early access",
			eventLabel: ""
		});
		this.setState({autoScroll:true});
 		this.scrollToId("landing-page-second-section");
 		setTimeout(()=>{ this.setState({autoScroll:false}); }, 2000);
	}

	scrollToSecondBlockMobile(){
		ga('send', {
			hitType: 'event',
			eventCategory: "landing page",
			eventAction: "scroll to early access",
			eventLabel: ""
		});
 		this.scrollToId("mob-landing-page-second-section");
	}

	scrollToThirdBlock(){
		ga('send', {
			hitType: 'event',
			eventCategory: "landing page",
			eventAction: "scroll to description section",
			eventLabel: ""
		});
		this.setState({autoScroll:true});
 		//this.scrollToId("landing-page-third-section");
 		this.scrollToId("landing-page-quote-section-sub");
 		setTimeout(()=>{ this.setState({autoScroll:false}); }, 2000);
	}

	scrollToFourthBlock(){
		ga('send', {
			hitType: 'event',
			eventCategory: "landing page",
			eventAction: "scroll to contact",
			eventLabel: ""
		});
		this.setState({autoScroll:true});
 		this.scrollToId("landing-page-fourth-section");
 		setTimeout(()=>{ this.setState({autoScroll:false}); }, 2000);
	}

	scrollToId(id){
		let startY = document.getElementById('landing-page').scrollTop;
 		var stopY = 0;
 		var elm = document.getElementById(id);
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

	generateAccessCode(){
		ga('send', {
			hitType: 'event',
			eventCategory: "landing page",
			eventAction: "generate access code",
			eventLabel: ""
		});
		var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    var len = 10;
	    for(var i=0; i < len; i++ ) text += possible.charAt(Math.floor(Math.random() * possible.length));
	    return text;
	}

	sendPropsectMail(email, code){
		var url = "https://hooks.zapier.com/hooks/catch/1087623/9hib4q";
		var params = "email="+email+"&code="+code;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(params);
	}

	render() {
		return (
			<div id="landing-page" style={{maxWidth:"1440px", marginLeft:"auto", marginRight:"auto", overflow:"auto", height:"100%"}}>
				<RegisterModal externalInvite={this.state.externalInvite} show={this.state.showRegisterModal} showRegisterModal={this.showRegisterModal} hideRegisterModal={this.hideRegisterModal}/>
				<RegisterEarlyAccess sendPropsectMail={this.sendPropsectMail} generateAccessCode={this.generateAccessCode} show={this.state.showEarlyAccessModal} showEarlyAccessModal={this.showEarlyAccessModal} hideEarlyAccessModal={this.hideEarlyAccessModal}/>
				<TopSection 
					showEarlyAccessModal={this.showEarlyAccessModal}
					scrollToSecondBlock={this.scrollToSecondBlock} 
					scrollToSecondBlockMobile={this.scrollToSecondBlockMobile}
					scrollToThirdBlock={this.scrollToThirdBlock}
					scrollToFourthBlock={this.scrollToFourthBlock}/>
				<MockupsSection/>
				<SecondSection generateAccessCode={this.generateAccessCode} sendPropsectMail={this.sendPropsectMail} drawDone={this.state.drawDone}/>
				<QuoteSection/>
				<ThirdSection thirdLine1={this.state.thirdLine1} thirdLine2={this.state.thirdLine2} thirdLine3={this.state.thirdLine3}/>
				<FourthSection generateAccessCode={this.generateAccessCode} sendPropsectMail={this.sendPropsectMail}/>
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
		//this.drawMob();
	}

	draw(){
		let svg = d3.select("#headersvg"),
			width = svg.property("width"),
    		height = svg.property("height");

    	var wd = document.getElementById("landing-page-top-section").offsetWidth;
    	this.drawNodes(svg, wd, 300, DEMONODES.mainNode, 1);
    	setTimeout(()=>{ this.drawNodes(svg, wd, 300, DEMONODES.secondaryNodes, 2); }, 1000);
    	setTimeout(()=>{ this.drawNodes(svg, wd, 300, DEMONODES.tertiaryNodes, 3); }, 2000);

    	setTimeout(()=>{ this.drawLinks(svg, wd, 300, DEMONODES.firstLinks, 1, true); }, 1500);
    	setTimeout(()=>{ this.drawLinks(svg, wd, 300, DEMONODES.secondaryLinks, 2, true); }, 2500);
	}

	drawMob(){
		let svg = d3.select("#mobheadersvg"),
			width = svg.property("width"),
    		height = svg.property("height");

    	var wd = document.getElementById("mob-landing-page-top-section").offsetWidth;
    	this.drawNodes(svg, wd, 200, DEMONODES.mobMainNode, 1);
    	setTimeout(()=>{ this.drawNodes(svg, wd, 200, DEMONODES.mobSecondaryNodes, 2); }, 1000);

    	setTimeout(()=>{ this.drawLinks(svg, wd, 200, DEMONODES.mobFirstLinks, 1, false); }, 1500);
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
    		.attr("fill", DRAWING.defaultCircleFillColor)
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

	drawLinks(svg, width, height, links, nb, isDesktop){
		
		let gs = svg.select("g#links" + nb).selectAll("g.link").data(links, function(d) { return d; });

		//Enter
		let elemtEnter = gs.enter().append("g").attr("class", "link");
		var allNodes = isDesktop ?
			DEMONODES.mainNode.concat(DEMONODES.secondaryNodes).concat(DEMONODES.tertiaryNodes) :
			DEMONODES.mobMainNode.concat(DEMONODES.mobSecondaryNodes) ;

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
				<div id="landing-page-top-section" className="hidden-xs">
					<div onClick={this.props.showEarlyAccessModal} className="purple-bcg" style={{width:"100%", zIndex:"-1", paddingTop:"50px", paddingBottom:"140px"}}>
						<svg id="headersvg" style={{width:"100%", height:"300px"}}>
							<g id="links1"></g>
							<g id="links2"></g>
							<g id="nodes1"></g>
							<g id="nodes2"></g>
							<g id="nodes3"></g>
						</svg>
					</div>
					<div id="lp-header-section">
						Mg.
						<div id="header-rs-wrapper">
							<div onClick={this.props.showEarlyAccessModal}>Early Access</div>
						</div>
					</div>
					<h1 id="lp-header-name">Magnesia</h1>
					<h2 id="lp-header-sub-name"><em>Mind Maps</em> <span style={{fontSize:"20px", marginRight:"5px", marginLeft:"5px"}}>for</span> <em>Creatives</em></h2>
					<div onClick={this.props.showEarlyAccessModal} style={{border:"1px solid white", padding:"10px", letterSpacing:"1px", cursor:"pointer", fontWeight:"100", color:"white", textAlign:"center", marginLeft:"auto", marginRight:"auto", marginBottom:"40px", fontSize:"20px", width : "250px", borderRadius : "4px"}}>
						&#10095; Free Early Access
					</div>
				</div>

				<div id="mob-landing-page-top-section" className="purple-bcg shown-xs">

					<div id="mob-lp-header-section">
						Mg.
					</div>
					<h1 id="mob-lp-header-name">Magnesia</h1>
					<h2 id="mob-lp-header-sub-name"><em>Mind Maps</em> <span style={{fontSize:"20px", marginRight:"5px", marginLeft:"5px"}}>for</span> <em>Creatives</em></h2>

					<div className="mobile-drawing-bcg" style={{height:"140px", paddingTop:"70px"}}>
						<div onClick={this.props.showEarlyAccessModal} style={{border:"1px solid white", padding:"10px", letterSpacing:"1px", cursor:"pointer", fontWeight:"100", color:"white", textAlign:"center", marginLeft:"auto", marginRight:"auto", fontSize:"20px", width : "250px", borderRadius : "4px"}}>
							&#10095; Free Early Access
						</div>
					</div>
				</div>
				
			</div>
		);
	}
};

class MockupsSection extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {};
	}

	render() {
		return (
			<div>
				<div id="landing-page-mockups-section" style={{color: "#424242", marginTop:"30px", marginBottom:"30px"}} className="hidden-xs">
					
					<img className="boxshadow" style={{maxWidth:"60%", marginRight:"auto", marginLeft:"auto", display:"block"}} src="../assets/images/mockup-center.png"/>

					<div style={{display:"flex", marginTop : "50px"}}>
						<div style={{flexGrow:"1"}}>
							<div style={{maxWidth:"300px", paddingLeft:"15px", paddingRight:"15px", marginLeft:"auto", marginRight:"auto"}}>
								<h2 style={{display:"flex"}}>
									<div style={{flexGrow:"0"}}><img style={{width:"40px", marginRight:"5px"}} src="../assets/images/lp-brainstorm.svg"/></div>
									<div style={{flexGrow:"1", fontWeight:"100", paddingTop : "8px"}}>Brainstorm</div>
								</h2>
								<div>
									Magnesia is a safe place for volatile ideas. It was designed to provide developing ideas the environment they deserve.
								</div>
							</div>
						</div>
						<div style={{flexGrow:"1"}}>
							<div style={{maxWidth:"300px", paddingLeft:"15px", paddingRight:"15px", marginLeft:"auto", marginRight:"auto"}}>
								<h2 style={{display:"flex"}}>
									<div style={{flexGrow:"0"}}><img style={{width:"40px", marginRight:"5px"}} src="../assets/images/lp-social.svg"/></div>
									<div style={{flexGrow:"1", fontWeight:"100", paddingTop : "8px"}}>Easy to use</div>
								</h2>
								<div>We are committed to deliver a quick and simple to use tool, allowing to dedicate all focus to emerging ideas.</div>
							</div>
						</div>
						<div style={{flexGrow:"1"}}>
							<div style={{maxWidth:"300px", paddingLeft:"15px", paddingRight:"15px", marginLeft:"auto", marginRight:"auto"}}>
								<h2 style={{display:"flex"}}>
									<div style={{flexGrow:"0"}}><img style={{width:"40px", marginRight:"5px"}} src="../assets/images/lp-brainstorming.svg"/></div>
									<div style={{flexGrow:"1", fontWeight:"100", paddingTop : "8px"}}>Collaborative</div>
								</h2>
								<div>Whether you are lone wolf or playing within a team, Magnesia promotes the sharing of ideas as well as provides a solid structure for further development.</div>
							</div>
						</div>
					</div>
				</div>

				<div id="mob-landing-page-mockups-section" className="shown-xs">
					
					<img className="boxshadow" style={{marginTop: "-50px", maxWidth:"95%", marginRight:"auto", marginLeft:"auto", display:"block"}} src="../assets/images/mockup-center.png"/>

					<div>
						<div style={{marginTop:"60px"}}>
							<div style={{maxWidth:"300px", paddingLeft:"15px", paddingRight:"15px", marginLeft:"auto", marginRight:"auto"}}>
								<h2 style={{display:"flex"}}>
									<div style={{flexGrow:"0"}}><img style={{width:"40px", marginRight:"5px"}} src="../assets/images/lp-brainstorm.svg"/></div>
									<div style={{flexGrow:"1", fontWeight:"100", paddingTop : "8px"}}>Brainstorm</div>
								</h2>
								<div>
									Magnesia is a safe place for volatile ideas. It was designed to provide developing ideas the environment they deserve.
								</div>
							</div>
						</div>
						<div style={{marginTop:"60px"}}>
							<div style={{textAlign:"right", maxWidth:"300px", paddingLeft:"15px", paddingRight:"15px", marginLeft:"auto", marginRight:"auto"}}>
								<h2 style={{display:"flex"}}>
									<div style={{flexGrow:"1", fontWeight:"100", paddingTop : "4px", marginRight:"5px"}}>Easy to use</div>
									<div style={{flexGrow:"0"}}><img style={{width:"40px"}} src="../assets/images/lp-social.svg"/></div>
								</h2>
								<div>We are committed to deliver a quick and simple to use tool, allowing to dedicate all focus to emerging ideas.</div>
							</div>
						</div>
						<div style={{marginTop:"60px", marginBottom:"60px"}}>
							<div style={{maxWidth:"300px", paddingLeft:"15px", paddingRight:"15px", marginLeft:"auto", marginRight:"auto"}}>
								<h2 style={{display:"flex"}}>
									<div style={{flexGrow:"0"}}><img style={{width:"40px", marginRight:"5px"}} src="../assets/images/lp-brainstorming.svg"/></div>
									<div style={{flexGrow:"1", fontWeight:"100", paddingTop : "8px"}}>Collaborative</div>
								</h2>
								<div>Whether you are lone wolf or playing within a team, Magnesia promotes the sharing of ideas as well as provides a solid structure for further development.</div>
							</div>
						</div>
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
	   	this.onKeyUp = this.onKeyUp.bind(this);

	    this.state = {
	    	email : ""
	    };
	}

	changeEmail(e){
		this.setState({email: e.target.value});
	}

	componentDidMount(){
		this.drawMob();
		if(this.props && this.props.drawDone){
			this.draw();
		}
	}

	componentWillReceiveProps(np){
		if(np && np.drawDone){
			this.draw();
		}
	}

	onKeyUp(evt){
	    if(evt && evt.which && evt.which === 13){
	    	this.send();
	    }
	}

	draw(){
		let svg = d3.select("#secondsvg"),
			width = svg.property("width"),
    		height = svg.property("height");

    	var wd = document.getElementById("landing-page-second-section").offsetWidth;
    	//The idea
    	this.drawNodes(svg, wd, 300, [50], 1, "#424242");
    	this.drawText(svg, wd, 300, [{x : 0, y: 20, text:"The Journey Began"}], 1, "#424242");
    	this.drawLine(svg, wd, 300, [[50, 150]], "#424242");
    	//Version 0
    	setTimeout(()=>{ 
    		this.drawNodes(svg, wd, 300, [150], 1, "#424242"); 
    		this.drawText(svg, wd, 300, [{x : 80, y: 155, text:"Closed Beta"}], 2, "#424242");
    		this.drawLine(svg, wd, 300, [[150, 250]], "#424242");
    	}, 500);
    	//Pre launch
    	setTimeout(()=>{
    		this.drawNodes(svg, wd, 300, [250], 1, "#424242");
    		this.drawText(svg, wd, 300, [{x : -80, y: 255, text:"Pre-Launch"}], 3, "#424242");
    		this.drawLine(svg, wd, 300, [[250, 350]], "#BDBDBD");
    	}, 1000);
    	//Release
    	setTimeout(()=>{
    		this.drawNodes(svg, wd, 300, [350], 1, "#BDBDBD");
    		this.drawText(svg, wd, 300, [{x : 0, y: 390, text:"Release"}], 4, "#BDBDBD"); 
    		if(this.refs.getaccessblock) this.refs.getaccessblock.className = "show";
    	}, 1500);
	}

	drawMob(){
		let svg = d3.select("#mob-secondsvg"),
			width = svg.property("width"),
    		height = svg.property("height");

    	var wd = document.getElementById("mob-secondsvg").clientWidth;
    	//The idea
    	this.drawNodes(svg, wd, 300, [50], 1, "#424242", true);
    	this.drawText(svg, wd, 300, [{x : 0, y: 20, text:"The Journey Began"}], 1, "#424242", true);
    	this.drawLine(svg, wd, 300, [[50, 150]], "#424242", true);
    	//Version 0
    	setTimeout(()=>{ 
    		this.drawNodes(svg, wd, 300, [150], 1, "#424242", true); 
    		this.drawText(svg, wd, 300, [{x : 80, y: 155, text:"Closed Beta"}], 2, "#424242", true);
    		this.drawLine(svg, wd, 300, [[150, 250]], "#424242", true);
    	}, 500);
    	//Pre launch
    	setTimeout(()=>{
    		this.drawNodes(svg, wd, 300, [250], 1, "#424242", true);
    		this.drawText(svg, wd, 300, [{x : -80, y: 255, text:"Pre-Launch"}], 3, "#424242", true);
    		this.drawLine(svg, wd, 300, [[250, 350]], "#BDBDBD", true);
    	}, 1000);
    	//Release
    	setTimeout(()=>{
    		this.drawNodes(svg, wd, 300, [350], 1, "#BDBDBD", true);
    		this.drawText(svg, wd, 300, [{x : 0, y: 390, text:"Release"}], 4, "#BDBDBD", true); 
    	}, 1500);
	}

	drawText(svg, width, height, texts, nb, color, isMobile){

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
	        .attr("font-size", isMobile ? "16px" : "20px")
	        .attr("dx", function(d, i) {return (isMobile ? width/2 : 150) + d.x})
	        .attr("dy", function(d, i) {return d.y})
	        .text((d, i) => {return d.text;})
	        .style("opacity", 0)
	      .transition(t)
	      	.style("opacity", 1);
	}

	drawNodes(svg, width, height, node, nb, color, isMobile){
		
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
		    .attr("cx", function(d, i) {return (isMobile ? width/2 : 150)})
		    .style("opacity", 0)
	      .transition(t)
	      	.style("opacity", 1);

	}

	drawLine(svg, width, height, line, color, isMobile){
		
		let gs = svg.select("g#sline").selectAll("g.link").data(line, function(d) { return d; });

		//Enter
		let elemtEnter = gs.enter().append("g").attr("class", "link");

		let t = d3.transition().duration(1000);

		elemtEnter.append("line")
		    .attr("stroke-width", "5px")
    	  	.attr("stroke", color)
    	  	.attr("x1", (isMobile ? width/2 : 150))
		    .attr("y1", (d, i) => {return d[0];})
		    .attr("x2", (isMobile ? width/2 : 150))
		    .attr("y2", (d, i) => {return d[0];})
	      .transition(t)
	      	.attr("y2", (d, i) => {return d[1];})
	}

	send(){
		ga('send', {
			hitType: 'event',
			eventCategory: "landing page",
			eventAction: "clicked on I'm in",
			eventLabel: ""
		});
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	if(!this.state.email || !re.test(this.state.email)){
    		swal("Invalid Email", "Please check your email address, it seems to be invalid", "warning");
    	} else {
    		swal("Thank You", "We are glad to count you in !", "success");
    		var code = this.props.generateAccessCode();
    		firebase.database().ref("prospects").push({
    			email : this.state.email,
    			date : new Date().getTime(),
    			code : code
    		});
    		this.props.sendPropsectMail(this.state.email, code);
    		document.getElementById("get-access-block").style.display = "none";
    		document.getElementById("landing-page-second-section").style.maxWidth = "300px";
    	}
	}

	render() {
		return (
			<div>
				<div id="landing-page-second-section" className="hidden-xs">
					<div ref="getaccessblock" id="get-access-block">
						<div id="gyac">Get your early access</div>
						<input onKeyUp={this.onKeyUp} value={this.state.email} onChange={this.changeEmail} type="email" placeholder="Email Address"/>
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

				<div id="mob-landing-page-second-section" className="shown-xs">
					<svg id="mob-secondsvg" style={{width:"100%", height:"400px"}}>
						<g id="sline"></g>
						<g id="snodes1"></g>
						<g id="stexts1"></g>
						<g id="stexts2"></g>
						<g id="stexts3"></g>
						<g id="stexts4"></g>
					</svg>
					<div ref="getaccessblock-2" id="mob-get-access-block">
						<div id="mob-gyac">Get your early access</div>
						<input onKeyUp={this.onKeyUp} value={this.state.email} onChange={this.changeEmail} type="email" placeholder="Email Address"/>
						<div onClick={this.send} id="mob-i-m-in">I'm in !</div>
					</div>
				</div>
				
			</div>
		);
	}
};

class ThirdSection extends React.Component {

	render() {
		return (
			<div>
				<div id="landing-page-third-section" className="hidden-xs">
					<div id="third-line-1" className={this.props.thirdLine1 ? "sel-full-third-line full-third-line" : "full-third-line"} style={{display:"flex"}}>
						<div className="fg1 rs" style={{flexGrow:1, paddingLeft:'20px', paddingRight:'20px', borderLeft : "solid 4px #2196F3"}}>
							<h2 style={{fontSize:"22px", letterSpacing:"1px", fontWeight:"bold", marginTop:"5px", marginBottom:"5px"}}>Mind Maps ?</h2>
							<div style={{fontSize:"16px", marginTop:"5px"}}>
								A <em>Mind Map</em> is a visual representation of an idea or a concept. It is based on the human tendency to structure thoughts visually. Free your mind from any unnecessary workload and give full expression to your creativity !
							</div>
						</div>
					</div>
					<div id="third-line-2" className={this.props.thirdLine2 ? "sel-full-third-line full-third-line" : "full-third-line"} style={{display:"flex", marginTop:"70px", marginBottom:"70px"}}>
						<div className="fg1 ls" style={{flexGrow:1, paddingLeft:'20px', paddingRight:'20px', borderRight : "solid 4px #2196F3"}}>
							<h2 style={{fontSize:"22px", letterSpacing:"1px", textAlign:"right", fontWeight:"bold", marginTop:"15px", marginBottom:"5px"}}>Why <em>"Magnesia"</em> ?</h2>
							<div style={{fontSize:"16px", marginTop:"5px", textAlign:"right"}}>
								Magnesia is an fictional and ideal city-state depicted in <em>Plato's Laws</em>. It represents the state of <em>"Tabula Rasa"</em>, which allows the creation of an ideal without restriction. The blank sheet for a new Mind Map is the best foundation for brilliant ideas !
							</div>
						</div>
					</div>
				</div>

				<div id="mob-landing-page-third-section" className="shown-xs">
					<div id="mob-third-line-1" className={this.props.thirdLine1 ? "sel-full-third-line full-third-line" : "full-third-line"} style={{display:"flex"}}>
						<div className="fg1 rs" style={{flexGrow:1, paddingLeft:'20px', paddingRight:'20px', borderLeft : "solid 4px #2196F3"}}>
							<h2 style={{fontSize:"22px", letterSpacing:"1px", fontWeight:"bold", marginTop:"5px", marginBottom:"5px"}}>Mind Maps ?</h2>
							<div style={{fontSize:"16px", marginTop:"5px"}}>
								A <em>Mind Map</em> is a visual representation of an idea or a concept. It is based on the human tendency to structure thoughts visually. Free your mind from any unnecessary workload and give full expression to your creativity !
							</div>
						</div>
					</div>
					<div id="mob-third-line-2" className={this.props.thirdLine2 ? "sel-full-third-line full-third-line" : "full-third-line"} style={{display:"flex", marginTop:"70px", marginBottom:"0px"}}>
						<div className="fg1 ls" style={{flexGrow:1, paddingLeft:'20px', paddingRight:'20px', borderRight : "solid 4px #2196F3"}}>
							<h2 style={{fontSize:"22px", letterSpacing:"1px", textAlign:"right", fontWeight:"bold", marginTop:"15px", marginBottom:"5px"}}>Why <em>"Magnesia"</em> ?</h2>
							<div style={{fontSize:"16px", marginTop:"5px", textAlign:"right"}}>
								Magnesia is an fictional and ideal city-state depicted in <em>Plato's Laws</em>. It represents the state of <em>"Tabula Rasa"</em>, which allows the creation of an ideal without restriction. The blank sheet for a new Mind Map is the best foundation for brilliant ideas !
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

class FourthSection extends React.Component {

	constructor(props) {
	    super(props);
	   	this.changeEmail = this.changeEmail.bind(this);
	   	this.changeText = this.changeText.bind(this);
	   	this.onKeyUp = this.onKeyUp.bind(this);
	   	this.send = this.send.bind(this);

	    this.state = {
	    	email : "",
	    	text : ""
	    };
	}

	changeEmail(e){
		this.setState({email: e.target.value});
	}

	changeText(e){
		this.setState({text: e.target.value});
	}

	send(){
		ga('send', {
			hitType: 'event',
			eventCategory: "landing page",
			eventAction: "clicked on 'send'",
			eventLabel: ""
		});
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	if(!this.state.email || !re.test(this.state.email)){
    		swal("Invalid Email", "Please check your email address, it seems to be invalid", "warning");
    	} else {
    		swal("Thank You", "We are glad to count you in !", "success");
    		var code = this.props.generateAccessCode();
    		firebase.database().ref("prospects").push({
    			email : this.state.email,
    			date : new Date().getTime(),
    			text : this.state.text,
    			code : code
    		});
    		this.props.sendPropsectMail(this.state.email, code);
    		this.setState({
    			email : "",
				text : ""
    		});
    	}
	}

	onKeyUp(evt){
	    if(evt && evt.which && evt.which === 13){
	    	this.send();
	    }
	}

	render() {
		return (
			<div style={{backgroundColor:"#2196F3"}}>
				<div id="landing-page-fourth-section" className="hidden-xs">
					<div>
						<div>
							<div style={{fontSize:"22px", letterSpacing:"1px", fontWeight:"bold", marginTop:"5px"}}>Your vision matters</div>
							<div style={{fontSize:"18px", marginTop:"10px"}}>
								Magnesia is based on feedback from users. Let us know abour your own vision and needs !
							</div>
							<div style={{fontSize:"18px", marginTop:"5px"}}>
								Alternatively just get in touch, we are always keen on having a chat !
							</div>
						</div>
						<div>
							<input ref="inp" onKeyUp={this.onKeyUp} value={this.state.email} onChange={this.changeEmail} type="email" placeholder="Email Address"/>
							<textarea ref="texta" value={this.state.text} onChange={this.changeText} rows="6" placeholder="Share your vision or get in touch !"></textarea>
							<div onClick={this.send} id="send">Send</div>
						</div>
					</div>
				</div>
				<div id="mob-landing-page-fourth-section" className="shown-xs">
					<div>
						<div>
							<div style={{fontSize:"22px", letterSpacing:"1px", fontWeight:"bold", marginTop:"5px"}}>Your vision matters</div>
							<div style={{fontSize:"16px", marginTop:"10px"}}>
								Magnesia is based on feedback from users. Let us know abour your own vision and needs !
							</div>
							<div style={{fontSize:"16px", marginTop:"5px"}}>
								Alternatively just get in touch, we are always keen on having a chat !
							</div>
						</div>
						<div>
							<input ref="inp" onKeyUp={this.onKeyUp} value={this.state.email} onChange={this.changeEmail} type="email" placeholder="Email Address"/>
							<textarea ref="texta" value={this.state.text} onChange={this.changeText} rows="6" placeholder="Share your vision or get in touch !"></textarea>
							<div onClick={this.send} id="send">Send</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

class QuoteSection extends React.Component {

	render() {
		return (
			<div>
				<div id="landing-page-quote-section" className="hidden-xs" style={{textAlign:"center", paddingTop:"70px", paddingBottom:"60px"}}>
					<div id="landing-page-quote-section-sub" style={{color:"#424242", letterSpacing:".5px",fontSize:"23px", marginBottom:"10px"}}>"Mind Maps are the Meta-language of the human race"</div>
					<div style={{color:"#424242", fontSize:"18px"}}> -Tony Buzan</div>
				</div>

				<div id="mob-landing-page-quote-section" className="shown-xs" style={{textAlign:"center", paddingTop:"30px", paddingBottom:"40px"}}>
					<div id="landing-page-quote-section-sub" style={{color:"#424242", letterSpacing:".5px",fontSize:"18px", marginBottom:"10px"}}>"Mind Maps are the Meta-language of the human race"</div>
					<div style={{color:"#424242", fontSize:"14px"}}> -Tony Buzan</div>
				</div>
			</div>
		);
	}
};

class RegisterModal extends React.Component {

	constructor(props) {
	    super(props);
	   	this.showModal = this.showModal.bind(this);
	   	this.hideModal = this.hideModal.bind(this);

	    this.state = {
	    	email : ""
	    };
	}

	componentWillReceiveProps(np){
		if(np && np.show && !this.props.show){
			this.showModal();
		} else if(!np.show && this.props.show){
			this.hideModal();
		}
	}
    
    showModal(){
        this.refs.modal.show();
    }

    hideModal(){
        this.refs.modal.hide();
    }

    render() {
        return (
            <div>
                <Modal ref="modal" onHide={this.props.hideRegisterModal}>
                    <RegisterPage externalInvite={this.props.externalInvite}/>
                </Modal>
            </div>
        );
    }
};

class RegisterEarlyAccess extends React.Component {

	constructor(props) {
	    super(props);
	   	this.showModal = this.showModal.bind(this);
	   	this.hideModal = this.hideModal.bind(this);
	   	this.isMailValid = this.isMailValid.bind(this);
		this.changeEmail = this.changeEmail.bind(this);
		this.send = this.send.bind(this);
	    this.state = {
	    	email : "",
	    	validEmail : false
	    };
	}

	componentWillReceiveProps(np){
		if(np && np.show && !this.props.show){
			this.showModal();
		} else if(!np.show && this.props.show){
			this.hideModal();
		}
	}
    
    showModal(){
        this.refs.modal.show();
    }

    hideModal(){
        this.refs.modal.hide();
    }

    isMailValid(email){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

    changeEmail (){
		
    	var email = this.refs.email.value;
    	var validEmail = email && this.isMailValid(email);
		this.setState((prevState) => ({
	      email: this.refs.email.value,
	      validEmail: validEmail
	    }));
	    // if(validEmail){
    	// 	firebase.database().ref('emails/' + EncodeServices.encode(email)).once("value", (snap) => {
    	// 		this.setState((prevState) => ({
			  //     mailTaken : !!snap.val()
			  //   }));
    	// 	}, (error) => {
    	// 		console.log("error", error);
    	// 	});
	    // }
	}

	send(){
		ga('send', {
			hitType: 'event',
			eventCategory: "early access modal page",
			eventAction: "clicked on free early access",
			eventLabel: ""
		});
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	if(this.state.email && this.state.validEmail){
    		var code = this.props.generateAccessCode();
    		firebase.database().ref("prospects").push({
    			email : this.state.email,
    			date : new Date().getTime(),
    			code : code
    		});
    		this.props.sendPropsectMail(this.state.email, code);
    		this.props.hideEarlyAccessModal();
    		swal("Thank You", "We are glad to count you in !", "success");
    	}
	}

	componentDidUpdate(){
		if(this.props.show && !this.state.tippy){
			this.setState({
				tippy : true
			}, ()=>{
				new Tippy('.tippyearlyaccess', {
				    position: 'bottom',
				    animation: 'shift',
				    duration: 200,
				    arrow: true
				})
				this.refs.email.focus();
			});
		}
	}

    render() {
        return (
            <div id="early-access-modal-wrapper">
                <Modal ref="modal" onHide={this.props.hideEarlyAccessModal}>
                	<div style={{color:"#424242"}}>
	                	<h2 style={{textAlign:"center", paddingTop: "30px", paddingBottom: "30px"}}>Get Free Early Access</h2>
	                	<p style={{paddingLeft:"50px", paddingRight:"50px"}}>Join us now and get an early access to Magnesia as well as a month as a premium user !</p>,

	                	<div style={{width:"195px", marginLeft: "auto", marginRight:"auto"}}>
		                	<img style={{verticalAlign:"middle", maxWidth:"50px", marginRight:"auto", marginLeft:"auto", display:"inline-block"}} src="../assets/images/eac-hourglass.svg"/>
		                	<div style={{verticalAlign:"middle", display : "inline-block", fontSize:"25px", marginLeft:"40px", marginRight:"40px"}}>+</div>
		                	<img style={{verticalAlign:"middle", maxWidth:"50px", marginRight:"auto", marginLeft:"auto", display:"inline-block"}} src="../assets/images/eac-diamond.svg"/>
	                	</div>
	                	<div style={{width:"265px", marginLeft: "auto", marginRight:"auto", fontSize:"14px", marginTop : "10px", marginBottom : "20px"}}>
	                		<div style={{textAlign:"center", verticalAlign:"middle", width : "50%", display:"inline-block"}}>Early Access</div>
	                		<div style={{textAlign:"center", verticalAlign:"middle", width : "50%", display:"inline-block"}}>Premium Month</div>
	                	</div>
	                	
	                    <input className={"reg-inp " + (this.state.validEmail ? "validated" : "")} ref="email" type="email" value={this.state.email} onChange={this.changeEmail} placeholder="Email Address"/>
	                    <div className="eam-email-wrapper">
	                    	<div style={{color:"#9C27B0", fontSize:"13px", marginTop: "-55px", marginRight: "30px", float:"right", display : (this.state.validEmail ? "block" : "none")}}>
	                    		<span className="eam-email-wrapper-inner">valid email</span> &#10004;
	                    	</div>
	                    	<div style={{fontSize:"13px", marginTop: "-55px", marginRight: "30px", float:"right", display : (this.state.validEmail ? "none" : "block")}}>
	                    		<span className="eam-email-wrapper-inner">invalid email</span> &#10005;
	                    	</div>
	                    </div>
	                    <div onClick={this.send}>
		                    <div title="Please enter a valid email address" className="tippyearlyaccess disabled-fac-button" onClick={this.props.showEarlyAccessModal} style={{display:(this.state.validEmail ? "none" : "block"), border:"1px solid #9C27B0", padding:"10px", letterSpacing:"1px", cursor:"pointer", fontWeight:"100", color:"#9C27B0", textAlign:"center", marginLeft:"auto", marginRight:"auto", marginBottom:"50px", fontSize:"16px", width : "250px", borderRadius : "4px"}}>
								&#10095; Free Early Access
							</div>
							<div title="Claim your early acces code !" className="tippyearlyaccess" onClick={this.props.showEarlyAccessModal} style={{display:(this.state.validEmail ? "block" : "none"), border:"1px solid #9C27B0", padding:"10px", letterSpacing:"1px", cursor:"pointer", fontWeight:"100", color:"#9C27B0", textAlign:"center", marginLeft:"auto", marginRight:"auto", marginBottom:"50px", fontSize:"16px", width : "250px", borderRadius : "4px"}}>
								&#10095; Free Early Access
							</div>
						</div>
                    </div>
                </Modal>
            </div>
        );
    }
};

export default LandingPage;