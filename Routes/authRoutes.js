const { register, login, verifyEmail } = require("../Controllers/AuthController");
const { registerValidator, loginValidator } = require("../utils/vaildators/AuthVaildators");

const router = require("express").Router();


router
  .route("/register")
  .post(registerValidator,register)


router
 .route("/login")
 .post(loginValidator,login)


 router
 .route("/verify-email/:id/:verificationToken")
 .get(verifyEmail)



module.exports = router;
