const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = modules.pg_format.format(`
        INSERT INTO insurance.product_direct_recommend
        (
            product_direct_idx, order_num
        )
        VALUES %L
        returning *;
        `, req.sql.values);
        sql = 'truncate table insurance.product_direct_recommend restart identity;'+sql

        return await modules.pg.query(sql, [])
        
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}