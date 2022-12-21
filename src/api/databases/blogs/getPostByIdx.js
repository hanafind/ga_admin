const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = `
            SELECT
                p.idx,
                pc.idx as category_idx, pc.name, pc.name_ko,
                p.title, p.created_at, p.posting_date, p.audit_grant_start_date, p.audit_grant_end_date, p.is_visible
            FROM
                public.posts as p, public.posts_post_categories_map as pcm, public.post_categories as pc
            WHERE
                p.idx = pcm.posts_idx
                AND pc.idx = pcm.post_categories_idx
                AND p.idx = $1
        `;
        console.log(req.sql.values)
        let result =  await modules.pg.query(sql, req.sql.values);
        return result;
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}