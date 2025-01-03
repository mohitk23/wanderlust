const express= require("express");
const router = express.Router();

//POSTS
router.get("/", (req, res)=> {
    res.send("get for post");
})

router.get("/:id", (req, res)=> {
    res.send("get for posts id");
})
//post route for posts
router.post("/", (req, res)=> {
    res.send("post for posts");
}) 

router.delete("/:id", (req, res)=> {
    res.send("delete for post id");
})

module.exports = router;
