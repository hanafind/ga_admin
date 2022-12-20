const db = require('../../databases');
const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        console.log('ggggg')
        console.log(req.body);
        let post_idx = req.body.post_idx;
        let post_categories_idx = req.body.post_categories_idx;
        req.sql = {};
        req.sql.values = [
            post_idx,//1
            post_categories_idx//2
        ];
        return await db.blogs.setCategoryMap(req, res);
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
        return;
    }
}