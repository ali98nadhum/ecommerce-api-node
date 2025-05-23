const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/vaildatorMiddleware");
const { BrandModel } = require("../../model/BrandModel");



exports.createBrandValidator = [
  check("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 characters")
    .isLength({ max: 20 })
    .withMessage("title must be less than 20 characters"),

  VaildatorMiddleware,
];


exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid id brand"),
  VaildatorMiddleware,
];




exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid id brand"),
  check("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 characters")
    .isLength({ max: 20 })
    .withMessage("title must be less than 20 characters"),

  VaildatorMiddleware,
];
