const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
<<<<<<< HEAD
const { string } = require("joi");
=======
>>>>>>> 2fd7c92b491d92b3fbcb7bbe08c3aa8f68be8479

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description: String,
    image: {
<<<<<<< HEAD
        url: String,
        filename: String,
=======
        type: String,
        default: "https://theluxuryvillacollection.com/wp-content/uploads/2018/01/Villa-Zensei-Marbella-luxury-designer-villa-1.jpg",
        set: (v) => v === "" ?
        "https://theluxuryvillacollection.com/wp-content/uploads/2018/01/Villa-Zensei-Marbella-luxury-designer-villa-1.jpg" 
        : v,
    
        
>>>>>>> 2fd7c92b491d92b3fbcb7bbe08c3aa8f68be8479
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
<<<<<<< HEAD
    category: {
        type: String,
        enum: ["mountain", "farm", "rooms", "arctic"],
        
    }
=======
>>>>>>> 2fd7c92b491d92b3fbcb7bbe08c3aa8f68be8479
   
});

//Post Mongoose Middleware
listingSchema.post("findOneAndDelete", async (listing) =>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
    
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;