const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = `
        INSERT INTO public.posts_post_categories_map
        (
            posts_idx, post_categories_idx, created_at
        )
        VALUES(
            $1, $2, now()
        )
        returning *;
        `;
        let result =  await modules.pg.query(sql, req.sql.values);
        return result;
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}