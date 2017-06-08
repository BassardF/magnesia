import React from 'react'
import Modal from 'boron/DropModal';

class PlansModal extends React.Component {

	constructor(props) {
	    super(props);
	   	this.showModal = this.showModal.bind(this);
	   	this.hideModal = this.hideModal.bind(this);
	    
	    this.state = {
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

	componentDidMount(){
		new Tippy('.tippyPlansModal', {
		    position: 'bottom',
		    animation: 'shift',
		    duration: 200,
		    arrow: true
		})
	}

    render() {
    	let rights = this.props.user ? this.props.user.rights : 0;
        return (
            <div id="early-access-modal-wrapper">
                <Modal ref="modal" onHide={this.props.hideModal}>
                	<h2 style={{textAlign: "center", paddingTop: "20px", paddingBottom: "15px"}}>
            			<span style={{fontWeight:"200"}}>Current plan : </span> <span className="purple">{this.props.user ? this.props.user.getPlan() : ""}</span>
                	</h2>
                	<div>
                		<div style={{verticalAlign:"top", width:"33%", display:"inline-block", flexGrow:1, textAlign:"center"}}>
                			<div style={{paddingLeft : "10px", paddingRight : "10px"}}>
	                			<h3 style={{marginTop:"10px", marginBottom:"10px", textAlign:"left", fontWeight:"200"}}>Starter</h3>
	                			<div style={{marginTop:"-45px", float:"right", marginRight: "auto", width:"50px", height : "50px", borderRadius : "50px", backgroundColor : "#F3E5F5"}}>
	            					<img style={{marginTop:"10px", width: "30px", height : "30px"}} src="../assets/images/view-white.svg" />
	            				</div>
	                			<div style={{borderTop : "solid 3px #F3E5F5"}}>
		                			<div style={{marginTop:"20px", marginBottom:"20px"}}>
		                				<span style={{fontWeight:"100", fontSize:"30px"}}>Free</span>
		                			</div>
		                			<div>
		                				<div className={"purple " + ( rights == 0 ? "disabled-button" : "pointer")} style={{marginBottom:"10px", backgroundColor:"#9C27B0", borderRadius :"4px", padding:"5px", fontSize:"14px", color : "white"}}>
		                					{rights == 0 ? "Current" : "Select"}
		                				</div>
		                			</div>
		                			<div>
			                			<div style={{marginBottom:"15px", fontSize: "14px"}}><b>3</b> maps</div>
		                			</div>
	                			</div>
                			</div>
                		</div>
                		<div style={{verticalAlign:"top", width:"33%", display:"inline-block", flexGrow:1, textAlign:"center"}}>
                			<div style={{paddingLeft : "10px", paddingRight : "10px"}}>
                			<h3 style={{marginTop:"10px", marginBottom:"10px", textAlign:"left", fontWeight:"200"}}>Standard</h3>
	                			<div style={{marginTop:"-45px", float:"right", marginRight: "auto", width:"50px", height : "50px", borderRadius : "50px", backgroundColor : "#CE93D8"}}>
	            					<img style={{marginTop:"10px", width: "30px", height : "30px"}} src="../assets/images/quality-badge-white.svg" />
	            				</div>
	                			<div style={{borderTop : "solid 3px #CE93D8"}}>
		                			<div style={{marginTop:"20px", marginBottom:"20px"}}>
		                				<span style={{fontWeight:"100", fontSize:"30px"}}>$10</span> / mo
		                			</div>
		                			<div>
		                				<div className={"purple " + ( rights == 1 ? "disabled-button" : "pointer")} style={{marginBottom:"10px", backgroundColor:"#9C27B0", borderRadius :"4px", padding:"5px", fontSize:"14px", color : "white"}}>
		                					{rights == 1 ? "Current" : "Select"}
		                				</div>
		                			</div>
		                			<div>
			                			<div style={{marginBottom:"15px", fontSize: "14px"}}><b>unlimited</b> maps</div>
			                			<div style={{marginBottom:"15px", fontSize: "14px"}}><b>3 invites</b> p.m.</div>
		                			</div>
	                			</div>
                			</div>
                		</div>
                		<div style={{verticalAlign:"top", width:"33%", display:"inline-block", flexGrow:1, textAlign:"center"}}>
                			<div style={{paddingLeft : "10px", paddingRight : "10px"}}>
                			<h3 style={{marginTop:"10px", marginBottom:"10px", textAlign:"left", fontWeight:"200"}}>Ultimate</h3>
	                			<div style={{marginTop:"-45px", float:"right", marginRight: "auto", width:"50px", height : "50px", borderRadius : "50px", backgroundColor : "#9C27B0"}}>
	            					<img style={{marginTop:"10px", width: "30px", height : "30px"}} src="../assets/images/eac-diamond-white.svg" />
	            				</div>
	                			<div style={{borderTop : "solid 3px #9C27B0"}}>
		                			<div style={{marginTop:"20px", marginBottom:"20px"}}>
		                				<span style={{fontWeight:"100", fontSize:"30px"}}>$25</span> / mo
		                			</div>
		                			<div>
		                				<div className={"purple " + ( rights == 2 ? "disabled-button" : "pointer")} style={{marginBottom:"10px", backgroundColor:"#9C27B0", borderRadius :"4px", padding:"5px", fontSize:"14px", color : "white"}}>
		                					{rights == 2 ? "Current" : "Select"}
		                				</div>
		                			</div>
		                			<div>
			                			<div style={{marginBottom:"15px", fontSize: "14px"}}><b>unlimited</b> maps</div>
			                			<div style={{marginBottom:"15px", fontSize: "14px"}}><b>unlimited invites</b> p.m.</div>
		                			</div>
	                			</div>
                			</div>
                		</div>
                	</div>
                	<div style={{textAlign:"center", fontSize: "14px", marginBottom:"10px", marginTop:"10px"}}>
                		<div>Any problem, question or suggestion ?</div>
                		<div><a className="purple" href="mailto:f.bassard@gmail.com">Contact</a> me directly</div>
                	</div>
                </Modal>
            </div>
        );
    }
};

export default PlansModal;