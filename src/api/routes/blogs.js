const express = require('express');
const router = express.Router();

const controllers = require('../controllers');

router.get('/categories', async (req, res, next) => {
    await controllers.blogs.getCategories(req, res);
});

module.exports = router;