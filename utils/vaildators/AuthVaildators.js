const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/vaildatorMiddleware");
const { UserModel } = require("../../model/UserModel");

exports.registerValidator = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 6 })
    .withMessage("name must be at least 6 characters")
    .isLength({ max: 25 })
    .withMessage("name must be less than 25 characters"),

  check("username")
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3 })
    .withMessage("username must be at least 3 characters")
    .isLength({ max: 20 })
    .withMessage("username must be less than 20 characters")
    .custom(async (val) => {
      const existingUsername = await UserModel.findOne({ username: val });
      if (existingUsername) {
        throw new Error("username already exists");
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),

  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (val) => {
      const existingUser = await UserModel.findOne({ email: val });
      if (existingUser) {
        throw new Error("Email already exists");
      }
    }),

  check("phone")
    .isMobilePhone(["ar-IQ"])
    .withMessage("invalid phone number")
    .custom(async (val) => {
      const existingPhone = await UserModel.findOne({ phone: val });
      if (existingPhone) {
        throw new Error("Phone number already exists");
      }
    }),

  VaildatorMiddleware,
];



exports.loginValidator = [
  check("email")
  .notEmpty().withMessage("email is required")
  .isEmail().withMessage("Invalid email"),
  check("password")
  .notEmpty().withMessage("password is required")
  .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  VaildatorMiddleware,
]



exports.deleteAccountValidator = [
  check("id")
  .isMongoId().withMessage("Invalid user id"),
  VaildatorMiddleware,
]


exports.updateUserRoleValidator = [
  check("id")
  .isMongoId().withMessage("Invalid user id"),
  check("role")
  .notEmpty()
  .withMessage("Role is required")
  .isIn(["user", "admin", "superAdmin"])
  .withMessage("Invalid role, must be one of: user, admin, superAdmin"),
  VaildatorMiddleware,
]


exports.changePasswordValidator = [
  check("id").isMongoId().withMessage("Invalid user id"),
  check("oldPassword")
    .notEmpty()
    .withMessage("old password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  check("newPassword")
    .notEmpty()
    .withMessage("new password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  VaildatorMiddleware,
];



exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id"),
  VaildatorMiddleware,
];


exports.getProfileValidator = [
  check("id").isMongoId().withMessage("Invalid user id"),
  VaildatorMiddleware,
];



exports.forgetPasswordValidator = [
  check("email")
  .notEmpty().withMessage("email is required")
  .isEmail().withMessage("Invalid email"),
  VaildatorMiddleware,
];



exports.resetPasswordValidator = [
  check("newPassword")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  VaildatorMiddleware,
];
