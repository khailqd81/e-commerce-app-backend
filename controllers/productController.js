const productModel = require('../models/productModel');
// const firebase = require('../utils/firebaseUpload');
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

exports.addProduct = async (req, res, next) => {
    console.log("Add product");

    if (req.body) {
        // try {
        //     const image_url = await firebase.handleUpload(req.files.image_file);
        //     console.log('image_url: ', image_url)

        // } catch (error) {
        //     console.log('error upload file ', error)

        // }
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
        console.log(product);
        const newProduct = await productModel.addProduct(product);
        return res.status(200).json({
            newProduct
        })
    }

    return res.status(202).json({
        message: "Empty form"
    })
}
