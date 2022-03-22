const db = require('./db');
const tableName = "Comments"
module.exports = {
    getCommentByProId: async (product_id) => {
        const result = await db.getByValue(tableName,"product_id",product_id);
        return result;
    },

    addComment: async (comment) => {
        let orderDetailRow = await db.getByTwoValue("OrderDetail","order_id",comment.order_id,"product_id",comment.product_id);
        if (orderDetailRow && orderDetailRow[0]) {
            orderDetailRow[0].is_comment = true;
            const updateRow = await db.updateTwoConditions("OrderDetail",orderDetailRow[0],"order_id",orderDetailRow[0].order_id,"product_id",orderDetailRow[0].product_id);
            if (updateRow) {
                const result = await db.create(tableName,Object.keys(comment),comment);
                return result;
            }
        }
        return [];
    }
}