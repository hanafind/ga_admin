const express = require('express');
const router = express.Router();

const config = require(`../../../config/${process.env.NODE_ENV}.json`);
const controllers = require('../controllers');
const modules = require('../../modules');

//카테고리 조회
router.get('/categories', async (req, res, next) => {
    await controllers.products_direct.getCategories(req, res);
});

//회사 조회
router.get('/companies', async (req, res, next) => {
    await controllers.products_direct.getCompanies(req, res);
});

//상품 등록
router.post('/product', async (req, res, next) => {
    await controllers.products_direct.addProduct(req, res);
});

//상품 조회
router.get('/products', async (req, res, next) => {
    await controllers.products_direct.getProducts(req, res);
});

//상품 조회
router.get('/product', async (req, res, next) => {
    await controllers.products_direct.getProduct(req, res);
});

//상품 수정
router.put('/product', async (req, res, next) => {
    await controllers.products_direct.updateProduct(req, res);
});

//상품 추천 등록
router.post('/recommends', async (req, res, next) => {
    await controllers.products_direct.setRecommends(req, res);
});

//츄천 상품 조회
router.get('/recommends', async (req, res, next) => {
    await controllers.products_direct.getRecommends(req, res);
});

module.exports = router;