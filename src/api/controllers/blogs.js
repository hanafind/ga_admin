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
    req.body.post_idx = data[0].idx;
    data = await services.blogs.setCategoryMap(req, res);
    modules.json_response.success(res, data);
};

controllers.getPosts = async (req, res) => {
    let data = await services.blogs.getPosts(req, res);
    modules.json_response.success(res, data);
};

controllers.setRecommendPosts = async (req, res) => {
    let data = await services.blogs.setRecommendPosts(req, res);
    modules.json_response.success(res, data);
};

controllers.getPostByIdx = async (req, res) => {
    let data = await services.blogs.getPostByIdx(req, res);
    modules.json_response.success(res, data);
};

controllers.getRecommendPosts = async (req, res) => {
    let data = await services.blogs.getRecommendPosts(req, res);
    modules.json_response.success(res, data);
};

controllers.updatePost = async (req, res) => {
    let data = await services.blogs.updatePost(req, res);
    modules.json_response.success(res, data);
};

module.exports = controllers;