const asyncHandler = require("express-async-handler");
const { UserModel } = require("../model/UserModel");
const { hashPassword } = require("../middlewares/hashPassword");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token/generateToken");
const randomBytes = require('randombytes');
const sendEmail = require("../utils/emails/sendEmail");
const verifyCodeTemplate = require("../utils/emailTemplates/verifyCodeTemplate");



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
        phone,
        verificationToken: randomBytes(32).toString("hex")
    });

    await newUser.save();
    const link = `${process.env.DOMAIN}/api/v1/auth/verify-email/${newUser.id}/${newUser.verificationToken}`;

     // send email to verified user
  try {
    await sendEmail({
      email: newUser.email,
      subject: "كود التفعيل الخاص بك صالح لمده 10 دقائق فقط",
      message: verifyCodeTemplate(newUser.email , link)
    })
  } catch (error) {
    console.log(error);
    
  }

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

    // Generate a JWT token for a user.
    const token = generateToken(
      user.id,
      user.name,
      user.username,
      user.role
    );


    res.status(200).json({message:`login success hi ${user.name}` , token: token});
})



// ==================================
// @desc verfiy email
// @route /api/v1/auth/verify-email/:id/:verificationToken
// @method GET
// @access private (only user register)
// ==================================
module.exports.verifyEmail = asyncHandler(async(req , res) => {
  const {id , verificationToken} = req.params;
  const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if(user.verificationToken === null){
      return res.status(404).json({message: "You cannt verify your account"})
    }

    if(user.verificationToken !== verificationToken){
      return res.status(400).json({message: "Invaild verification link"})
    }

    user.isVerifird = true;
    user.verificationToken = null;

    await user.save();

    res.status(200).json({message: "Email has been verifird , plase login to your account"})
})
