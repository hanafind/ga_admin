const express = require('express');
const router = express.Router();

const controllers = require('../controllers');

router.get('/', async (req, res, next) => {
    //await controllers.blogs.(req, res);
    res.send('ㅎㅎㅎㅎ')
});

module.exports = router;