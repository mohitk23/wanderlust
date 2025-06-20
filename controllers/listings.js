const Listing = require("../models/listing");

module.exports.index = async(req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
    // console.log(allListings);
}

module.exports.renderNewForm = (req, res)=> {
    res.render("listings/new.ejs");
}
module.exports.showListing = async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",
         populate: { path: "author"}})
         .populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings")
    }
    // console.log(listing);
    res.render("listings/show.ejs", {listing});
    // res.render("listings/index.ejs", {allListings});
}

module.exports.createListing = async (req, res, next)=> {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename}
    console.log(newListing);
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
    // console.log(newListing);
}

module.exports.renderEditForm = async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings")
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250,e_blur:100");
    // console.log(originalImageUrl);
    res.render("listings/edit.ejs", {listing, originalImageUrl});
}

module.exports.updateListing = async(req, res)=>{
    if(!req.body.listing){
        throw new ExpressError(400, "send valid data for listing");
    }
    let {id} = req.params;
    let newListing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !=="undefined" ){
    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = {url, filename}
    await newListing.save();
    }
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`)
}

module.exports.destroyListing = async(req,res)=> {
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
}