//In question of better performace is better open the connection
//here so you don't need to open and close every other
//place because if don't do that you can have problems
//because of the latence some times
require('./api/data/dbconnection.js').open();

var express = require('express');
var app = express();
//used to get a file path
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');

//app.set allows to set a value to a variable
app.set('port', 3000);
//used to listen to a port in the server
//app.get reciver a value set

//middleware alows interactons in the middle process
//If i want to show only CSS req for exempla i can do
//app.use('/css',function(req,res,next))
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});

//when we use this function we eliminate the need of
//routen pages like we have done before
//because everytime we solicitate a file he will first
//look into the public folder to find a match
app.use(express.static(path.join(__dirname,'public')));

//Deals with the post methods
//Extended false say that we are going to use only strings and arrays
//if is true we can access others kinds of data
// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

//alows us to use the server properties
var server = app.listen(app.get('port'),function(){
    //extract the server port
    var port = server.address().port;
    console.log('Server running on port '+ port);
});
