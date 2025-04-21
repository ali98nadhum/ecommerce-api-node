const asyncHandler = require("express-async-handler");
const { ProductModel } = require("../model/ProductModel");
const slugify = require("slugify");
const { uploadImageToUploadcare , deleteImageFromUploadcare } = require("../utils/uploadImageToUploadcare");







// ==================================
// @desc Get All Product
// @route /api/v1/products
// @method GET
// @access public
// ==================================
module.exports.getAllProduct = asyncHandler(async(req , res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 8 || 8;
    const skip = (page - 1) * limit;

    const search = req.query.search || '';

    const queryObj = {};

    if (search) {
        queryObj.title = { $regex: search, $options: 'i' };
    }

    const products = await ProductModel.find(queryObj).skip(skip).limit(limit)
    const totalProducts = await ProductModel.countDocuments(queryObj);
    res.json({totalProducts,page,data: products})
})



// ==================================
// @desc Get product by slug
// @route /api/v1/products/:slug
// @method GET
// @access public
// ==================================
module.exports.getOneProduct = asyncHandler(async(req , res) => {
    const product = await ProductModel.findOne({slug: req.params.slug});
    if(!product){
        return res.status(404).json({message: "Product not found"})
    }

    res.status(200).json({data: product})
})








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





// ==================================
// @desc Update a product
// @route /api/v1/products/:id
// @method PUT
// @access private (only admin)
// ==================================
module.exports.updateProduct = asyncHandler(async(req , res) => {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    let imageCover = product.imageCover;
    if(req.file){
        const {imageUrl , publicId} = await uploadImageToUploadcare(req.file);
        imageCover = {url: imageUrl, publicId: publicId};

        if(product.imageCover.publicId){
            await deleteImageFromUploadcare(product.imageCover.publicId)
        }
    }

    const updateProduct = await ProductModel.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            slug: slugify(req.body.title),
            description: req.body.description,
            price: req.body.price,
            priceAfterDiscount: req.body.priceAfterDiscount,
            quantity: req.body.quantity,
            isAvailable: req.body.isAvailable,
            bestSeller: req.body.bestSeller,
            category: req.body.category,
            subcategory: req.body.subcategory,
            imageCover: imageCover
        },
        {new:true}
    )

    res.status(200).json({ message: "Product updated", data: updateProduct });
})
















// ==================================
// @desc Delete product
// @route /api/v1/products/:id
// @method DELETE
// @access private (only admin)
// ==================================
module.exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }

  // delete image from uploadcare
  if (product.imageCover.publicId) {
    await deleteImageFromUploadcare(product.imageCover.publicId);
  }

  res.status(200).json({ message: "product deleted" });
});