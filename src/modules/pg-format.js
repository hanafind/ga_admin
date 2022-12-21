const pg_format = require('pg-format');

const format = (sql, values)=>{
    return pg_format(sql, values);
};

module.exports = {
    format: format
}