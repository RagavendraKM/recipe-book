var { client, connectToDb } = require('./models/database/connection');
var { selectAll, insert } = require('./models/database/recipe/query');
var router = require('./routes/routes');
const express = require('express');
const cons = require('consolidate');
const { pg, Pool, Client } = require('pg');
const path = require('path');
const bodyParser = require('body-parser');
const dust = require('dustjs-helpers');
const config = require('./config.json');

var app = express();

if(!process.env.NODE_RUNTIME) {
    process.env = { ...process.env,...config }
    console.log(process.env.DATABASE_URL);
}

connectToDb().then(() => {
    // Client is now connected
    console.log("Database connected");
}).catch((err) => {
    console.error('Error connecting: %s', err);
});


// Assign Dust Engine To .dust Files
app.engine("dust", cons.dust);

// .dust Default Ext.
app.set("view engine", "dust");
app.set("views", `${__dirname}/views`);

// Set Public Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);


app.listen(3000, () => {
    console.log(`Server started on 3000`);
});
