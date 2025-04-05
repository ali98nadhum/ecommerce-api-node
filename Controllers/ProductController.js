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
    const {title , description , price , quantity , category , subcategory} = req.body;

    if(!req.file){
        return res.status(400).json({message: "Image is required"});
    }

    const {imageUrl , publicId} = await uploadImageToUploadcare(req.file);

    // create product
    const newProduct = new ProductModel({
        title,
        slug: slugify(title),
        description,
        price,
        quantity,
        category,
        subcategory,
        imageCover: {url:imageUrl , publicId}
    })

    await newProduct.save();

    res.status(201).json({message: 'Product saved successfully' , data:newProduct})
})