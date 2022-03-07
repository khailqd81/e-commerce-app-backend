const orderModel = require("../models/orderModel");

exports.getAll = async (req, res, next) => {
    const accountId = req.userId;
    if (accountId) {
        const orderDetails = await orderModel.getAllOrderDetail(accountId);
        return res.status(200).send({
            orderDetails,
            length_first_order: Object.keys(orderDetails[0]).length,
        })

    }
    return res.status(202).send({
        message: "No account Id provided"
    })
}

exports.add = async (req, res, next) => {
    const products = req.body.products;

    if (products) {
        try {
            const date_created = new Date().toLocaleString('en-US');
            const newOrder = {
                account_id: req.userId,
                date_created
            }

            console.log(newOrder);
            console.log(products);
            const order = await orderModel.add(newOrder, products);
            return res.status(200).json({
                order: order,
                message: "Thêm đơn hàng thành công"
            })
        } catch (error) {
            return res.status(400);
        }

    }
    return res.status(202).json({
        message: "Sản phẩm trống"
    })
}
