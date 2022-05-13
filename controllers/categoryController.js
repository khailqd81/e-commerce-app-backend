const categoryModel = require('../models/categoryModel');
exports.getAll = async (req, res, next) => {
    const categories = await categoryModel.getAllCategory("category_id");
    return res.json(categories);
}

exports.getProductsByCategory = async (req, res, next) => {
    const categoryName = req.params.slug;
    let products = await categoryModel.getProductsByCategory(categoryName);
    products = products.filter(product => !product.is_deleted)
    return res.status(200).json(products);
}

exports.getCategoryById = async(req, res, next)=> {
    const categoryId = req.params.slug;
    const category = await categoryModel.getCategoryById(categoryId);
    return res.status(200).json(category[0]);
}