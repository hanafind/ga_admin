const modules = require('../../modules');
const services = require('../services');

const controllers = {};

controllers.getCategories = async (req, res) => {
    let data = await services.products_direct.getCategories(req, res);
    modules.json_response.success(res, data);
};

controllers.getCompanies = async (req, res) => {
    let data = await services.products_direct.getCompanies(req, res);
    modules.json_response.success(res, data);
};

controllers.addProduct = async (req, res) => {
    let data = await services.products_direct.addProduct(req, res);
    modules.json_response.success(res, data);
};

controllers.getProducts = async (req, res) => {
    let data = await services.products_direct.getProducts(req, res);
    modules.json_response.success(res, data);
};

controllers.getProduct = async (req, res) => {
    let data = await services.products_direct.getProduct(req, res);
    modules.json_response.success(res, data);
};

controllers.updateProduct = async (req, res) => {
    let data = await services.products_direct.updateProduct(req, res);
    modules.json_response.success(res, data);
};

controllers.setRecommends = async (req, res) => {
    let data = await services.products_direct.setRecommends(req, res);
    modules.json_response.success(res, data);
};

controllers.getRecommends = async (req, res) => {
    let data = await services.products_direct.getRecommends(req, res);
    modules.json_response.success(res, data);
};

module.exports = controllers;