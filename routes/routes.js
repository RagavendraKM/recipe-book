const express = require('express');

var { client, connectToDb } = require('../models/database/connection');
var { selectAll, insert } = require('../models/database/recipe/query');

var router = express.Router();

router.get('/', async (req, res) => {
    
    try {
        let result = await selectAll();
       res.render("index", { recipes: result });
    } catch (e) {
        console.log(e)
    }/* 
    client.query("select * from recipes where id=1")
        .then(result => {
            res.render("index", { recipes: result.rows });
            await client.query("insert into recipes(id,rname,r_ingredients,r_steps) values($1,$2,$3,$4)", result.rows[0]).then(r => {

            });
        }).catch(err => console.log(err)) */
})

router.post('/add', async (req, res) => {
    try {
        await insert(req.body.id, req.body.rname, req.body.r_ingredients, req.body.r_steps);
        res.redirect('/')
    } catch (e) {
        console.log(e);
        res.send('duplicate key')
    }/* 
    client.query("insert into recipes(id,rname,r_ingredients,r_steps) values($1,$2,$3,$4)",
        [req.body.id, req.body.rname, req.body.r_ingredients, req.body.r_steps])
        .then(res.redirect('/'))
        .catch(err => console.log(err)) // {error: 'duplicate'} */
});

router.delete('/delete/:id', (req, res) => {
    client.query("delete from recipes where id=$1", [req.params.id])
        .then(res.redirect('/'))
        .catch(err => console.log(err))
});

router.post('/edit', (req, res) => {
    client.query("update recipes set rname=$1, r_ingredients=$2 ,r_steps=$3 where id=$4",
        [req.body.rname, req.body.r_ingredients, req.body.r_steps, req.body.id])
        .then(res.redirect('/'))
        .catch(err => console.log(err))
});

module.exports = router;
