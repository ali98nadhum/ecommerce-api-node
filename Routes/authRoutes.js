const { register } = require("../Controllers/AuthController");
const { registerValidator } = require("../utils/vaildators/AuthVaildators");

const router = require("express").Router();


router
  .route("/register")
  .post(registerValidator,register)



module.exports = router;
