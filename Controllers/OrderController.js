const asyncHandler = require("express-async-handler");
const { OrderModel } = require("../model/OrderModel");
const { ProductModel } = require("../model/ProductModel");
const generateOrderCode = require("../utils/generateOrderCode/generateOrderCode");



// ==================================
// @desc Get All orders
// @route /api/v1/order
// @method GET
// @access private (only admin)
// ==================================
module.exports.getAllOrder = asyncHandler(async(req , res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 8 || 8;
    const skip = (page - 1) * limit;

    const filter = {};

  if (req.query.orderStatus) {
    filter.orderStatus = req.query.orderStatus;
  }

  if (req.query.deliveryStatus) {
    filter.deliveryStatus = req.query.deliveryStatus;
  }

  if (req.query.orderCode) {
    filter.orderCode = { $regex: req.query.orderCode, $options: "i" };
  }

    const orders = await OrderModel.find(filter).populate("user" , "name username email phone -_id").skip(skip).limit(limit)
    const totalOrders = await OrderModel.countDocuments(filter);
    res.status(200).json({totalOrders,page,data: orders})
})







// ==================================
// @desc Get order by id
// @route /api/v1/order/:id
// @method GET
// @access private (only admin)
// ==================================
module.exports.getOneOrder = asyncHandler(async(req , res) => {
  const order = await OrderModel.findById(req.params.id).populate("user" , "name username email phone -_id");
  if(!order){
    return res.status(404).json({message: "Order not found"})
  }

  res.status(200).json({data: order})
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

    //   generate Code for order
      const orderCode = await generateOrderCode(req.user.username);
      

      const newOrder = new OrderModel({
        user: req.user.id,
        products,
        totalPrice,
        shippingAddress,
        orderCode
      });
  
      await newOrder.save();

      // update quantity in db
      for (const item of products) {
        await ProductModel.findByIdAndUpdate(
          item.product,
          { $inc: { quantity: -item.quantity } },
          { new: true }
        );
      }

      res.status(201).json({ message: "Order created successfully", data: newOrder });
})


// ==================================
// @desc update order
// @route /api/v1/order/:id
// @method PUT
// @access private (only admin)
// ==================================
module.exports.updateOrder = asyncHandler(async (req, res) => {
  const { orderStatus, deliveryStatus } = req.body;

  const order = await OrderModel.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: `Order not found with id ${req.params.id}` });
  }


  if (orderStatus === 'cancelled') {

    for (const item of order.products) {
      await ProductModel.findByIdAndUpdate(
        item.product,
        { $inc: { quantity: item.quantity } },
        { new: true }
      );
    }

    order.orderStatus = 'cancelled';
    order.deliveryStatus = 'cancelled';
    await order.save();

    return res.status(200).json({message: 'Order cancelled and stock restored successfully'});
  }


  const updatedOrder = await OrderModel.findByIdAndUpdate(
    req.params.id,
    {
      orderStatus,
      deliveryStatus
    },
    { new: true }
  );

  res.status(200).json({message: 'Order updated successfully',data: updatedOrder});
});






// ==================================
// @desc delete order
// @route /api/v1/order/:id
// @method DELETE
// @access private (only admin)
// ==================================
module.exports.deleteOrder = asyncHandler(async(req , res) => {
  const order = await OrderModel.findByIdAndDelete(req.params.id);
  if(!order){
    return res.status(404).json({message: `not found order for this id ${req.params.id}`})
  }
  res.status(200).json({message: "order deleted Successfully"})
})



// ==================================
// @desc Get my orders
// @route /api/v1/order/:id
// @method GET
// @access private (just for login user)
// ==================================
module.exports.getMyOrders = asyncHandler(async(req, res) => {
  const {id} = req.params;
  
  if(req.user.id !== id){
    return res.status(403).json({message: "You are not authorized get this orders list"})
  }

  const orders = await OrderModel.find({user:id})

  if (!orders) {
    return res.status(404).json({ message: "No orders found for this user" });
  }

  res.status(200).json({ data: orders });
})