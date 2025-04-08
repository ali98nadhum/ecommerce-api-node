const asyncHandler = require("express-async-handler");
const { UserModel } = require("../model/UserModel");
const { hashPassword } = require("../middlewares/hashPassword");



// ==================================
// @desc Register new user
// @route /api/v1/auth/register
// @method POST 
// @access public
// ==================================
module.exports.register = asyncHandler(async(req , res) => {

    const {name , username , password , email , phone} = req.body;

    // hash password
    const hashedPassword = await hashPassword(password);

    const newUser = new UserModel({
        name,
        username,
        password:hashedPassword,
        email,
        phone
    });

    await newUser.save();

    res.status(201).json({message: "Registration successful"})
})