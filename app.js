if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}


const express = require("express");
const app =  express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Listing = require("./models/listing.js")


const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");


const dbURL = process.env.ATLAS_DBURL;

main()
    .then( (res)=> {
    console.log("connected to DB")
    }).catch((err)=> {
        console.log(err);
    });


async function main() {
    await mongoose.connect(dbURL);
}
const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, // time period in seconds
})

store.on("error", ()=> {
  console.log("ERROR IN MONGO SESSION STORE", err);
});


const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    }
}



app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")))
 


app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=> {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
}); 

app.get("/demouser", async(req, res)=>{
    const fakeUser = new User({
        email: "student1@gmail.com",
        username: "delta-student1", 
    })
    let registeredUser = await User.register(fakeUser, "hello");
    res.send(registeredUser);
});

app.get("/filtered/listings", async(req, res) => {
    let filteredListing = await Listing.find({category: "mountain"})
    // console.log(filteredListing[0]);
    res.render("filteredListing/index.ejs", {filteredListing});
})

//for searching
app.get('/search', async (req, res) => {
    const { query } = req.query; // Get the search query from URL parameters
    try {
      // Use a MongoDB regular expression search (case-insensitive)
      const listings = await Listing.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
          { location: { $regex: query, $options: 'i' } },
          { country: { $regex: query, $options: 'i' } },
          
        ]
      });
      if(listings ==""){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings")
      }else{
    //   console.log(listings)
      res.render("filteredListing/searched.ejs",{listings});
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error while searching');
    }
  });



app.use("/listings", listingRoute);
app.use("/listings/:id/reviews", reviewRoute);
app.use("/", userRoute);




app.all("*", (req, res, next)=> {
    next(new ExpressError(404,"Page Not Found!"));
});


app.use((err, req, res, next)=> {
    let {statusCode=500, message= "something went wrongs!"}= err;
    res.status(statusCode).render("error.ejs", {message});
})

app.listen(8080, ()=> { 
    console.log("server is listening to port 808")
});