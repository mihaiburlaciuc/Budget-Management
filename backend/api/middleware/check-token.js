const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
    try {
        const token = req.body.token;
        const jwtKey = "JWT_SECRET_BUGET_APP";
        const decoded = jwt.verify(token, jwtKey);
        req.userData = decoded.username;
        console.log("JWT verification userData " + decoded.username);
        next();
    } catch (error) {
        console.log("JWT verification failed");
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};