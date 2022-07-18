const {
    func1,
    func2,
    func3
} = require("../controllers/route1Controller")
const router = require('express').Router();


router.get("/", func1)
router.get("/sub_route1", func2)
router.get("/sub_route2", func3)

module.exports = router