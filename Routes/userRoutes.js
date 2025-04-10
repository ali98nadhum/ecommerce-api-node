const { deleteAccount, updateUserRole } = require("../Controllers/UserController");
const {deleteAccountValidator,} = require("../utils/vaildators/AuthVaildators");
const AuthService = require("../utils/token/AuthService");

const router = require("express").Router();

router
  .route("/:id")
  .post(
    AuthService.protect,
    deleteAccountValidator,
    deleteAccount
  )
  .put(
    AuthService.protect,
    AuthService.allowedTo("superAdmin"),
    updateUserRole
  )

module.exports = router;
