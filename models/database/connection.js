const { Client } = require('pg');

var client = new Client({
    connectionString : process.env.DATABASE_URL + "?ssl=true"
})

function connectToDb() {

    return client.connect();
}

module.exports = { connectToDb, client }