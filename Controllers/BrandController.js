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
// @desc Get brand by slug
// @route /api/v1/brand/:slug
// @method GET
// @access public
// ==================================
module.exports.getOneBrand = asyncHandler(async(req , res) => {
    const brand = await BrandModel.findOne({slug:req.params.slug})
    if(!brand){
        return res.status(404).json({message: "Brand not found"})
    }

    res.status(200).json({data: brand})
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





// ==================================
// @desc update brand
// @route /api/v1/brand/:id
// @method PUT
// @access private (only admin)
// ==================================
module.exports.updateBrand = asyncHandler(async (req, res) => {
  const brand = await BrandModel.findById(req.params.id);
  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  let image = brand.image;
  if (req.file) {
    const { imageUrl, publicId } = await uploadImageToUploadcare(req.file);
    image = {
      url: imageUrl,
      publicId: publicId,
    };

    // Delete old image
    if (category.image.publicId) {
      await deleteImageFromUploadcare(category.image.publicId);
    }
  }

  // update brand
  const newBrand = await BrandModel.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, slug: slugify(category.title), image: image },
    { new: true }
  );

  res.status(200).json({ message: "Brand updated", data: newBrand });
});




// ==================================
// @desc Delete brand
// @route /api/v1/brand/:id
// @method DELETE
// @access private (only admin)
// ==================================
module.exports.deleteBrand = asyncHandler(async(req , res) => {

    const brand = await BrandModel.findByIdAndDelete(req.params.id);
    if(!brand){
        return res.status(404).json({message: "brand not found"})
    }

    // delete image
    if(brand.image.publicId){
        await deleteImageFromUploadcare(brand.image.publicId);
    }

    res.status(200).json({message: "Brand deleted"})
})