const modules = require('../../modules');
const services = require('../services');

const controllers = {};

controllers.getCategories = async (req, res) => {
    let data = await services.blogs.getCategories(req, res);
    modules.json_response.success(res, data);
};

controllers.uploadAttachFiles = async (req, res) => {
    let data = await services.blogs.uploadAttachFiles(req, res);
    modules.json_response.success(res, data);
};

controllers.setPost = async (req, res) => {
    let data = await services.blogs.setPost(req, res);
    modules.json_response.success(res, data);
};

module.exports = controllers;