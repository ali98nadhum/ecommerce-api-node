const asyncHandler = require("express-async-handler");
const { CategoryModel } = require("../model/CategoryModel");
const { SubcategoryModel } = require("../model/SubcategoryModel");
const slugify = require("slugify");
const { uploadImageToUploadcare , deleteImageFromUploadcare } = require("../utils/uploadImageToUploadcare");



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
    const category = await CategoryModel.findOne({slug:req.params.slug}).populate("subcategories");
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
// @desc Update category
// @route /api/v1/category/:id
// @method PUT
// @access private (only admin)
// ==================================
module.exports.updateCategory = asyncHandler(async(req , res) => {
    const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "not found category for this id" });
  }

  // upload new image
  let image = category.image;
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

  // Update category in database
  const updateCategory = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title,
      slug: slugify(category.title),
      image: image 
    },
    { new: true }
  );

  // send return
  res.status(200).json({message: "category updated", data: updateCategory });
})












// ==================================
// @desc Delete category
// @route /api/v1/category/:id
// @method DELETE
// @access private (only admin)
// ==================================
module.exports.deleteCategory = asyncHandler(async (req, res) => {
  
  const category = await CategoryModel.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  // delete image from uploadcare
  if (category.image.publicId) {
    await deleteImageFromUploadcare(category.image.publicId);
  }

  // get all subcategory
  const subcategories = await SubcategoryModel.find({ category: category._id });

  // delete image for sybcategory
  for (const sub of subcategories) {
    if (sub.image && sub.image.publicId) {
      await deleteImageFromUploadcare(sub.image.publicId);
    }
  }

  // delete subcategories
  await SubcategoryModel.deleteMany({ category: category._id });

  res.status(200).json({ message: "category deleted" });
});