const jwt = require('jsonwebtoken');


// Generate a JWT token for a user.
const generateToken = (id , username , name , role) => {
    return jwt.sign(
        { id, username , name , role },
        process.env.JWT_SECRET, 
        { expiresIn: process.env.EXPIRES_IN } 
    );
}



module.exports = {
    generateToken
}