const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const jwtKey = "JWT_SECRET_BUGET_APP";
        const decoded = jwt.verify(token, jwtKey);
        req.userData = decoded;
        next();
    } catch (error) {
        console.log("JWT verification failed");
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};