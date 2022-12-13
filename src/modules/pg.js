const { Client } = require('pg');
const config = require(`../../config/${process.env.NODE_ENV}.json`);

console.log(process.env.NODE_ENV)
console.log(config.postgresql)
const client = new Client(config.postgresql);

const query = async(sql, values)=>{
    await client.connect();
    const res = await client.query(sql, values);
    await client.end();
    return res.rows;
};

module.exports = {
    query: query
}