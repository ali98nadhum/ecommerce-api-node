const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
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

const BrandModel = mongoose.model("BrandModel", BrandSchema);

module.exports = {
  BrandModel,
};
