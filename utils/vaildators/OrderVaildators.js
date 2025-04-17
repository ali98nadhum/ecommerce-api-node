const { check , body } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/vaildatorMiddleware");
const { OrderModel } = require("../../model/OrderModel");


exports.createOrderValidator = [
  body("products")
    .isArray({ min: 1 })
    .withMessage("products يجب أن تكون مصفوفة تحتوي على منتج واحد على الأقل"),

  body("products.*.product")
    .notEmpty()
    .withMessage("product مطلوب")
    .isMongoId()
    .withMessage("Invalid id"),

  body("products.*.quantity")
    .notEmpty()
    .withMessage("quantity مطلوب")
    .isInt({ min: 1 })
    .withMessage("quantity يجب أن يكون عددًا صحيحًا أكبر من أو يساوي 1"),

  body("shippingAddress")
    .notEmpty()
    .withMessage("shippingAddress مطلوب"),

  VaildatorMiddleware,
];







