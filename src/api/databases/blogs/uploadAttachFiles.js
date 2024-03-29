const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let sql = `
        INSERT INTO blog.post_attach_files
        (posts_idx, file_path, file_name, file_type, file_size, created_at, use_type)
        VALUES(NULL, $1, $2, $3, $4, NOW(), $5) returning *;
        `;
        
        return await modules.pg.query(sql, req.sql.values)

    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
    }
}