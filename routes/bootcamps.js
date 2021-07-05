const express = require("express");
const router = express.Router();
const {
    getBootcamp,
    createBootcamp,getBootcamps,updateBootcamp
} = require('../controllers/bootcamp');
//get all bootcamps
router.route('/').get(getBootcamps)
//get specific bootcamp
router.route("/:id").get(getBootcamp);
//send new bootcamp data to create in database
router.route("/").post(createBootcamp);
//update specific bootcamp
    router.route('/:id').put(updateBootcamp)
module.exports = router;