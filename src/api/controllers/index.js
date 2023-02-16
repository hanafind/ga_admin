let controllers = {};

controllers.blogs = require('./blogs');
controllers.auths = require('./auths');
controllers.products_direct = require('./products_direct');

module.exports = controllers;