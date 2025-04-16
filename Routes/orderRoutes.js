const { createOrder } = require("../Controllers/OrderController");
const AuthService = require("../utils/token/AuthService");
const router = require("express").Router();



  router
  .route("/")
  .post(AuthService.protect , createOrder)


module.exports = router;
