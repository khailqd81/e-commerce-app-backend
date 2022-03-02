const bcryptjs = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    if (req.body) {
        const user = await userModel.getUser(req.body.username);
        if (user) {
            return res.status(403).json({
                message: "Username đã tồn tại"
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPass = await bcryptjs.hash(req.body.password, salt);
        const newUser = {
            fullname: req.body.fullname,
            email: req.body.email,
            username: req.body.username,
            password: hashPass,
            role: "customer",
            refresh_token: null,
            is_blocked: false,
            is_deleted: false,
        }

        await userModel.createUser(newUser, Object.keys(newUser));
        return res.status(200).json({
            message: "Đăng ký thành công"
        })
    }
    return res.status(403).json({
        message: "Request trống"
    })
}

exports.signin = async (req, res, next) => {
    const user = await userModel.getUser(req.body.username);
    if (!user) {
        return res.status(403).send({
            message: "Username không hợp lệ."
        })
    }
    const checkPass = await bcryptjs.compare(req.body.password, user.password);
    if (checkPass) {
        try {
            const accessToken = await jwt.sign({ account_id: user.account_id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_TOKEN });
            const refreshToken = await jwt.sign({
                account_id: user.account_id,
                username: user.username
            }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.EXPIRES_REFRESH_TOKEN });
            user.refresh_token = refreshToken;
            await userModel.updateUser(user);
            return res.status(200).send({
                id: user.account_id,
                accessToken: accessToken,
                refreshToken: refreshToken
            })
        } catch (error) {
            console.log(error);
            return res.status(403).send({
                message: "error jwt or updateUser"
            })
        }
    }
    return res.status(403).send({
        message: "Sai mật khẩu."
    })
}