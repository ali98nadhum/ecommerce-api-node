const asyncHandler = require("express-async-handler");
const { SubcategoryModel } = require("../model/SubcategoryModel");
const slugify = require("slugify");
const { uploadImageToUploadcare } = require("../utils/uploadImageToUploadcare");



// ==================================
// @desc Create a new subcategory
// @route /api/v1/subcategory
// @method POST
// @access private (only admin)
// ==================================
module.exports.createSubcategory = asyncHandler(async(req , res) => {
    const { title, category } = req.body;

    if(!req.file){
        return res.status(400).json({message: "Image is required"});
    }

    const {imageUrl , publicId} = await uploadImageToUploadcare(req.file);

    // create subcategory
    const newSubcategory = new SubcategoryModel({
        title,
        slug: slugify(title),
        category,
        image: {url:imageUrl , publicId}
    })

    await newSubcategory.save();

    res.status(201).json({message: "subcategory created" , data:newSubcategory})
})
