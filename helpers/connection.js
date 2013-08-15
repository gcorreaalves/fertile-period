ConnectionHelper = function(db, host, port){
	this.host = host;
	this.port = port;
	this.db   = db;

	var Db 		= require('mongodb').Db,
	Connection 	= require('mongodb').Connection,
	Server 		= require('mongodb').Server,
	BSON 		= require('mongodb').BSON,
	ObjectID 	= require('mongodb').ObjectID;

	return new Db(this.db, new Server(this.host, this.port, {auto_reconnect: true}, {}));
}

exports.ConnectionHelper = ConnectionHelper;


