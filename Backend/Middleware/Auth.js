const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const authenticateUser = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        res.status(401).json({ message: "Authorization Header missing" });
    }

    const [authType, token] = authorizationHeader.split(" ");

    if (authType !== 'Bearer' || !token) {
        res.status(401).json({ message: "Invalid Authorization formate" });
    }

    try {

        const isVerify = jwt.verify(token, process.env.SECRET_KEY);
        req.user = isVerify._id;
        console.log("User Verified....");
        next();

    } catch (error) {

        res.status(401).json({ message: "Invalid Token" });

    }
}
module.exports = { authenticateUser };
