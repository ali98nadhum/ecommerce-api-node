const asyncHandler = require("express-async-handler");
const { BrandModel } = require("../model/BrandModel");
const { uploadImageToUploadcare , deleteImageFromUploadcare } = require("../utils/uploadImageToUploadcare");
const { default: slugify } = require("slugify");


// ==================================
// @desc Get All brands
// @route /api/v1/brand
// @method GET
// @access public
// ==================================
module.exports.getAllBrands = asyncHandler(async(req , res) => {
    const brands = await BrandModel.find({})
    res.status(200).json({data: brands})
})




// ==================================
// @desc Create a new brand
// @route /api/v1/brand
// @method POST
// @access private (only admin)
// ==================================
module.exports.createBrand = asyncHandler(async(req , res) => {
    const {title} = req.body;

    if(!req.file){
        return res.status(400).json({message: "Image is required"})
    }

    const {imageUrl , publicId} = await uploadImageToUploadcare(req.file);

    // create brand
    const newBrand = new BrandModel({
        title,
        slug: slugify(title),
        image: {url:imageUrl , publicId}
    });

    await newBrand.save();

    res.status(201).json({message: "Brand created" , data: newBrand})
})