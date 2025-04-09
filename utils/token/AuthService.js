const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const { UserModel } = require("../../model/UserModel");



exports.protect = asyncHandler(async(req , res , next) => {
    // 1- check if token exists
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }

    
    if(!token){
        return res.status(401).json({message: "you are not logged "});
    }

      // 2- verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


         // 3- check if user exists
        const currentUser = await UserModel.findById(decoded.id)
        if(!currentUser){
            return res.status(401).json({message: "user no longer exists" });
        }

        req.user = decoded;

        next();
})



exports.allowedTo = (...roles) => {
    return asyncHandler(async(req , res , next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: "you are not authorized to access this route" });
        }
        next();
    });
};