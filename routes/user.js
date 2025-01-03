const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js")

<<<<<<< HEAD
const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate('local',
    { failureRedirect: '/login', failureFlash: true }
    ),
    userController.login);

router.get("/logout", userController.logout);
=======
router.get("/signup", (req, res)=>{
    res.render("users/signup.ejs");
})

router.post("/signup", wrapAsync(async(req, res)=>{
    try {
        let {username, email, password} = req.body;
        const newUser = new User({username, email});
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err)=> {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to wanderlust!");
            res.redirect("/listings");
        }) 
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login", (req, res)=> {
    res.render("users/login.ejs");
});

router.post("/login",saveRedirectUrl, passport.authenticate('local',
     { failureRedirect: '/login', failureFlash: true }
     ),
     async(req, res)=> {
    req.flash("success", "Welcome to wanderlust" );
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
});

router.get("/logout", (req, res)=> {
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out");
        res.redirect("/listings");
    });
    
})
>>>>>>> 2fd7c92b491d92b3fbcb7bbe08c3aa8f68be8479

module.exports = router;