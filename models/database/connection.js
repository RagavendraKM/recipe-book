const { Client } = require('pg');

var client = new Client({
    user: "admin",
    password: "admin",
    database: "recipe",
    host: "localhost",
    port: 5432
})

function connectToDb() {
    var db = process.env.DATABASE_URL;

    return client.connect();
}

module.exports = { connectToDb, client }
