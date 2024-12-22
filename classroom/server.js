const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session  = require("express-session");
const flash = require("connect-flash");
const path = require("path");
// const cookieParser = require('cookie-parser')

const sessionOption = {secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(session(sessionOption));
app.use(flash());

app.get("/register", (req, res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    if(name === "anonymous"){
        req.flash("error", "user not registered");
    }else{
        req.flash("success", "user registered successfully");
    }
    res.redirect("/hello");
})
app.get("/hello", (req, res)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.render("page.ejs", {name: req.session.name });
})

// app.get("/reqcount", (req, res)=> {
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }   
//     res.send( `you send ${req.session.count} time req. `);
// })
// app.get("/test", (req, res)=> {
//     res.send("test successful!");
// })


// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req, res)=>{
//     res.cookie("Made-In","India", {signed: true});
//     res.send("signed cookies sent")
// })

// app.get("/verify", (req, res) =>{
//     console.log(req.signedCookies);
//     res.send("verifed");
// })


app.listen(3000, ()=>{
    console.log("server is listening to 3000");
})