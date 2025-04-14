const { register, login, verifyEmail, changePassword, forgetPassword, resetPassword } = require("../Controllers/AuthController");
const { registerValidator, loginValidator, changePasswordValidator, forgetPasswordValidator, resetPasswordValidator } = require("../utils/vaildators/AuthVaildators");
const AuthService = require("../utils/token/AuthService");


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


 router
 .route("/change-Password/:id")
 .post(
  AuthService.protect,
  changePasswordValidator,
  changePassword
)


router
 .route("/forget-Password")
 .post(forgetPasswordValidator,forgetPassword)


 router
 .route("/reset-password/:id/:resetToken")
 .post(resetPasswordValidator,resetPassword)




module.exports = router;
