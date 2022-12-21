const db = require('../../databases');
const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        return await db.blogs.getRecommendPosts(req, res);
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
        return;
    }
}