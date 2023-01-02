const modules = require('../../../modules');
const auths = {};

auths.login = async(req, res)=>{
    try{
        let sql = `
        SELECT
            idx, id, password, authorized_level, is_block
        FROM
            admin.administrators
        WHERE
            id = $1 AND password = $2
        ;
        `;
        return await modules.pg.query(sql, req.sql.values);
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
};

auths.logout = ()=>{

};

module.exports = auths;
