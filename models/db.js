// const { TableName } = require('pg-promise');
const pgp = require('pg-promise')({
    capSQL: true
});

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'my_store',
    user: 'postgres',
    password: '123456',
    max: 30
};

const db = pgp(cn);
const schema = "public";

exports.getAll = async (tableName, sortCol) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema });
    const queryString = pgp.as.format('SELECT * from ${table} ORDER BY ${sortCol~}', { table, sortCol });

    try {
        const result = await db.any(queryString);
        return result;
    } catch (error) {
        console.log('Error getAll from db: ', error);
    }
}

exports.getByValue = async (tableName, colName, value) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema });
    const queryString = pgp.as.format('SELECT * from ${table} WHERE ${colName~}=${value}', { table, colName, value });
    try {
        const result = await db.any(queryString);
        return result;
    } catch (error) {
        console.log('Error getByValue from db: ', error);
    }
}

exports.create = async (tableName, data) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema });
    const queryString = pgp.helpers.insert(data, null, table) + 'RETURING *';
    try {
        const result = await db.one(queryString);
        return result;
    } catch (error) {
        console.log('Error create from db: ', error);
    }
}

exports.update = async (tableName, data, conditionCol, value) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema });
    const condition = pgp.as.format('WHERE ${conditionCol~}=${value}', { conditionCol, value });
    const queryString = pgp.helpers.update(data, null, table) + condition + 'RETURING *';
    try {
        const result = await db.any(queryString);
        return result;
    } catch (error) {
        console.log('Error getAll from db: ', error);
    }
}

exports.delete = async (tableName, colName, value) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema });
    const queryString = pgp.as.format('DELETE from ${table} WHERE ${colName~}=${value} RETURING *', { table, colName, value });

    try {
        const result = await db.any(queryString);
        return result;
    } catch (error) {
        console.log('Error getAll from db: ', error);
    }
}
