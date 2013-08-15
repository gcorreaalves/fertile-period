var userCounter = 1;

UserController = function(){};

UserController.prototype.findAll = function(){

};

UserController.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
};

UserController.prototype.addUser = function(user, callback){
  
  console.log(user);

  callback(null, user);

  //this.save(user, "add", callback(null, user));
}

UserController.prototype.editUser = function(id, callback){
  
  var user = this.findById(id);

  this.save(user, "edit", callback(null, user));

}

UserController.prototype.removeUser = function(id, callback){



}

UserController.prototype.save = function(user, action, callback) {
  
  var user = null;

  if( typeof(users.length)=="undefined")
    users = [users];

  for( var i =0;i< users.length;i++ ) {
    user = users[i];
    user._id = userCounter++;
    user.created_at = new Date();

    if( user.comments === undefined )
      user.comments = [];

    for(var j =0;j< user.comments.length; j++) {
      user.comments[j].created_at = new Date();
    }
    this.dummyData[this.dummyData.length]= user;
  }
  callback(null, users);
};

exports.UserController = UserController;