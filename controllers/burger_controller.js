//require express
const express = require("express")

//require burger.js to import its functions
const burger = require("../models/burger.js")


const router = express.Router()



//create routes for app
//Home route
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        let hbsObject = {
            burgers: data
        }
        console.log(hbsObject)
        res.render("index", hbsObject)
    })
})

//post route
router.post("/api/burgers", function (req, res) {
   
    //creating the burger stats  
    burger.insertOne(
        ["burger_name", "devoured"],
        [req.body.burger_name, req.body.devoured],
        function (result) {
          
            //sending back id of new burger
            res.json({ id: result.newID })
        }
    )
})

//update PUT route
router.put("/api/burgers/:id", function (req, res) {
    const condition = "id = " + req.params.id
    console.log("condition", condition)

    burger.updateOne({
        devoured: req.body.devoured,
    },
        condition,
        function (result) {
            if (result.changedRows === 0) {
                //if nothing changed then the id must not exist so it will return 404
                return res.status(404).end()
            }
            res.status(200).end()
        })
})

//delete route
router.delete('/api/burgers/:id', function (req, res) {
    const condition = "id = " + req.params.id;
console.log(condition)
    burger.delete(condition, function (result) {

        if (result.changedRows === 0) {
            return res.status(404).end()
        }
        res.status(200).end()

    })
})

// //export the routes 
module.exports = router