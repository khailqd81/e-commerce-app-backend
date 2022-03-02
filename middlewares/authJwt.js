const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
exports.authUser = (req, res, next) => {
    const accessToken = req.headers["x-access-token"];
    if (!accessToken) {
        return res.status(400).send({
            message: "Không có access token."
        });
    }
    jwt.verify(accessToken, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(400).send({
                message: "Unauthorized"
            })
        }
        req.userId = decoded.account_id;
        next();
    })
}


exports.isAdmin = (req, res, next) => {
    if (req.userId) {

    }
}