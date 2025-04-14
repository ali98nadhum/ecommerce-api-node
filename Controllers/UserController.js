const asyncHandler = require("express-async-handler");
const { UserModel } = require("../model/UserModel");



// ==================================
// @desc Get All users
// @route /api/v1/user/
// @method GET
// @access private (only admin)
// ==================================
module.exports.getAllUsers = asyncHandler(async(req , res) => {
  const users = await UserModel.find({}).select('-password -verificationToken -verificationTokenExpires -resetPasswordExpires -resetPasswordToken');
  res.status(200).json({data: users})
})



// ==================================
// @desc Get user by id
// @route /api/v1/user/:id
// @method GET
// @access private (only admin)
// ==================================
module.exports.getUser = asyncHandler(async(req , res) => {
  const user = await UserModel.findById(req.params.id).select('-password -verificationToken -verificationTokenExpires -resetPasswordExpires -resetPasswordToken');
  if(!user){
    return res.status(404).json({message: "User account not found"})
  }

  res.status(200).json({data: user})
})




// ==================================
// @desc update user role
// @route /api/v1/user/:id
// @method PUT
// @access private (only super admin)
// ==================================
module.exports.updateUserRole = asyncHandler(async (req, res) => {
  const user = await UserModel.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User role is updated" });
});


// ==================================
// @desc delete user account
// @route /api/v1/user/:id
// @method POST
// @access private (only admin or user hemslef)
// ==================================
module.exports.deleteAccount = asyncHandler(async(req , res) => {
    const userId = req.params.id;

  const isOwner = req.user.id === userId;
  const isAdmin = ["admin", "superAdmin"].includes(req.user.role);

  if (!isOwner && !isAdmin) {
    return res.status(403).json({ message: "You are not authorized to delete this account" });
  }


  const user = await UserModel.findByIdAndDelete(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User account is deleted" });
})


// ==================================
// @desc Get user profile
// @route /api/v1/user/:username/:id
// @method GET
// @access private (just for user logged)
// ==================================
module.exports.getProfile = asyncHandler(async(req , res) => {

  const {id , username} = req.params;


  if(req.user.id !== id || req.user.username !== username){
    return res.status(403).json({message: "You are not authorized get this profile"})
  }

  const user = await UserModel.findById(id).select('-password -verificationToken -verificationTokenExpires -resetPasswordExpires -resetPasswordToken');;

  if(!user){
    return res.status(404).json({message: "user not found"})
  }

  res.status(200).json({data: user})

})