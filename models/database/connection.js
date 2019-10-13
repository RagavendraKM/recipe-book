const { Client } = require('pg');

var client = new Client({
//     user: "admin",
//     password: "admin",
//     database: "recipe",
//     host: "localhost",
//     port: 5432
    connectionString : process.env.DATABASE_URL + "?ssl=true"
})

function connectToDb() {
    var db = process.env.DATABASE_URL;

    return client.connect();
}

module.exports = { connectToDb, client }
