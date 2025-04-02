const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 30,
    },

    slug: {
      type: String,
      lowercase: true,
    },

    image: {
      url: { type: String },
      publicId: { type: String },
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("CategoryModel", CategorySchema);

module.exports = {
  CategoryModel,
};
