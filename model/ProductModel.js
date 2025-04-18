const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    slug: {
      type: String,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 500,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
      min: [0, "Price must be greater than or equal to 0"],
    },

    priceAfterDiscount: {
      type: Number,
    },

    quantity: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },

    imageCover: {
      url: { type: String },
      publicId: { type: String },
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryModel",
      required: true,
    },

    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubcategoryModel",
      required: true,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("ProductModel", ProductSchema);

module.exports = {
  ProductModel,
};
