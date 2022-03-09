const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.authUser = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(202).send({
            message: "Unauthorized."
        });
    }
    const accessToken = authorization.toString().split(" ")[1];
    if (!accessToken) {
        return res.status(202).send({
            message: "Không có access token."
        });
    }
    jwt.verify(accessToken, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(202).send({
                message: "Unauthorized"
            })
        }
        req.userId = decoded.account_id;
        next();
    })
}

exports.handleRefreshToken = async (req, res, next) => {
    const refreshToken = req.body.refreshToken || req.headers.authorization;
    if (refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            console.log("id: ", (decoded.account_id))
            const user = await userModel.getUserById(decoded.account_id);
            if (user) {
                const tokenFromDb = user.refresh_token
                if (refreshToken === tokenFromDb) {
                    const newToken = jwt.sign({ account_id: decoded.account_id }, process.env.JWT_SECRET, {
                        expiresIn: process.env.EXPIRES_TOKEN
                    })
                    return res.status(200).send({
                        accessToken: newToken
                    })
                }
            }
            return res.status(202).send({
                message: "Không tìm thấy ID user",
            })

        } catch (error) {
            console.log(error)
            return res.status(202).send({
                message: "Unauthorized",
            })
        }
    }
    return res.status(202).send({
        message: "RefreshToken không hợp lệ"
    })
}

exports.isAdmin = (req, res, next) => {
    if (req.userId) {

    }
}