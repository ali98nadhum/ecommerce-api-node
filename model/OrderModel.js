const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductModel",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    orderCode: {
      type: String,
      required: true,
      unique: true
    },

    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },

    deliveryStatus: {
      type: String,
      enum: ["delivered", "cancelled", "not_shipped", "in_delivery"],
      default: "not_shipped",
    },

    shippingAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("OrderModel", OrderSchema);

module.exports = {
  OrderModel,
};
