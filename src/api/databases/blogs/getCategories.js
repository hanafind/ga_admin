const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = `
        SELECT idx, name, name_ko, created_at
        FROM public.post_categories;
        `;
        return await modules.pg.query(sql, values)
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}