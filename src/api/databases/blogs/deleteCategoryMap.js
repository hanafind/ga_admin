const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = `
        DELETE FROM public.posts_post_categories_map
        WHERE posts_idx = $1
        returning *;
        `;
        return await modules.pg.query(sql, req.sql.values);

    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}