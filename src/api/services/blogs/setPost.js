const db = require('../../databases');
const modules = require('../../../modules');

module.exports = async (req, res)=>{
    try{
        let title = req.body.title;
        let contents = req.body.contents;
        let cover_image_url = req.body.cover_image_url;
        let cover_image_desc = req.body.cover_image_desc;
        let meta_title = req.body.meta_title;
        let meta_desc = req.body.meta_desc;
        let meta_keywords = req.body.meta_keywords;
        let is_visible = req.body.is_visible;
        let audit_num_year = req.body.audit_num_year;
        let audit_num_month = req.body.audit_num_month;
        let audit_num_index = req.body.audit_num_index;
        let audit_grant_start_date = req.body.audit_grant_start_date;
        let audit_grant_end_date = req.body.audit_grant_end_date;
        let posting_date = req.body.posting_date;
        let is_audit = req.body.is_audit;
        let url_slug = req.body.url_slug;
        let cover_type = req.body.cover_type;
        let cover_video_url = req.body.cover_video_url;

        let filePath = cover_image_url.substr(0, cover_image_url.lastIndexOf('/')+1);
        let fileName = cover_image_url.substring(cover_image_url.lastIndexOf('/')+1, cover_image_url.lastIndexOf('.'));
        let fileType = cover_image_url.substring(cover_image_url.lastIndexOf('.'), cover_image_url.length);

        let cover_image_urls = {
            original: cover_image_url,
            w720: `${filePath}${fileName}-w720${fileType}`,
            w1440: `${filePath}${fileName}-w1440${fileType}`,
            w1980: `${filePath}${fileName}-w1980${fileType}`,
        }

        if(!audit_grant_start_date){
            audit_grant_start_date = null;
        }

        if(!audit_grant_end_date){
            audit_grant_end_date = null;
        }

        req.sql = {};
        req.sql.values = [
            title,//1
            contents,//2
            cover_image_url,//3
            cover_image_desc,//4
            meta_title,//5
            meta_desc,//6
            meta_keywords,//7
            is_visible,//8
            audit_num_year,//9
            audit_num_month,//10
            audit_num_index,//11
            audit_grant_start_date,//12
            audit_grant_end_date,//13
            posting_date,//14
            is_audit,//15
            url_slug,//16
            cover_type,//17
            cover_video_url,//18
            cover_image_urls//19
        ];
        return await db.blogs.setPost(req, res);
    } catch(err){
        modules.json_response.error(res, {code: 500}, err);
        return;
    }
}