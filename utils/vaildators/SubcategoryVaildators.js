const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/vaildatorMiddleware");
const { CategoryModel } = require("../../model/CategoryModel");

exports.createSubCategoryValidator = [
  check("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 5 })
    .withMessage("title must be at least 5 characters")
    .isLength({ max: 30 })
    .withMessage("title must be less than 30 characters"),
  check("category")
    .isMongoId()
    .withMessage("Invalid id")
    .notEmpty()
    .withMessage("category is required")
    .custom((categoryId) =>
      CategoryModel.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(new Error("Category not found"));
        }
      })
    ),
  VaildatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid id "),
  VaildatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("title")
    .optional()
    .isLength({ min: 5 })
    .withMessage("title must be at least 5 characters")
    .isLength({ max: 30 })
    .withMessage("title must be less than 30 characters"),
  check("id").isMongoId().withMessage("Invalid id "),
  check("category")
    .isMongoId()
    .withMessage("Invalid id")
    .notEmpty()
    .withMessage("category is required")
    .custom((categoryId) =>
      CategoryModel.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(new Error("Category not found"));
        }
      })
    ),
  VaildatorMiddleware,
];
