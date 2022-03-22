const commentModel = require('../models/commentModel');
const accountModel = require('../models/accountModel');
exports.getComment = async (req, res, next) => {
    const product_id = req.params.product_id;
    const comments = await commentModel.getComment(product_id);
    if (comments) {
        return res.status(200).json({
            comments
        })
    }
    return res.status(202).json({
        message: 'Error getting comments from db'
    })
}

exports.addComment = async (req, res, next) => {
    if (!req.userId && Object.keys(req.body).length === 0 ) {
        return res.status(202).json({
            message: 'Empty post request'
        })
    }
    const {order_id, product_id, rating, content} = req.body;
    const user = await accountModel.getUserById(req.userId);
    const create_date = new Date().toLocaleString('en-US');
    const comment = {
        account_id: user.account_id,
        username: user.username,
        product_id,
        content,
        rating,
        create_date,
        order_id
    }
    const result = await commentModel.addComment(comment);
    if (result && result.length !==0) {
        return res.status(200).json({
            message: "Add comment success"
        })
    } else {
        return res.status(202).json({
            message: "Error add comment"
        })
    }

}