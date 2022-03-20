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
            const result = await db.getByValue(tableName, "category_id", category[0].category_id);
            return result;
        }
        return [];
    },

    getOneProduct: async (productId) => {
        const result = await db.getByValue(tableName, idCol, productId);
        return result[0];
    },

    getProductByName: async (productName) => {
        const result = await db.getStringLike(tableName,"product_name",productName);
        return result;
    },

    addProduct: async (product) => {
        const result = await db.create(tableName,Object.keys(product), product);
        return result;
    },

    updateProduct: async (product) => {
        const result = await db.update(tableName, product, idCol, product.product_id);
        return result;
    },

    deleteProduct: async (productId) => {
        const result = await db.delete(tableName, idCol, productId);
        return result;
    },

    statisticProByCate: async (staField) => {
        const result = await db.statisticTwoTable("Products","Categories",staField);
        result.forEach(item => {
            if (item.total_sold === null) {
                item.total_sold = 0
            }
        })
        console.log("result in sta: ", result);
        return result;
    }
}