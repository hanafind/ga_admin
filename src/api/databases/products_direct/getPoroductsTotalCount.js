const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{

        let sql = `
        SELECT
            count(pd.idx) as total_count
            FROM
            insurance.product_direct as pd, insurance.product_direct_category as pdc, insurance.company as c
            WHERE
                is_deleted = false
                AND
                pd.product_direct_category_idx = pdc.idx
                AND
                pd.company_idx = c.idx
                ${req.sql.query.category_idx}
                ${req.sql.query.is_visible}
                ${req.sql.query.keyword}
        `;

        return await modules.pg.query(sql, []);
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}