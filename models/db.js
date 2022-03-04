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

exports.getFromTwoTable = async (tableName1, tableName2, colName1, colName2, value) => {
    const table1 = new pgp.helpers.TableName({ table: tableName1, schema });
    const table2 = new pgp.helpers.TableName({ table: tableName2, schema });
    const queryString = pgp.as.format('SELECT * from ${table1},${table2} WHERE (${table1}.${colName1~}=${table2}.${colName1~}) AND (${table1}.${colName2~}=${value})', {
        table1,
        table2,
        colName1,
        colName2,
        value
    })
    console.log("Qstr: ",queryString);
    try {
        const result = await db.any(queryString);
        return result;
    } catch (error) {
        console.log('Error getFrom2Table from db: ', error);

    }
}

exports.create = async (tableName, colList, data) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema });
    const queryString = pgp.helpers.insert(data, colList, table) + 'RETURNING *';
    try {
        const result = await db.one(queryString);
        return result;
    } catch (error) {
        console.log('Error create from db: ', error);
    }
}

exports.update = async (tableName, data, conditionCol, value) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema });
    const condition = pgp.as.format(' WHERE ${conditionCol~}=${value}', { conditionCol, value });
    const queryString = pgp.helpers.update(data, null, table) + condition + ' RETURNING *';
    try {
        const result = await db.any(queryString);
        return result;
    } catch (error) {
        console.log('Error update from db: ', error);
    }
}

exports.updateTwoConditions = async (tableName, data, conditionCol1, value1, conditionCol2, value2) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema });
    const condition = pgp.as.format(' WHERE (${conditionCol1~}=${value1}) AND (${conditionCol2~}=${value2})', { conditionCol1, value1,conditionCol2, value2 });
    const queryString = pgp.helpers.update(data, null, table) + condition + ' RETURNING *';
    try {
        const result = await db.any(queryString);
        return result;
    } catch (error) {
        console.log('Error update from db: ', error);
    }
}

exports.delete = async (tableName, colName, value) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema });
    const queryString = pgp.as.format('DELETE from ${table} WHERE ${colName~}=${value} RETURNING *', { table, colName, value });

    try {
        const result = await db.any(queryString);
        return result;
    } catch (error) {
        console.log('Error delete from db: ', error);
    }
}
