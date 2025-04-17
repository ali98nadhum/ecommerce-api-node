const { createOrder, getAllOrder, getOneOrder } = require("../Controllers/OrderController");
const AuthService = require("../utils/token/AuthService");
const { createOrderValidator, getOneOrderValidator } = require("../utils/vaildators/OrderVaildators");
const router = require("express").Router();



  router
  .route("/")
  .post(AuthService.protect,createOrderValidator , createOrder)
  .get(AuthService.protect , AuthService.allowedTo("superAdmin" , "admin") , getAllOrder)


  router
  .route("/:id")
  .get(AuthService.protect,AuthService.allowedTo("superAdmin" , "admin") , getOneOrderValidator , getOneOrder)


module.exports = router;
