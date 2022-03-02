const cartModel = require('../models/cartModel')
exports.getAll = async (req, res, next) => {
    const products = await cartModel.getAll(req.userId);
    return res.status(200).json({
        products
    })
}

exports.addProduct = async (req, res, next) => {
    const checkRow = await (await cartModel.getAllProductId(req.body.account_id)).map(item => item.product_id);

    console.log("checkrow",checkRow);
    if (checkRow.includes(parseInt(req.body.product_id))) {
        return res.status(403).json({
            message: "Sản phẩm đã được thêm vào giỏ hàng"
        })
    }
    const newRow = {
        account_id: req.body.account_id,
        product_id: req.body.product_id
    }
    console.log("addproduct: ", newRow);
    const row = await cartModel.addCart(newRow);
    return res.status(200).json({
        row
    })
}