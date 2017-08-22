var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function(req,res){
    var hotelId = req.params.hotelId;
    console.log("Get hotelId", hotelId);

    Hotel
        .findById(hotelId)
        //The advantage of using this is that retun only
        //the reviews, that way gain more speed
        .select('reviews')
        .exec(function(err,doc){
            var response = {
                status : 200,
                message : []
            };
            if (err){
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            }else if (!doc){
                console.log("Hotel id not found in database", id);
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found " + id
                };
            }else{
                response.message = doc.reviews ? doc.reviews : [];
            }
            res
                .status(response.status)
                .json(response.message);
        });
};

module.exports.reviewsGetOne = function(req,res){
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,hotel){
            var response = {
                status : 200,
                message : {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            }else if (!hotel){
                console.log("Hotel id not found in database",id);
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found " + id
                };
            }else{
                //Get the reviewId
                response.message = hotel.reviews.id(reviewId);
                //if the review doens't exit Mongoose returns null
                if (!response.message){
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID not found " + reviewId
                    };
                }
            }
            res
                .status(response.status)
                .json(response.message);
        });
};

var _addReview = function(req,res,hotel){
    hotel.reviews.push({
        name : req.body.name,
        rating : parseInt(req.body.rating, 10),
        review : req.body.review
    });

    hotel.save(function(err, hotelUpdate){
        if (err){
            res
                .status(500)
                .json(err);
        }else{
            res
                .status(201)
                //has we don't need all the informtion only
                //the review we will recover the last information
                //on the review array
                .json(hotelUpdate.reviews[hotelUpdate.reviews.lenght - 1]);
        }
    });
};

module.exports.reviewsAddOne = function(req,res){
    //Firts we need to recover the parent

    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,doc){
            var response = {
                status : 200,
                message : []
            };
            if (err){
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            }else if (!doc){
                console.log("Hotel id not found in database", id);
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found " + id
                };
            }
            if (doc){
                _addReview(req, res, doc);
            }else {
                res
                    .status(response.status)
                    .json(response.message)
            }
        });
};

module.exports.reviewsUpdateOne = function(req,res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,hotel){
            var thisReview;
            var response = {
                status : 200,
                message : {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            }else if (!hotel){
                console.log("Hotel id not found in database",id);
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found " + id
                };
            }else{
                //Get the reviewId
                thisReview = hotel.reviews.id(reviewId);
                //if the review doens't exit Mongoose returns null
                if (!thisReview){
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID not found " + reviewId
                    };
                }
            }
            //UPDATE
            if (response.status !== 200){
                res
                    .status(response.status)
                    .json(response.message);
            }else{
                thisReview.name = req.body.name;
                thisReview.rating = parseInt(req.body.rating,10);
                thisReview.review = req.body.review;
                hotel.save(function(err, hotelUpdate){
                    if (err){
                        res
                            .status(500)
                            .json(err)
                    }else{
                        res
                            .status(204)
                            .json();
                    }
                });
            }
        });
};

module.exports.reviewsDeleteOne = function(req,res){
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,hotel){
            var thisReview;
            var response = {
                status : 200,
                message : {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            }else if (!hotel){
                console.log("Hotel id not found in database",id);
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found " + id
                };
            }else{
                //Get the reviewId
                thisReview = hotel.reviews.id(reviewId);
                //if the review doens't exit Mongoose returns null
                if (!thisReview){
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID not found " + reviewId
                    };
                }
            }
            //UPDATE
            if (response.status !== 200){
                res
                    .status(response.status)
                    .json(response.message);
            }else{
                //DELETE
                hotel.reviews.id(reviewId).remove();
                hotel.save(function(err, hotelUpdate){
                    if (err){
                        res
                            .status(500)
                            .json(err)
                    }else{
                        res
                            .status(204)
                            .json();
                    }
                });
            }
        });
};
