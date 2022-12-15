const express = require('express');
const router = express.Router();

const multer = require('multer');
const fs = require('fs');
const moment = require('moment');

const config = require(`../../../config/${process.env.NODE_ENV}.json`);
const controllers = require('../controllers');
const modules = require('../../modules');

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

//글작성
router.post('/post', async (req, res, next) => {
    await controllers.blogs.setPost(req, res);
});

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        let year = moment().format('YYYY');
        let month = moment().format('MM');
        
        let path = `${config.blog.upload_path}/blog/${year}/`;
        if(!fs.existsSync(path)){
            fs.mkdirSync(path);
        }

        path += month + '/';

        if(!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
        cb(null, path);
      },
      filename: function (req, file, cb) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, (file.originalname));
      }
    }),
});

router.post('/attach', upload.single('file'), async (req, res, next) => {
  await controllers.blogs.uploadAttachFiles(req, res);
});


module.exports = router;