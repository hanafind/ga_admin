const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = `
        INSERT INTO insurance.product_direct
        (
            company_idx, product_direct_category_idx, name,
            description, url, is_visible
        )
        VALUES(
            $1, $2, $3,
            $4, $5, $6
        )
        returning *;
        `;
        
        return await modules.pg.query(sql, req.sql.values)
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}