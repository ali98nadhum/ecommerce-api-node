const asyncHandler = require("express-async-handler");
const { CategoryModel } = require("../model/CategoryModel");
const slugify = require("slugify");
const { uploadImageToUploadcare } = require("../utils/uploadImageToUploadcare");



// ==================================
// @desc Get All Categories
// @route /api/v1/category
// @method GET
// @access public
// ==================================
module.exports.getAllCategories = asyncHandler(async(req , res) => {
    const categories = await CategoryModel.find({});
    res.status(200).json({data:categories})
})





// ==================================
// @desc Get category by slug
// @route /api/v1/category/:slug
// @method GET
// @access public
// ==================================
module.exports.getOneCateogry = asyncHandler(async(req , res) => {
    const category = await CategoryModel.findOne({slug:req.params.slug});
    if(!category){
        return res.status(404).json({message: "Category not found"})
    }

    res.status(200).json({data:category})
})






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

    const {imageUrl , publicId} = await uploadImageToUploadcare(req.file);
    

    // create category
    const newCategory = new CategoryModel({
        title,
        slug:slugify(title),
        image: {url:imageUrl , publicId}
    });

    await newCategory.save();

    res.status(201).json({message: "category created" , data:newCategory})
})




// ==================================
// @desc Delete category
// @route /api/v1/category/:id
// @method DELETE
// @access private (only admin)
// ==================================
module.exports.deleteCategory = asyncHandler(async(req , res) => {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if(!category){
        return res.status(404).json({message: "Category not found"})
    }

    res.status(200).json({message: "category deleted"})
})