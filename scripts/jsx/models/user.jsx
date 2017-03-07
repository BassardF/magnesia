class User {
  
  constructor(data) {
    if(data){
      for(var key in data){
        this[key] = data[key];
      }
    }
  }

}

export default User;