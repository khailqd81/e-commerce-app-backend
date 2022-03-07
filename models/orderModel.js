const db = require('./db');
const tableName = "Orders"
module.exports = {
    getAllOrderDetail: async (account_id) => {
        // Lấy ra danh sách các đơn hàng theo account_id
        const orders = await db.getByValue(tableName, "account_id", account_id);
        // Lấy ra chi tiết từng đơn hàng theo order_id
        let ordersDetail = [];
        for (let order of orders) {
            const productDetail = await db.getByValue("OrderDetail", "order_id", order.order_id);
            ordersDetail.push(productDetail);
        }
        console.log(ordersDetail)
        // Lấy ra thông tin chi tiết của từng món hàng trong đơn hàng
        let response = [];
        let index = 0;
        for (let orderDetail of ordersDetail) {
            let products = [];
            for (let row of orderDetail) {
                const product = await db.getByValue("Products", "product_id", row.product_id);
                products.push({
                    ...product[0],
                    buyAmount: row.amount
                });
            }
            response.push({
                order_id: orders[index].order_id,
                date_created: orders[index].date_created,
                products
            })
            index++;
        }
        // const response = ordersDetail.map(async (orderDetail, index) => {
        //     const products = (await orderDetail).map(async (item) => {
        //         const product = await db.getByValue("Products", "product_id", item.product_id);
        //         return {
        //             ...product,
        //             buyAmount: orderDetail.amount
        //         };
        //     })
        //     return {
        //         ...orders[index],
        //         products: products
        //     }
        // })
        return response;
    },

    add: async (order, products) => {
        const newOrder = await db.create(tableName, ["account_id", "date_created"], order);
        const orderId = newOrder.order_id;
        products.forEach(async (product) => {
            const newRow = await db.create("OrderDetail", ["order_id", "product_id", "amount"], {
                order_id: orderId,
                ...product
            });
        })
        return newOrder;
    }
}
