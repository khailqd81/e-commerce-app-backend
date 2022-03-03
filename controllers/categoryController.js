const categoryModel = require('../models/categoryModel');
exports.getAll = async (req, res, next) => {
    const categories = await categoryModel.getAllCategory("category_id");
    return res.json(categories);
}

exports.getProductsByCategory = async (req, res, next) => {
    const categoryName = req.params.slug;
    const products = await categoryModel.getProductsByCategory(categoryName);
    return res.json(products);
}