const asyncHandler = require("express-async-handler");
const { UserModel } = require("../model/UserModel");


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