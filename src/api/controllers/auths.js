const modules = require('../../modules');
const db = require('../databases');

const controllers = {};

controllers.login = async (req, res) => {
    
    let id = req.body.id;
    let password = req.body.password;

    req.sql = {};
    req.sql.values = [id, password];

    let data = await db.auths.login(req, res);
    if(!data || data.length<1){
        modules.json_response.error(res, {code: 401});
        return;
    } else {
        req.session.is_login = true;
        req.session.login_id = id;
        modules.json_response.success(res, {});
    }
};

module.exports = controllers;