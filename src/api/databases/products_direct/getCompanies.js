const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = `
        SELECT idx, type, name, logo_url
        FROM insurance.company order by name;
        `;
        return await modules.pg.query(sql, []);
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}