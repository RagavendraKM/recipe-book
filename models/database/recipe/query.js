var { client } = require('../connection');

const { pg, Pool, Client } = require('pg');

const queries = {
    selectAll: "select * from recipes",
    selectSpecfic: `select * from recipes where id = $1`,
    insert: "insert into recipes(id,rname,r_ingredients,r_steps) values($1,$2,$3,$4)",
    delete: "delete from recipes where id=$1",
    update: "update recipes set rname=$1, r_ingredients=$2 ,r_steps=$3 where id=$4"
}

async function selectAll() {
    try {
        let result = await client.query(queries.selectAll);
        return result.rows;
    } catch (e) {
        return e;
    }
}

async function insert(id, name, ingredients, steps) {
    try {
        await client.query(queries.insert, [id, name, ingredients, steps]);
        return;
    } catch (e) {
        return e;
    }

}

module.exports = { selectAll, insert }