var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotelsControllers.js');
var ctrlReviews = require('../controllers/reviewsControllers.js');

router
    .route('/hotels')
    //We can use a single route to get and post
    //the application will identifi the situation
    .get(ctrlHotels.hotelsGetAll)
    .post(ctrlHotels.hotelsAddOne);

router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne)
    //Update
    .put(ctrlHotels.hotelUpdateOne)
    .delete(ctrlHotels.hotelDeleteOne);


router
    .route('/teste/:nameId')
    .get(ctrlHotels.hotelsTeste);

//Review routes

router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlReviews.reviewsAddOne);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;
