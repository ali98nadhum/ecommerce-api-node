const asyncHandler = require("express-async-handler");
const { SubcategoryModel } = require("../model/SubcategoryModel");
const slugify = require("slugify");
const { uploadImageToUploadcare , deleteImageFromUploadcare } = require("../utils/uploadImageToUploadcare");


// ==================================
// @desc Get All Subcategory
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
// @desc Get subcategory by slug
// @route /api/v1/subcategory/:slug
// @method GET
// @access public
// ==================================
module.exports.getOneSubcategory = asyncHandler(async(req , res) => {
    const subcategory = await SubcategoryModel.findOne({slug:req.params.slug});
    if(!subcategory){
        return res.status(404).json({message: "Subcategory not found"})
    }

    res.status(200).json({data:subcategory})
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







// ==================================
// @desc Delete subcategory by id
// @route /api/v1/subcategory/:id
// @method DELETE
// @access private (only admin)
// ==================================
module.exports.deleteSubcategory = asyncHandler(async(req , res) => {
    const subcategory = await SubcategoryModel.findByIdAndDelete(req.params.id);
    if(!subcategory){
        return res.status(404).json({message: "Subcategory not found"})
    }

     // delete image from uploadcare
     if (subcategory.image.publicId) {
        await deleteImageFromUploadcare(subcategory.image.publicId);
      }

     res.status(200).json({message: "Subcategory deleted"})
})