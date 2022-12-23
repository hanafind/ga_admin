const express = require('express');
const router = express.Router();

const controllers = require('../controllers');

router.post('/login', async (req, res, next) => {
    await controllers.auths.login(req, res);
});

module.exports = router;