const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{

        let sql = `
        SELECT
            c.idx as company_idx, c.name as company_name,
	        pdc.idx as category_idx, pdc.name as category_name,
	        pd.idx, pd.name, pd.description, pd.url, pd.is_visible, pd.created_at
            FROM
            insurance.product_direct as pd, insurance.product_direct_category as pdc, insurance.company as c,
            insurance.product_direct_recommend as pdr
            WHERE
                pd.product_direct_category_idx = pdc.idx
                AND
                pd.company_idx = c.idx
                AND
                pd.idx = pdr.product_direct_idx
        `;
        return await modules.pg.query(sql, []);
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}