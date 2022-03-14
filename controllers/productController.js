const productModel = require('../models/productModel');

exports.getAll = async (req, res, next) => {
    const orderCol = "product_id";
    const products = await productModel.getAllProduct(orderCol);
    return res.json(products);
}

exports.getByType = async (req, res, next) => {
    const categoryName = req.body.categoryName;
    const products = await productModel.getProductByType(categoryName);
    return res.json(products);
}

exports.getOneProductById = async (req, res, next) => {
    const productId = req.query.productId;
    const products = await productModel.getOneProduct(productId);
    return res.json(products);
}

exports.getProductsByName = async (req, res, next) => {
    const productName = req.query.productName;
    const products = await productModel.getProductByName(productName);
    return res.json(products);

}
