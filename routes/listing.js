const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
<<<<<<< HEAD
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
)
// .post(upload.single('listing[image]'), (req,res)=> {
//     res.send();
// });
=======

const listingController = require("../controllers/listing.js");


//index.route
router.get("/", wrapAsync(listingController.index));
>>>>>>> 2fd7c92b491d92b3fbcb7bbe08c3aa8f68be8479

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

<<<<<<< HEAD
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'), wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));
=======
//show route
router.get("/:id", wrapAsync(listingController.showListing));

//create route
router.post("/", isLoggedIn,validateListing,wrapAsync(listingController.createListing));
>>>>>>> 2fd7c92b491d92b3fbcb7bbe08c3aa8f68be8479

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

<<<<<<< HEAD
=======
//Update Route
router.put("/:id",isLoggedIn,isOwner, wrapAsync(listingController.updateListing))

//Delete Route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));
>>>>>>> 2fd7c92b491d92b3fbcb7bbe08c3aa8f68be8479

module.exports = router;
