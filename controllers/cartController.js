const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');

exports.getAll = async (req, res, next) => {
    const products = await cartModel.getAll(req.userId);
    return res.status(200).json({
        products
    })
}

exports.addProduct = async (req, res, next) => {
    try {
        const products = await cartModel.getAllProductId(req.userId);

        let newRow = {
            account_id: req.userId,
            product_id: req.body.product_id,
            amount: req.body.amount
        }

        if (products) {
            const checkExist = products.find(item => item.product_id === req.body.product_id);
            if (checkExist) {
                newRow.amount = newRow.amount + checkExist.amount;
                const product = await productModel.getOneProduct(req.body.product_id);
                if (newRow.amount > product.quantity) {
                    return res.status(202).json({
                        message: "Vượt số lượng hàng còn lại."
                    })
                }
                const updateRow = await cartModel.updateCart(newRow);
                return res.status(200).json({
                    message: "Sản phẩm đã được thêm vào giỏ hàng (u)"
                })
            }
        }
        // if (checkRow.includes(parseInt(req.body.product_id))) {
        //     const updateRow = await cartModel.updateCart(newRow);
        //     return res.status(200).json({
        //         message: "Sản phẩm đã được thêm vào giỏ hàng (u)"
        //     })
        // }

        const row = await cartModel.addCart(newRow);
        return res.status(200).json({
            type: 'add',
            message: "Sản phẩm đã được thêm vào giỏ hàng."
        })

    } catch (error) {
        return res.status(400).json({
            message: "Thêm sản phẩm vào giỏ hàng thất bại."
        })
    }


}

exports.updateProduct = async (req, res, next) => {
    try {
        const products = await cartModel.getAllProductId(req.userId);

        if (products) {
            const checkExist = products.find(item => item.product_id === req.body.product_id);
            if (checkExist) {
                // const product = await productModel.getOneProduct(checkExist.product_id);
                // if (req.body.amount > product.quantity) {

                // }
                const newRow = {
                    account_id: req.userId,
                    product_id: req.body.product_id,
                    amount: req.body.amount
                }
                await cartModel.updateCart(newRow);
                const newProducts = await cartModel.getAll(req.userId);
                return res.status(200).json({
                    products: newProducts,
                    message: "Tăng số lượng Ok"
                })
            }
        }
        return res.status(202).json({
            message: "Không tìm thấy sản phẩm để cập nhật."
        })


    } catch (error) {
        return res.status(400).json({
            message: "Cập nhật sản phẩm thất bại.",
            error_mesage: error
        })
    }


}