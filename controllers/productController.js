const productModel = require('../models/productModel');

exports.getAll = async(req, res, next) => {
    const orderCol = "product_id";
    const products = await productModel.getAllProduct(orderCol);
    return res.json(products);
}