const bcryptjs = require('bcryptjs');
const accountModel = require('../models/accountModel');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    if (req.body) {
        const user = await accountModel.getUser(req.body.username);
        if (user) {
            return res.status(202).json({
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

        await accountModel.createUser(newUser, Object.keys(newUser));
        return res.status(200).json({
            message: "Đăng ký thành công"
        })
    }
    return res.status(202).json({
        message: "Request trống"
    })
}

exports.signin = async (req, res, next) => {
    const user = await accountModel.getUser(req.body.username);
    if (!user) {
        return res.status(202).send({
            message: "Username không hợp lệ."
        })
    }
    if (user.is_blocked) {
        return res.status(202).send({
            message: "Tài khoản đang bị khóa."
        })
    }
    const checkPass = await bcryptjs.compare(req.body.password, user.password);
    if (checkPass) {
        try {
            const accessToken = jwt.sign({ account_id: user.account_id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_TOKEN });
            const refreshToken = jwt.sign({
                account_id: user.account_id,
                username: user.username
            }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.EXPIRES_REFRESH_TOKEN });
            user.refresh_token = refreshToken;
            await accountModel.updateUser(user);
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
    return res.status(202).send({
        message: "Sai mật khẩu."
    })
}

exports.isSignin = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            const user = await accountModel.getUserById(decoded.account_id);
            if (user) {
                return res.status(200).send({
                    message: "logged"
                })
            }
            return res.status(202).send({
                message: "Không tìm thấy ID user",
            })

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                message: "Unauthorized",
            })
        }
    }
    return res.status(400).send({
        message: "RefreshToken không hợp lệ"
    })
}

exports.getUserById = async (req, res, next) => {
    const user = await accountModel.getUserById(req.userId);
    if (user) {
        return res.status(200).json({
            username: user.username,
            account_id: user.account_id,
            fullname: user.fullname,
            email: user.email,
            role: user.role
        })
    }
    return res.status(202).json({
        message: "Không tìm thấy user"
    })
}

exports.getUserInfoByAdmin = async (req, res, next) => {
    const user = await accountModel.getUserById(req.query.account_id);
    if (user) {
        return res.status(200).json({
            username: user.username,
            account_id: user.account_id,
            fullname: user.fullname,
            email: user.email,
            role: user.role
        })
    }
    return res.status(202).json({
        message: "Không tìm thấy user"
    })
}

exports.getAllUsers = async (req, res, next) => {
    const users = await accountModel.getAllUser();
    if (users) {
        return res.status(200).json({
            users
        })
    }
    return res.status(202).json({
        message: "Không tìm thấy user"
    })
}

exports.delUser = async (req, res, next) => {
    const account_id = req.body.account_id;
    if (account_id) {
        try {
            const user = await accountModel.getUserById(account_id);
            const delUser = await accountModel.deleteUser({
                ...user,
                is_deleted: true
            });
            return res.status(200).json({
                delUser,
                message: "Ok"
            })
        } catch (error) {
            return res.status(202).json({
                message: "Error delete from db"
            })
        }
    }
    return res.status(202).json({
        message: "Empty request"
    })
}

exports.blockUser = async (req, res, next) => {
    const account_id = req.body.account_id;
    const block = req.body.block;
    if (account_id) {
        try {
            const user = await accountModel.getUserById(account_id);
            const blockUser = await accountModel.updateUser({
                ...user,
                is_blocked: block
            });
            return res.status(200).json({
                user: blockUser[0],
                message: "Ok"
            })
        } catch (error) {
            return res.status(202).json({
                message: "Error block from db"
            })
        }
    }
    return res.status(202).json({
        message: "Empty request"
    })
}