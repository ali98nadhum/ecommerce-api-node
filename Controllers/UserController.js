const asyncHandler = require("express-async-handler");
const { UserModel } = require("../model/UserModel");


// ==================================
// @desc delete user account
// @route /api/v1/user/:id
// @method POST
// @access private (only admin or user hemslef)
// ==================================
module.exports.deleteAccount = asyncHandler(async(req , res) => {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if(!user){
        return res.status(404).json({message: "user not found"})
    }

    res.status(200).json({message: "User account is deleted"})
})