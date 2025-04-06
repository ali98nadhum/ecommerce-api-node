const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/vaildatorMiddleware");
const { SubcategoryModel } = require("../../model/SubcategoryModel");
const { CategoryModel } = require("../../model/CategoryModel");

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("title must be less than 100 characters"),

  check("description")
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 20 })
    .withMessage("title must be at least 20 characters")
    .isLength({ max: 500 })
    .withMessage("title must be less than 500 characters"),

  check("price")
    .isNumeric()
    .withMessage("price must be a number")
    .notEmpty()
    .withMessage("product price is required")
    .custom((value) => value >= 0)
    .withMessage("Price must be a positive number"),

  check("quantity")
    .isNumeric()
    .withMessage("quantity must be a number")
    .notEmpty()
    .withMessage("product quantity is required")
    .custom((value) => value >= 0)
    .withMessage("quantity must be a positive number"),

  check("category")
    .notEmpty()
    .withMessage("category is required")
    .isMongoId()
    .withMessage("Invalid id category")
    .custom((categoryId) =>
      CategoryModel.findById(categoryId).then((Category) => {
        if (!Category) {
          return Promise.reject(new Error("Category not found"));
        }
      })
    ),

  check("subcategory")
    .notEmpty()
    .withMessage("subcategory is required")
    .isMongoId()
    .withMessage("Invalid id subcategory")
    .custom((subcategoryId) =>
      SubcategoryModel.findById(subcategoryId).then((subCategory) => {
        if (!subCategory) {
          return Promise.reject(new Error("subCategory not found"));
        }
      })
    ),

  VaildatorMiddleware,
];
