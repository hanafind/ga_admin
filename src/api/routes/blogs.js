const express = require('express');
const router = express.Router();

const controllers = require('../controllers');

router.get('/', async (req, res, next) => {
    const { Client } = require('pg')
    const client = new Client({
        host: '192.168.10.33',
        port: 5432,
        user: 'local',
        password: '12341234',
        database: 'dblgap'
      })
    await client.connect()
    
    const res1 = await client.query('select * from public.post_categories', []);
    console.log(res1.rows[0]) // Hello world!
    await client.end()
    res.send(res1.rows[0])
});

module.exports = router;