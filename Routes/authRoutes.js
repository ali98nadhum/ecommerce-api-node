const { register, login } = require("../Controllers/AuthController");
const { registerValidator, loginValidator } = require("../utils/vaildators/AuthVaildators");

const router = require("express").Router();


router
  .route("/register")
  .post(registerValidator,register)


router
 .route("/login")
 .post(loginValidator,login)



module.exports = router;
