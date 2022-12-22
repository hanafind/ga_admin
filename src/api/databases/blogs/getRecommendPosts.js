const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{

        let sql = `
        SELECT
            p.idx,
	        pc.idx as category_idx, pc.name, pc.name_ko,
	        p.title, p.cover_image_url, p.created_at, p.posting_date, p.audit_grant_start_date, p.audit_grant_end_date, p.is_visible
            FROM
                public.posts as p, public.posts_post_categories_map as pcm, public.post_categories as pc, public.post_recommends as pr
            WHERE
                p.idx = pcm.posts_idx
                AND p.idx = pr.posts_idx
                AND pc.idx = pcm.post_categories_idx
            ORDER BY pr.order_num ASC
        `;
        return await modules.pg.query(sql, [])
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}