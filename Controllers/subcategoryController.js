const asyncHandler = require("express-async-handler");
const { SubcategoryModel } = require("../model/SubcategoryModel");
const slugify = require("slugify");
const { uploadImageToUploadcare } = require("../utils/uploadImageToUploadcare");


// ==================================
// @desc Get All Subcategory by slug
// @route /api/v1/subcategory
// @method GET
// @access public
// ==================================
module.exports.getAllSubcategory = asyncHandler(async(req , res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 8 || 8;
    const skip = (page - 1) * limit;
    const subcategories = await SubcategoryModel.find().skip(skip).limit(limit)
    const totalSubcategory = await SubcategoryModel.countDocuments();
    res.json({totalSubcategory,page,data: subcategories})
})


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
