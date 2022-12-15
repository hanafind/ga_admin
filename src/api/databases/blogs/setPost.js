const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = `
        INSERT INTO public.posts
        (
            title, contents, cover_image_url,
            cover_image_desc, meta_title, meta_desc,
            meta_keywords, is_visible, audit_num_year,
            audit_num_month, audit_num_index, audit_grant_start_date,
            audit_grant_end_date, is_deleted, created_at,
            posting_date, is_audit
        )
        VALUES(
            $1, $2, $3,
            $4, $5, $6,
            $7, $8, $9,
            $10, $11, $12,
            $13, false, now(),
            $14, $15
        )
        returning *;
        `;
        
        let result =  await modules.pg.query(sql, req.sql.values)
        return result;
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}