const {
  helloWorld1,
  helloWorld2
} = require("../controllers/landingContoller");

const router = require("express").Router();

router.get('/', helloWorld1)

module.exports = router