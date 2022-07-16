const {
    helloWorld1
} = require("../controllers/landingContoller")
const router = require("express").Router();

router.get('/', helloWorld1)

// router.get("/sub_route1", func2)
// router.get("/sub_route2", func3)

module.exports = router