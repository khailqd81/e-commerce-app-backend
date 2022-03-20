const db = require('./db');
const tableName = "Accounts";
const colId = "account_id"
module.exports = {
    getAllUser: async () => {
        const users = await db.getAll(tableName, colId);
        const returnUsers = users.filter(item => item.is_deleted === false)
        return returnUsers;
    },

    getUser: async (username) => {
        const user = await db.getByValue(tableName, "username", username);
        if (user.is_deleted) {
            return null;
        }
        return user[0];
    },

    getUserById: async (account_id) => {
        const user = await db.getByValue(tableName, colId, account_id);
        if (user.is_deleted) {
            return null;
        }
        return user[0];
    },

    createUser: async (user, colList) => {
        const newUser = await db.create(tableName, colList, user);
        return newUser;
    },

    updateUser: async (user) => {
        const editUser = await db.update(tableName, user, "account_id", user.account_id);
        return editUser;
    },

    deleteUser: async (user) => {
        const returnUser = await db.update(tableName, user, "account_id", user.account_id);
        return returnUser;
    },

}