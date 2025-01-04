const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");



//REVIEW
//Post Route for review

router.post("/",isLoggedIn, validateReview,wrapAsync(reviewController.createReview));

//Delete Route for Reviews
router.delete("/:reviewId",isLoggedIn,
    isReviewAuthor,wrapAsync(reviewController.destroyReview));


module.exports = router;