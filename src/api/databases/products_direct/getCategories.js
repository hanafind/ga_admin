const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = `
        SELECT idx, name
        FROM insurance.product_direct_category;
        `;
        return await modules.pg.query(sql, []);
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}