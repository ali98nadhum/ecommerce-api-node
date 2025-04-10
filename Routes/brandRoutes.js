
const { createBrand } = require("../Controllers/BrandController");
const AuthService = require("../utils/token/AuthService");
const router = require("express").Router();

router
  .route("/")
  .post(
    AuthService.protect,
    AuthService.allowedTo("superAdmin" , "admin"),
    createBrand,
  )

module.exports = router;
