let databases = {};

databases.blogs = require('./blogs');
databases.auths = require('./auths');
databases.products_direct = require('./products_direct');

module.exports = databases;