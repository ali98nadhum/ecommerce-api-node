const { deleteAccount } = require("../Controllers/UserController");
const {deleteAccountValidator,} = require("../utils/vaildators/AuthVaildators");
const AuthService = require("../utils/token/AuthService");

const router = require("express").Router();

router
  .route("/:id")
  .post(
    AuthService.protect,
    AuthService.allowedTo("superAdmin", "admin"),
    deleteAccountValidator,
    deleteAccount
  );

module.exports = router;
