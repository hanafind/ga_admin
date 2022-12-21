let blogs = {};

blogs.getCategories = require('./getCategories');
blogs.uploadAttachFiles = require('./uploadAttachFiles');
blogs.setPost = require('./setPost');
blogs.getPosts = require('./getPosts');
blogs.getPostsTotalCount = require('./getPostsTotalCount');
blogs.setCategoryMap = require('./setCategoryMap');
blogs.setRecommendPosts = require('./setRecommendPosts');
blogs.getPostByIdx = require('./getPostByIdx');
blogs.getRecommendPosts = require('./getRecommendPosts');

module.exports = blogs;
