const express = require('express');
const router = express.Router();

const controllers = require('../controllers');

/**
* @swagger
* paths:
*  /api/blogs/categories:
*   get:
*     tags: [Blogs]
*     summary: 카테고리 조회
*     responses:
*       "200":
*         description:
*/
router.get('/categories', async (req, res, next) => {
    await controllers.blogs.getCategories(req, res);
});

router.post('/posting', async (req, res, next) => {
    //await controllers.blogs.getCategories(req, res);
});

module.exports = router;