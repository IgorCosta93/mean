//Importing the driver needed to make the connection
var MongoClient = require('mongodb').MongoClient;

//url first the protocol, second server,third port,finally DB name
var durl = 'mongodb://localhost:27017/meanhotel';

var _connection = null;
var open = function(){
    MongoClient.connect(durl, function(err,db){
        if(err){
            console.log('DB connection failed');
            return;
        }
        _connection = db;
        console.log("DB conection open", db);
    });
};

var get = function(){
    return _connection;
};

module.exports = {
    open : open,
    get : get
};
