let blogs = {};

blogs.getCategories = require('./getCategories');
blogs.uploadAttachFiles = require('./uploadAttachFiles');
blogs.setPost = require('./setPost');
blogs.getPosts = require('./getPosts');
blogs.setCategoryMap = require('./setCategoryMap');
blogs.setRecommendPosts = require('./setRecommendPosts');
blogs.getPostByIdx = require('./getPostByIdx');
blogs.getRecommendPosts = require('./getRecommendPosts');
blogs.updatePost = require('./updatePost');

module.exports = blogs;