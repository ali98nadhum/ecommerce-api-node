const asyncHandler = require("express-async-handler");
const { CategoryModel } = require("../model/CategoryModel");
const slugify = require("slugify");


// ==================================
// @desc Create a new Category
// @route /api/v1/category
// @method POST
// @access private (only admin)
// ==================================
module.exports.createCategory = asyncHandler(async(req , res) => {
    const {title} = req.body;

    // create category
    const newCategory = new CategoryModel({
        title,
        slug:slugify(title)
    });

    await newCategory.save();

    res.status(201).json({message: "category created" , data:newCategory})
})