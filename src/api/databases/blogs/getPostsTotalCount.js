const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{

        let sql = `
        SELECT
            count(p.idx) as total_count
            FROM
                public.posts as p, public.posts_post_categories_map as pcm, public.post_categories as pc
            WHERE
                p.idx = pcm.posts_idx
                AND pc.idx = pcm.post_categories_idx
                ${req.sql.query.category_idx}
                ${req.sql.query.is_visible}
                ${req.sql.query.keyword}
        `;
        return await modules.pg.query(sql, [])
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}