const asyncHandler = require("express-async-handler");
const { CategoryModel } = require("../model/CategoryModel");
const slugify = require("slugify");
const { uploadImageToUploadcare } = require("../utils/uploadImageToUploadcare");


// ==================================
// @desc Create a new Category
// @route /api/v1/category
// @method POST
// @access private (only admin)
// ==================================
module.exports.createCategory = asyncHandler(async(req , res) => {
    const {title} = req.body;

    if(!req.file){
        return res.status(400).json({message: "Image is required"});
    }

    const {imageUrl , pubilcId} = await uploadImageToUploadcare(req.file);

    // create category
    const newCategory = new CategoryModel({
        title,
        slug:slugify(title),
        image: {url:imageUrl , publicId}
    });

    await newCategory.save();

    res.status(201).json({message: "category created" , data:newCategory})
})