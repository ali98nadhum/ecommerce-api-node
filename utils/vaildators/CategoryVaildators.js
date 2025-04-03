const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/vaildatorMiddleware");


exports.createCategoryValidator = [
    check("title")
    .notEmpty().withMessage("title is required")
    .isLength({min: 5}).withMessage("title must be at least 5 characters")
    .isLength({max: 30}).withMessage("title must be less than 30 characters"),
    VaildatorMiddleware,
]


exports.updateCategoryValidator = [
    check("title")
    .optional()
    .isLength({min: 5}).withMessage("title must be at least 5 characters")
    .isLength({max: 30}).withMessage("title must be less than 30 characters"),
    check("id")
    .isMongoId().withMessage("Invalid id category"),
    VaildatorMiddleware,
]


exports.deleteCategoryValidator = [
    check("id")
    .isMongoId().withMessage("Invalid id category"),
    VaildatorMiddleware,
]