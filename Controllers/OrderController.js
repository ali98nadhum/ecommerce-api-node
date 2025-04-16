const asyncHandler = require("express-async-handler");
const { OrderModel } = require("../model/OrderModel");
const { ProductModel } = require("../model/ProductModel");


// ==================================
// @desc create new order
// @route /api/v1/order
// @method POST
// @access private (just for login user)
// ==================================
module.exports.createOrder = asyncHandler(async(req , res) => {

    const {products , shippingAddress} = req.body;

    let totalPrice = 0;

    for (const item of products) {
        const product = await ProductModel.findById(item.product);
        if (!product) {
          return res.status(404).json({ message: `Product not found: ${item.product}` });
        }
  
        totalPrice += product.price * item.quantity;
      }

      const newOrder = new OrderModel({
        user: req.user._id,
        products,
        totalPrice,
        shippingAddress
      });
  
      await newOrder.save();

      res.status(201).json({ message: "Order created successfully", order: newOrder });
})