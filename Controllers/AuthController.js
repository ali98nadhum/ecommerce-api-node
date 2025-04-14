const asyncHandler = require("express-async-handler");
const { UserModel } = require("../model/UserModel");
const { hashPassword } = require("../middlewares/hashPassword");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token/generateToken");
const randomBytes = require('randombytes');
const sendEmail = require("../utils/emails/sendEmail");
const verifyEmailTemplate = require("../utils/emailTemplates/verifyCodeTemplate");
const resetPasswordTemplate = require("../utils/emailTemplates/resetPasswordTemplate");



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

    const verificationTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new UserModel({
        name,
        username,
        password:hashedPassword,
        email,
        phone,
        verificationToken: randomBytes(32).toString("hex"),
        verificationTokenExpires: verificationTokenExpires
    });

    await newUser.save();
    const link = `${process.env.DOMAIN}/api/v1/auth/verify-email/${newUser.id}/${newUser.verificationToken}`;

     // send email to verified user
  try {
    await sendEmail({
      email: newUser.email,
      subject: "رابط التفعيل الخاص بك صالح لمده 10 دقائق فقط",
      message: verifyEmailTemplate(newUser.email , link)
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
module.exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Check if password matches
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // check for Verifird account
  if (!user.isVerifird) {
    let verificationToken = user.verificationToken;
    if (!verificationToken || user.verificationTokenExpires < new Date()) {
      verificationToken = randomBytes(32).toString("hex");
      user.verificationToken = verificationToken;
      user.verificationTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();
    }

    const link = `${process.env.DOMAIN}/api/v1/auth/verify-email/${user.id}/${user.verificationToken}`;
    await sendEmail({
      email: user.email,
      subject: "رابط التفعيل الخاص بك صالح لمده 10 دقائق فقط",
      message: verifyEmailTemplate(user.email, link),
    });

    return res.status(403).json({
      message: "حسابك غير مفعل. تم إرسال رابط تفعيل جديد إلى بريدك الإلكتروني.",
    });
  }

  // Generate a JWT token for a user.
  const token = generateToken(user.id, user.username, user.name, user.role);

  res
    .status(200)
    .json({ message: `login success hi ${user.name}`, token: token });
});



// ==================================
// @desc verfiy email
// @route /api/v1/auth/verify-email/:id/:verificationToken
// @method GET
// @access private (only user register)
// ==================================
module.exports.verifyEmail = asyncHandler(async (req, res) => {
  const { id, verificationToken } = req.params;

  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  if (user.verificationToken === null || user.verificationTokenExpires < new Date() ) {

    user.verificationToken = null;
    await user.save();
    return res.status(404).json({ message: "Your link is expires" });
  }

  if (user.verificationToken !== verificationToken) {
    return res.status(400).json({ message: "Invaild verification link" });
  }

  user.isVerifird = true;
  user.verificationToken = null;

  await user.save();

  res
    .status(200)
    .json({ message: "Email has been verifird , plase login to your account" });
});



// ==================================
// @desc change Password 
// @route /api/v1/auth/change-Password /:id
// @method POST
// @access private (only user loged)
// ==================================
module.exports.changePassword  = asyncHandler(async(req , res) => {
  const {oldPassword , newPassword} = req.body;

  if (req.user.id !== req.params.id) {
    return res.status(403).json({ message: "You can only change your own password" });
  }

  const user = await UserModel.findById(req.user.id);
  if (!user) {
      return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
  }

  const hashedPassword = await hashPassword(newPassword);

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({message: "Password changed successfully"})

})




// ==================================
// @desc Forget password
// @route /api/v1/auth/forget-Password
// @method POST
// @access public
// ==================================
module.exports.forgetPassword = asyncHandler(async(req , res) => {
  const {email} = req.body;

  const user = await UserModel.findOne({email});
  if(!user){
    return res.status(404).json({message: "User not found"})
  }

  const resetToken = randomBytes(32).toString("hex");
  const resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetTokenExpires;

  await user.save();

  const resetLink = `${process.env.DOMAIN}/api/v1/auth/reset-password/${user.id}/${resetToken}`;


  try {
    await sendEmail({
      email: user.email,
      subject: "رابط إعادة تعيين كلمة المرور (صالح لمدة 10 دقائق)",
      message: resetPasswordTemplate(user.email, resetLink),
    });

    res.status(200).json({
      message: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "فشل إرسال البريد الإلكتروني" });
  }
  
})










// ==================================
// @desc Reset password
// @route /api/v1/auth/reset-password/:id/:resetToken
// @method POST
// @access public
// ==================================
module.exports.resetPassword = asyncHandler(async(req , res) => {
  const { id, resetToken } = req.params;
  const { newPassword } = req.body;

  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({ message: "المستخدم غير موجود" });
  }

  if (
    !user.resetPasswordToken ||
    user.resetPasswordToken !== resetToken ||
    user.resetPasswordExpires < new Date()
  ) {
    return res.status(400).json({ message: "الرابط غير صالح أو منتهي الصلاحية" });
  }

  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();

  res.status(200).json({ message: "تم تغيير كلمة المرور بنجاح، يمكنك الآن تسجيل الدخول" });
})