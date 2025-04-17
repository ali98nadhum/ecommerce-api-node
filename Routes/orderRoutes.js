const { createOrder, getAllOrder } = require("../Controllers/OrderController");
const AuthService = require("../utils/token/AuthService");
const { createOrderValidator } = require("../utils/vaildators/OrderVaildators");
const router = require("express").Router();



  router
  .route("/")
  .post(AuthService.protect,createOrderValidator , createOrder)
  .get(AuthService.protect , AuthService.allowedTo("superAdmin" , "admin") , getAllOrder)


module.exports = router;
