const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{

        let sql = `
        SELECT
            c.idx as company_idx, c.name as company_name,
	        pdc.idx as category_idx, pdc.name as category_name,
	        pd.idx, pd.name, pd.description, pd.url, pd.is_visible, pd.created_at
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
            ORDER BY pd.idx DESC
            LIMIT $1
            OFFSET $2
        `;

        return await modules.pg.query(sql, req.sql.values);
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}