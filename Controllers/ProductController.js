const asyncHandler = require("express-async-handler");
const { ProductModel } = require("../model/ProductModel");
const slugify = require("slugify");
const { uploadImageToUploadcare , deleteImageFromUploadcare } = require("../utils/uploadImageToUploadcare");







// ==================================
// @desc Create a new Product
// @route /api/v1/products
// @method POST
// @access private (only admin)
// ==================================
module.exports.createProduct = asyncHandler(async(req , res) => {
    
})