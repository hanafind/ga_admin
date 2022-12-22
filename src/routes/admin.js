const express = require('express');
const router = express.Router();

router.all('*', async (req, res, next) =>{
    res.render('index', { title: '', req : req });
});

module.exports = router;