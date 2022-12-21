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
//카테고리 조회
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

//파일 첨부
router.post('/attach', upload.single('file'), async (req, res, next) => {
  await controllers.blogs.uploadAttachFiles(req, res);
});

/**
* @swagger
* paths:
*  /api/blogs/posts:
*   get:
*     tags: [Blogs]
*     summary: 글 조회
*     parameters:
*       - in : query
*         name: category_idx
*         required: false
*         schema:
*           type: integer
*         description: 카테고리 고유번호
*       - in : query
*         name: is_visible
*         required: false
*         schema:
*           type: boolean
*         description: true=노출, false=비노출
*       - in : query
*         name: keyword
*         required: false
*         schema:
*           type: string
*         description: 검색어
*       - in : query
*         name: page
*         required: true
*         schema:
*           type: integer
*         description: 페이지 번호 1++
*       - in : query
*         name: row
*         required: true
*         schema:
*           type: integer
*         description: 글 갯수
*     responses:
*       "200":
*         description:
*/
//글 목록 조회
router.get('/posts', async (req, res, next) => {
  await controllers.blogs.getPosts(req, res);
});

//글 조회
router.get('/post/:idx', async (req, res, next) => {
  await controllers.blogs.getPostByIdx(req, res);
});

//추천 포스트 설정
router.post('/recommends', async (req, res, next) => {
  await controllers.blogs.setRecommendPosts(req, res);
});

//추천 컨텐츠 조회
router.get('/recommends', async (req, res, next) => {
  await controllers.blogs.getRecommendPosts(req, res);
});


module.exports = router;