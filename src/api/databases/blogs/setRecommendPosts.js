const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = modules.pg_format.format(`
        INSERT INTO public.post_recommends
        (
            posts_idx, order_num
        )
        VALUES %L
        returning *;
        `, req.sql.values);
        sql = 'truncate table public.post_recommends restart identity;'+sql
        console.log(sql)
        let result =  await modules.pg.query(sql, [])
        return result;
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}