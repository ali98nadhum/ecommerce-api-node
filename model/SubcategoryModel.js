const mongoose = require("mongoose");


const SubcategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 30
        },
        slug: {
            type: String,
            lowercase: true
        },

        image: {
            url: { type: String },
            publicId: { type: String },
          },

          category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CategoryModel",
            required: true
        },
    },
    { timestamps: true }
)

const SubcategoryModel = mongoose.model("SubcategoryModel" , SubcategorySchema);


module.exports = {
    SubcategoryModel
}