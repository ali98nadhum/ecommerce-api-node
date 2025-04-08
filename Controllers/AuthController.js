const asyncHandler = require("express-async-handler");
const { UserModel } = require("../model/UserModel");
const { hashPassword } = require("../middlewares/hashPassword");
const bcrypt = require("bcryptjs");



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











// ==================================
// @desc Login user
// @route /api/v1/auth/login
// @method POST 
// @access public
// ==================================
module.exports.login = asyncHandler(async(req, res) => {
    const {email , password} = req.body;

    // Check if user exists
  const user = await UserModel.findOne({email});
  if(!user){
    return res.status(400).json({message: "Invalid email or password"})
  }

    // Check if password matches
    const isPasswordMatch = await bcrypt.compare(password , user.password);
    if(!isPasswordMatch){
      return res.status(400).json({message: "Invalid email or password"})
    }


    res.status(200).json({message:`login_success hi ${user.name}`});
})