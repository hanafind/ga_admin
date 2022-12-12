const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) =>{
    res.render(`login`, { title: '', url : req.url });
});

module.exports = router;