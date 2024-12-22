const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")



//REVIEW
//Post Route for review
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

module.exports = router;