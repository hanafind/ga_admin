const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = modules.pg_format.format(`
        INSERT INTO blog.post_recommends
        (
            posts_idx, order_num
        )
        VALUES %L
        returning *;
        `, req.sql.values);
        sql = 'truncate table blog.post_recommends restart identity;'+sql

        return await modules.pg.query(sql, [])
        
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}