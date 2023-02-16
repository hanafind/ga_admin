const db = require('../../databases');
const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        req.sql = {};

        req.sql.values = [
            req.body.company_idx,
            req.body.category_idx,
            req.body.product_name,
            req.body.product_description,
            req.body.product_url,
            req.body.is_visible,
            req.body.idx
        ];

        return await db.products_direct.updateProduct(req, res);
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
        return;
    }
}