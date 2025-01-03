const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")

<<<<<<< HEAD
const reviewController = require("../controllers/reviews.js");
=======
>>>>>>> 2fd7c92b491d92b3fbcb7bbe08c3aa8f68be8479


//REVIEW
//Post Route for review
<<<<<<< HEAD
router.post("/",isLoggedIn, validateReview,wrapAsync(reviewController.createReview));

//Delete Route for Reviews
router.delete("/:reviewId",isLoggedIn,
    isReviewAuthor,wrapAsync(reviewController.destroyReview))
=======
router.post("/",isLoggedIn, validateReview,wrapAsync(async(req, res)=> {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author= req.user;
    console.log(newReview , listing);
    listing.reviews.push(newReview);

   await newReview.save();
   await listing.save();
   req.flash("success", "New review created!");
   res.redirect(`/listings/${listing._id}`);
}));

//Delete Route for Reviews
router.delete("/:reviewId",isLoggedIn,
    isReviewAuthor,wrapAsync( async(req, res)=>{
    let {id, reviewId} = req.params;
    let del = await Review.findByIdAndDelete(reviewId);
    let updateLis = await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    console.log(id, del, updateLis);
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);

}))
>>>>>>> 2fd7c92b491d92b3fbcb7bbe08c3aa8f68be8479

module.exports = router;