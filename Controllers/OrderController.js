const asyncHandler = require("express-async-handler");
const { OrderModel } = require("../model/OrderModel");
const { ProductModel } = require("../model/ProductModel");



// ==================================
// @desc Get All orders
// @route /api/v1/order
// @method Get
// @access private (only admin)
// ==================================
module.exports.getAllOrder = asyncHandler(async(req , res) => {
    const orders = await OrderModel.find({})
    res.status(200).json({data: orders})
})


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
      
        // check if quantity product is found
        if (product.quantity < item.quantity) {
          return res.status(400).json({
            message: `Insufficient stock for product: ${product.title}`,
            available: product.quantity,
            requested: item.quantity
          });
        }
      
         // count total price
         totalPrice += product.priceAfterDiscount? product.priceAfterDiscount * item.quantity : product.price * item.quantity
      }
      

      const newOrder = new OrderModel({
        user: req.user.id,
        products,
        totalPrice,
        shippingAddress
      });
  
      await newOrder.save();

      res.status(201).json({ message: "Order created successfully", data: newOrder });
})