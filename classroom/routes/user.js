
const express= require("express");
const router = express.Router();

//Users
//get Route for user
router.get("/", (req, res)=> {
    res.send("Get for user");
})

router.get("/:id", (req, res)=> {
    res.send("Get for users id");
})
//post route for users
router.post("/", (req, res)=> {
    res.send("post for user");
}) 

router.delete("/:id", (req, res)=> {
    res.send("delete for user id");
})

module.exports = router;