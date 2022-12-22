const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = `
        UPDATE public.posts
        SET
            title = $1,
            contents = $2,
            cover_image_url = $3,
            cover_image_desc = $4,
            meta_title = $5,
            meta_desc = $6,
            meta_keywords = $7,
            is_visible = $8,
            audit_num_year = $9,
            audit_num_month = $10,
            audit_num_index = $11,
            audit_grant_start_date = $12,
            audit_grant_end_date = $13,
            posting_date = $14,
            is_audit = $15,
            url_slug = $16,
            updated_at = now()
        WHERE idx = $17
        returning *;
        `;
        
        return await modules.pg.query(sql, req.sql.values)
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}