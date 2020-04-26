const jwt = require('jsonwebtoken');
const client = require('prom-client');
const jwtVerificationMetric = new client.Counter({
  name: 'metric_all_jwt_requests',
  help: 'metric_help',
});

module.exports = (req, res, next) => {
    jwtVerificationMetric.inc();
    try {
        const token = req.body.token;
        const jwtKey = "JWT_SECRET_BUGET_APP";
        const decoded = jwt.verify(token, jwtKey);
        req.userData = decoded.username;

        // console.log("req is", req.body);
        console.log("JWT verification userData " + decoded.username);
        next();
    } catch (error) {
        console.log("JWT verification failed");
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};