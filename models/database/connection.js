const { Client } = require('pg');

var client = new Client({
    user: "admin",
    password: "admin",
    database: "recipe",
    host: "localhost",
    port: 5432
})

function connectToDb() {
    var db = "postgres://root:root@localhost/recipe";

    return client.connect();
}

module.exports = { connectToDb, client }