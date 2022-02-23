const db = require('./db');
const tableName = "Products";
const idCol = "product_id"
module.exports = {
    getAllProduct: async (orderCol) => {
        const result = await db.getAll(tableName, orderCol);
        return result;
    },

    getProductByType: async (categoryName) => {
        const category = await db.getByValue("Categories", "category_name", categoryName);
        if (category[0]) {
            const result = await db.getByValue(tableName, "category_id",category[0].category_id);
            return result;
        }
        return [];
    },

    addProduct: async (product) => {
        const result = await db.create(tableName, product);
        return result;
    },

    updateProduct: async (product) => {
        const result = await db.update(tableName, product, idCol, product.product_id);
        return result;
    },

    deleteProduct: async (productId) => {
        const result = await db.delete(tableName, idCol, productId);
        return result;
    }
}