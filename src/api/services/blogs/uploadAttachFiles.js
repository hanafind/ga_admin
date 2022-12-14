const db = require('../../databases');
const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let file_path = req.file.destination.substr(req.file.destination.indexOf('/uploads/'), req.file.destination.lenth);
        let file_name = req.file.filename;
        let file_type = req.file.mimetype;
        let file_size = req.file.size;
        let use_type = req.query.type;
        req.sql = {};
        req.sql.values = [
            file_path, file_name, file_type,
            file_size, use_type
        ];
        return await db.blogs.uploadAttachFiles(req, res);
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
        return;
    }
}