const db = require('../../databases');
const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        req.sql = {};
        req.sql.query = {};

        let category_idx = req.query.category_idx;
        let is_visible = req.query.is_visible;
        let keyword = req.query.keyword;
        let page = parseInt(req.query.page)-1;
        let row = parseInt(req.query.row);

        req.sql.query.category_idx = '';
        if(category_idx){
            req.sql.query.category_idx = ` AND pc.idx = ${category_idx}`;
        }

        req.sql.query.is_visible = '';
        if(is_visible){
            req.sql.query.is_visible = ` AND p.is_visible = ${new Boolean(is_visible)} `;
        }

        req.sql.query.keyword = '';
        if(keyword){
            let keywordArr = keyword.split(' ');
            let keywordSimilar = '';
            for(let i=0;i<keywordArr.length;i++){
                keywordSimilar += keywordArr[i];
            }
            req.sql.query.keyword = ` AND (p.title || p.contents) similar to '%(${keywordSimilar})%' `;
        }

        req.sql.values = [
            row,
            (page<1?0:row*page),
        ];
        let totalCount = await db.blogs.getPostsTotalCount(req, res);
        let data = await db.blogs.getPosts(req, res);
        
        return {total_count: totalCount[0].total_count, data: data};
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
        return;
    }
}