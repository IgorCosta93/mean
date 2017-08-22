var hotelData = require('../data/hotel-data.json');
var testeData = require('../data/teste.json');
var dbconn = require('../data/dbconnection.js');
//requisitar o driver do objectID so that we can treated
//the ID to recover One object at time
var ObjectId = require('mongodb').ObjectId;

module.exports.hotelsGetAll = function(req,res){

        var db = dbconn.get();
        var collection = db.collection('hotels');

        //hotelId
        var offset = 0;
        //Number of hotels that appear on the screen
        var count = 5;

        if (req.query && req.query.offset){
            offset = parseInt(req.query.offset, 10);
        }

        if (req.query && req.query.count){
            count = parseInt(req.query.count, 10);
        }

        //This will return a cursor object that is not treated
        //let make a function with callback
        //var docs = collection.find();
        collection
            .find()
            //number of documents we will skip
            .skip(offset)
            //limit of docs we will show
            .limit(count)
            //Now with a callback method we can retrevi the dt
            .toArray(function(err, docs){
                console.log("Found hotels.", docs);
                res
                    .status(200)
                    .json(docs);
            });

        /*console.log("db ", db);

        console.log("GET the hotels");

        //Working with pagination
        console.log(req.query);

        var returnData = hotelData.slice(offset,offset+count);

        res
            .status(200)
            .json(returnData); */
};

module.exports.hotelsGetOne = function(req,res){
    var db = dbconn.get();
    var collection = db.collection('hotels');

    var hotelId = req.params.hotelId;
    //var thisHotel = hotelData[hotelId];
    console.log("GET hotelId", hotelId);

    collection
        .findOne({
            //first i pass the fild i am looking for
            _id : ObjectId(hotelId)
        }, function(err,doc){
            res
                .status(200)
                .json(doc);
        });
};

module.exports.hotelsAddOne = function(req, res) {
    var db = dbconn.get();
    var collection = db.collection('hotels');
    var newHotel;

    console.log("POST new hotel");

    if (req.body && req.body.name && req.body.stars){
        newHotel = req.body;
        //Converting the string to a Int
        newHotel.stars = parseInt(req.body.stars, 10);
        //This is were we recover the information POST
        //treated by the middleware
        //console.log(req.body);

        //function to insert in mongodb
        //first the data and second a function callback
        collection.insertOne(newHotel, function(err,response){
            //console.log(newHotel)
            //ops allows us to see the data insert into mongodb
            console.log(response.ops);
            res
                .status(201)
                //.json(req.body);
                .json(response.ops);
        });
    }else {
        console.log("Data missing from body");
        res
            .status(400)
            .json({"message":"Required data missing from body"});
    }
};

module.exports.hotelsTeste = function(req,res){
        var nameId = req.params.nameId;
        var thisname = testeData[nameId];
        var name = thisname["Nome"];
        console.log("GET nameId", nameId);
        res
            .status(200)
            .json(name);
};
