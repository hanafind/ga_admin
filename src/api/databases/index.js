let databases = {};

databases.blogs = require('./blogs');
databases.auths = require('./auths');

module.exports = databases;