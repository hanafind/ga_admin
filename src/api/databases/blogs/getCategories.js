const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = `
        SELECT idx, name, name_ko, created_at
        FROM public.post_categories;
        `;
        let values = req.queryValues;
        let result =  await modules.pg.query(sql, values)
        return result;
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}