const {
    func1,
    func2
} = require("../controllers/route2Controller")
const router = require('express').Router();


router.get("/sub_route1", func1)
router.get("/sub_route2", func2)

module.exports = router