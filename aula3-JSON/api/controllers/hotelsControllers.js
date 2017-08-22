var testeData = require('../data/teste.json');

//This is only used with the native Mongo Drivers not mongoose
    //var hotelData = require('../data/hotel-data.json');
    //var dbconn = require('../data/dbconnection.js');

    //requisitar o driver do objectID so that we can treated
    //the ID to recover One object at time
    //var ObjectId = require('mongodb').ObjectId;

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req,res){
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    // A geoJSON point
    var point = {
        type : "Point",
        coordinates : [lng,lat]
    };

    var geoOptions = {
        spherical : true,
        maxDistance : 2000,
        num : 5
    };

    Hotel
        .geoNear(point, geoOptions, function(err, results,stats){
            console.log('Geo results', results);
            console.log('Geo stats', stats);
            var response = {
                status : 200,
                message : results
            };
            if (err){
                console.log("Error finding Hotel by location.");
                response.status = 500;
                response.message = err;
            }else if (!results){
                response.status = 404;
                response.message = {
                "message" : "Hotel not Found"
            };
        }
        res
            .status(response.status)
            .json(response.message);
        });
};

module.exports.hotelsGetAll = function(req,res){

            //var db = dbconn.get();
            //var collection = db.collection('hotels');

        //hotelId
        var offset = 0;
        //Number of hotels that appear on the screen
        var count = 5;
        //This help if someone try to request a high number and break the server
        var maxCount = 10;

        if (req.query && req.query.lat && req.query.lng){
            runGeoQuery(req,res);
            return;
        }

        if (req.query && req.query.offset){
            offset = parseInt(req.query.offset, 10);
        }

        if (req.query && req.query.count){
            count = parseInt(req.query.count, 10);
        }

        if (isNaN(offset) || isNaN(count)){
            res
                .status(400)
                .json({
                    "message" : "If supplied querystring count or offset should be numbers"
                });
            return;
        };

        if (count > maxCount){
            res
                .status(400)
                .json({
                    "message" : "Count limit of " + maxCount + " exceeded"
                });
            return;
        }

        Hotel
            .find()
            .skip(offset)
            .limit(count)
            .exec(function(err,hotels){
                if (err){
                    console.log("Error finding hotels");
                    res
                        // 500 error of server
                        .status(500)
                        .json(err);
                }else {

                    console.log("Found Hotels", hotels.length);
                    res
                        .json(hotels);
                }
            });

            //This will return a cursor object that is not treated
            //let make a function with callback
            //var docs = collection.find();
            //collection
            //    .find()
            //    //number of documents we will skip
            //    .skip(offset)
                //limit of docs we will show
            //    .limit(count)
                //Now with a callback method we can retrevi the dt
            //    .toArray(function(err, docs){
            //        console.log("Found hotels.", docs);
            //        res
            //            .status(200)
            //            .json(docs);
            //    });

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
        //var db = dbconn.get();
        //var collection = db.collection('hotels');

    var hotelId = req.params.hotelId;
    //var thisHotel = hotelData[hotelId];
    console.log("GET hotelId", hotelId);

    //collection
    Hotel
            //.findOne({
                //first i pass the fild i am looking for
                //_id : ObjectId(hotelId)
                //}, function(err,doc){
        .findById(hotelId)
        .exec(function(err,doc){
            var response = {
                status : 200,
                message : doc
            };
            if (err){
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            }else if (!doc){
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);
        });
};

//This is used to create a empty array
var _splitArray = function(input){
    var output;
    if (input && input.length > 0){
        output = input.split(";");
    }else{
        output = [];
    }
    return output;
};

module.exports.hotelsAddOne = function(req, res) {

    Hotel
        //This method expects two parameters
        //firts the array with the information
        //second a function callback
        .create({
            name : req.body.name,
            description : req.body.description,
            stars : parseInt(req.body.stars,10),
            services : _splitArray(req.body.services),
            photos : _splitArray(req.body.photos),
            currency : req.body.currency,
            location : {
                address : req.body.address,
                coordinates : [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
            }
        }, function(err,hotel){
            if (err){
                console.log("Error creating hotel");
                res
                    .status(400)
                    .json(err);
            }else{
                console.log("Hotel created", hotel);
                res
                    .status(201)
                    .json(hotel);
            }
        });
};

module.exports.hotelUpdateOne = function(req,res){
    var hotelId = req.params.hotelId;
    //var thisHotel = hotelData[hotelId];
    console.log("GET hotelId", hotelId);

    //collection
    Hotel
            //.findOne({
                //first i pass the fild i am looking for
                //_id : ObjectId(hotelId)
                //}, function(err,doc){
        .findById(hotelId)
        //will eliminate this fields from the result
        .select("-reviews -rooms")
        .exec(function(err,doc){
            var response = {
                status : 200,
                message : doc
            };
            if (err){
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            }else if (!doc){
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found"
                };
            }
            if (response.status !== 200){
                res
                    .status(response.status)
                    .json(response.message);
            }else {
                doc.name = req.body.name;
                doc.description = req.body.description;
                doc.stars = parseInt(req.body.stars,10);
                doc.services = _splitArray(req.body.services);
                doc.photos = _splitArray(req.body.photos);
                doc.currency = req.body.currency;
                doc.location = {
                    address : req.body.address,
                    coordinates : [
                        parseFloat(req.body.lng),
                        parseFloat(req.body.lat)
                    ]
                };

            doc.save(function(err,hotelUpdate){
                if (err){
                    res
                        .status(500)
                        .json(err);
                }else {
                    res
                        .status(204)
                        .json()
                }
            });

            }
        });
};

module.exports.hotelDeleteOne = function(req,res){
    var hotelId = req.params.hotelId;

    Hotel
        .findByIdAndRemove(hotelId)
        .exec(function(err, hotel){
            if (err){
                res
                    .status(404)
                    .json(err)
            }else{
                console.log("Hotel deleted, id", hotelId);
                res
                    .status(204)
                    .json();
            }
        });
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
