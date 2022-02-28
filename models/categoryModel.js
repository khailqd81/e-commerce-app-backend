const db = require('./db');
const tableName = "Categories";
const idCol = "category_id"
module.exports = {
    getAllCategory: async (orderCol) => {
        const result = await db.getAll(tableName, orderCol);
        return result;
    },

    getProductsByCategory: async (categoryName) => {
        const category = await db.getByValue(tableName, "category_name", categoryName);
        if (category[0]) {
            const result = await db.getByValue("Products", "category_id",category[0].category_id);
            return result;
        }
        return [];
    },
}