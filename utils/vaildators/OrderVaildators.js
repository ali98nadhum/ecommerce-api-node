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




exports.getOneOrderValidator = [
    check("id")
    .isMongoId()
    .withMessage("Invalid id order"),
    VaildatorMiddleware,
  ];
  



  exports.deleteOrderValidator = [
    check("id")
    .isMongoId()
    .withMessage("Invalid id order"),
    VaildatorMiddleware,
  ];


  exports.updateOrderValidator = [
    check("id").isMongoId().withMessage("Invalid id order"),

    body("orderStatus")
      .optional()
      .isIn(["pending", "confirmed", "cancelled"])
      .withMessage(
        "orderStatus يجب أن يكون أحد القيم التالية: pending, confirmed, cancelled"
      ),

    body("deliveryStatus")
      .optional()
      .isIn(["delivered", "cancelled", "not_shipped", "in_delivery"])
      .withMessage(
        "deliveryStatus يجب أن يكون أحد القيم التالية: delivered, cancelled, not_shipped, in_delivery"
      ),
    VaildatorMiddleware,
  ];
  






