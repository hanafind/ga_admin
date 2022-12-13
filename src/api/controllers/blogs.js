const modules = require('../../modules');

const controller = {};

controller.getContentsList = async (req, res) => {
    //modules.response.success(res, {});
};

controller.getCategories = async (req, res) => {
    await modules.json_response(res, {});
};

module.exports = controller;