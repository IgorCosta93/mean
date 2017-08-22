var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    rating : {
            type : Number,
            min : 0,
            max : 5,
            required : true
    },
    review : {
        type : String,
        required : true
    },
    createdOn : {
        type: Date,
        "default" : Date.now
    }
});

var roomSchema = new mongoose.Schema({
    type : String,
    number : Number,
    description : String,
    photos : [String],
    price : Number
});

var hotelSchema = new mongoose.Schema({

    //If we want to define that some item is Required
    //we need to add some more information like
    //what we are going to do with name
    name        : {
        type        : String,
        required    : true
    },
    stars       : {
        type        : Number,
        min         : 0,
        max         : 5,
        default     : 0
    },
    services    : [String],
    description : String,
    photos      : [String],
    currency    : String,
    //This is how we connected the reviewSchema to the
    // hotelSchema making a specific review belongs to
    // a specific hotel
    reviews : [reviewSchema],
    rooms : [roomSchema],
    location : {
        address : String,
        //Always store coordinates longitude (E/W), Latitude (N/S) this order
        coordinates : {
            type : [Number],
            //This is used to work with clever locations
            index : '2dsphere'
        }
    }
});

//Defining the model
//Firs the model name, second the Schema and for last
//the name of the collection but it's not Required
//if you don't put he will look for something like
//the model name in a lowercase
mongoose.model('Hotel', hotelSchema);
