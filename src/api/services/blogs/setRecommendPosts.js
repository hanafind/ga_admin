const db = require('../../databases');
const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        req.sql = {};
        req.sql.values = [];

        for(let i=0;i<req.body.length;i++){
            req.sql.values.push([req.body[i], i]);
        }

        console.log(req.sql.values);

        let result = await db.blogs.setRecommendPosts(req, res);
        
        return result;
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
        return;
    }
}