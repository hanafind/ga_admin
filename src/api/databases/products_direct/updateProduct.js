const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = `
        UPDATE insurance.product_direct
        SET
            company_idx = $1,
            product_direct_category_idx = $2,
            name = $3,
            description = $4,
            url = $5,
            is_visible = $6,
            updated_at = now()
        WHERE idx = $7
        returning *;
        `;
        return await modules.pg.query(sql, req.sql.values);
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}