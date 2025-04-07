const { register } = require("../Controllers/AuthController");

const router = require("express").Router();


router
  .route("/register")
  .post(register)



module.exports = router;
