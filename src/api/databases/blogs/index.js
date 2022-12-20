let blogs = {};

blogs.getCategories = require('./getCategories');
blogs.uploadAttachFiles = require('./uploadAttachFiles');
blogs.setPost = require('./setPost');
blogs.getPosts = require('./getPosts');
blogs.getPostsTotalCount = require('./getPostsTotalCount');
blogs.setCategoryMap = require('./setCategoryMap');

module.exports = blogs;
