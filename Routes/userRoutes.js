const { deleteAccount, updateUserRole, getAllUsers, getUser, getProfile } = require("../Controllers/UserController");
const {deleteAccountValidator, updateUserRoleValidator, getUserValidator, getProfileValidator,} = require("../utils/vaildators/AuthVaildators");
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
    updateUserRoleValidator,
    updateUserRole
  )
  .get(
    AuthService.protect,
    AuthService.allowedTo("superAdmin" , "admin"),
    getUserValidator,
    getUser
  )

 router
  .route("")
  .get(
    AuthService.protect,
    AuthService.allowedTo("superAdmin" , "admin"),
    getAllUsers
  )

  router
   .route("/:username/:id")
   .get(
    AuthService.protect,
    getProfileValidator,
    getProfile
   )

module.exports = router;
