const db = require('../../databases');
const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        req.sql = {};
        
        req.sql.values = [
            req.query.idx
        ];

        return await db.products_direct.getProduct(req, res);
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
        return;
    }
}