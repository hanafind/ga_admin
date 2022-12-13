const express = require('express');
const router = express.Router();

const controllers = require('../controllers');

router.get('/', async (req, res, next) => {
    
    res.send('ㅎㅎㅎㅎㅎ')
});

module.exports = router;