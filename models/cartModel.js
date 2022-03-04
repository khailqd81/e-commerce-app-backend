const db = require('./db');
const tableName = "Customer_Cart"

module.exports = {
    getAllProductId: async (account_id) => {
        const products = await db.getByValue(tableName, "account_id", account_id);
        return products;
    },

    getAll: async (account_id) => {
        // const productIds = await db.getByValue(tableName, "account_id", account_id);
        // const products = [];
        // productIds.forEach(item => {
        //     const product = await db.getByValue("Products","product_id", item.product_id);
        // });
        const products = await db.getFromTwoTable(tableName, "Products", "product_id", "account_id", account_id);
        return products;
    },

    addCart: async (data) => {
        const newRow = await db.create(tableName, Object.keys(data), data);
        return newRow;
    },

    updateCart: async (data) => {
        const newRow = await db.updateTwoConditions(tableName, data, "account_id", data.account_id, "product_id", data.product_id)
        return newRow;
    },
    removeFromCart: async () => {

    }
}