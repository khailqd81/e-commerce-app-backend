const productModel = require('../models/productModel');
const commentModel = require('../models/commentModel');
// const firebase = require('../utils/firebaseUpload');
exports.getAll = async (req, res, next) => {
    const orderCol = "product_id";
    let products = await productModel.getAllProduct(orderCol);
    products = products.filter(product => !product.is_deleted)
    return res.status(200).json(products);
}

exports.getByType = async (req, res, next) => {
    const categoryName = req.body.categoryName;
    const products = await productModel.getProductByType(categoryName);
    return res.json(products);
}

exports.getOneProductById = async (req, res, next) => {
    const productId = req.query.productId;
    const products = await productModel.getOneProduct(productId);
    const pro_comment = await commentModel.getCommentByProId(productId);
    return res.json({
        ...products,
        comments: pro_comment
    });
}

exports.getProductsByName = async (req, res, next) => {
    const productName = req.query.productName;
    const products = await productModel.getProductByName(productName);
    return res.json(products);
}

exports.addProduct = async (req, res, next) => {
    if (req.body) {
        const data = JSON.parse(req.body.data);
        const product = {
            product_name: data.product_name,
            description: data.description,
            price: parseFloat(data.price),
            quantity: parseInt(data.quantity),
            category_id: parseInt(data.category_id),
            full_description: null,
            sold: 0,
            image_url: data.image_url,
            is_deleted: false,
            account_id: null
        }
        const newProduct = await productModel.addProduct(product);
        if (newProduct) {
            return res.status(200).json({
                newProduct
            })
        } else {
            return res.status(202).json({
                message: "Error add product to db"
            })
        }

    }

    return res.status(202).json({
        message: "Empty form"
    })
}

exports.updateProduct = async (req, res, next) => {
    if (req.body) {
        console.log(req.body)
        const data = JSON.parse(req.body.data);
        const product = {
            product_name: data.product_name,
            description: data.description,
            price: parseFloat(data.price),
            quantity: parseInt(data.quantity),
            category_id: parseInt(data.category_id),
            full_description: null,
            image_url: data.image_url,
            is_deleted: data.is_deleted,
        }
        const updateProduct = await productModel.updateProduct(product, data.product_id);
        if (updateProduct) {
            return res.status(200).json(updateProduct)
        } else {
            return res.status(202).json({
                message: "Error update product to db"
            })
        }

    }

    return res.status(202).json({
        message: "Empty form"
    })
}

exports.statisticPro = async (req, res, next) => {
    if (req.query && req.query.staField) {
        const staField = req.query.staField;
        let result;
        if (staField.toString() === "pro_sold") {
            result = await productModel.getAllProduct("sold");
        } else {
            result = await productModel.statisticProByCate(staField);
        }
        if (result && result.length !== 0) {
            return res.status(200).json(result);
        } else {
            return res.status(202).json([]);
        }
    }
    return res.status(202).json({
        message: "Empty request"
    })
}
