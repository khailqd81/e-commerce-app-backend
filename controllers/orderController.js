const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

exports.getAll = async (req, res, next) => {
    const accountId = req.userId;
    if (accountId) {
        let orderDetails = await orderModel.getAllOrderDetail(accountId);
        console.log(Object.keys(orderDetails[0]).length);
        if (Object.keys(orderDetails[0]).length === 0) {
            orderDetails = [];
        }
        return res.status(200).send({
            orderDetails
        })

    }
    return res.status(202).send({
        message: "No account Id provided"
    })
}

exports.add = async (req, res, next) => {
    const products = req.body.products;

    if (products) {
        //kiểm tra số lượng hàng còn lại
        let checkEnough = true;
        for (let product of products) {
            const productInDb = await productModel.getOneProduct(product.product_id);
            if (productInDb.quantity < product.amount) {
                checkEnough = false;
                break;
            }
        }
        if (checkEnough) {
            const date_created = new Date().toLocaleString('en-US');
            const newOrder = {
                account_id: req.userId,
                date_created
            }
            const order = await orderModel.add(newOrder, products, req.userId);
            if (order) {
                return res.status(200).json({
                    order: order,
                    message: "Mua hàng thành công."
                })
            }

        }
        return res.status(202).json({
            order: order,
            message: "Mua hàng thất bại."
        })

    }
    return res.status(202).json({
        message: "Sản phẩm trống"
    })
}
