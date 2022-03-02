const db = require('./db');
const tableName = "Accounts";
const colId = "account_id"
module.exports = {
    getAllUser: async () => {
        const users = await db.getAll(tableName, colId);
        return users;
    },

    getUser: async (username) => {
        const user = await db.getByValue(tableName, "username", username);
        return user[0];
    },

    createUser: async (user, colList) => {
        const newUser = await db.create(tableName,colList, user);
        return newUser;
    },

    updateUser: async (user) => {
        const editUser = await db.update(tableName, user, "account_id", user.account_id);
        return editUser;
    },

    deleteUser: async (user) => {
        const returnUser = await db.delete(tableName, "account_id", user.account_id);
        return returnUser;
    }
}