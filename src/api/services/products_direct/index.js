let products_direct = {};

products_direct.getCategories = require('./getCategories');
products_direct.getCompanies = require('./getCompanies');
products_direct.addProduct = require('./addProduct');
products_direct.getProducts = require('./getProducts');
products_direct.getProduct = require('./getProduct');
products_direct.updateProduct = require('./updateProduct');
products_direct.setRecommends = require('./setRecommends');
products_direct.getRecommends = require('./getRecommends');

module.exports = products_direct;