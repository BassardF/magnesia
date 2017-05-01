class Message {
  
  constructor(data, mid) {
	if(mid) this.mid = mid;
		if(data){
			for(var key in data){
				this[key] = data[key];
			}
		}
	}

  

}

export default Message;