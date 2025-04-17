const { createOrder, getAllOrder, getOneOrder, deleteOrder, updateOrder } = require("../Controllers/OrderController");
const AuthService = require("../utils/token/AuthService");
const { createOrderValidator, getOneOrderValidator, deleteOrderValidator, updateOrderValidator } = require("../utils/vaildators/OrderVaildators");
const router = require("express").Router();



  router
  .route("/")
  .post(AuthService.protect,createOrderValidator , createOrder)
  .get(AuthService.protect , AuthService.allowedTo("superAdmin" , "admin") , getAllOrder)


  router
  .route("/:id")
  .get(
    AuthService.protect,
    AuthService.allowedTo("superAdmin" , "admin"),
    getOneOrderValidator , 
    getOneOrder
  )
  .delete(
    AuthService.protect,
    AuthService.allowedTo("superAdmin" , "admin"),
    deleteOrderValidator,
    deleteOrder
  )
  .put(
    AuthService.protect,
    AuthService.allowedTo("superAdmin" , "admin"),
    updateOrderValidator,
    updateOrder
  )


module.exports = router;
