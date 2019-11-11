const { query } = require('../config/index');

module.exports.put = async ctx => {
    const $sql = `insert into koalist (create_time, title, author, significance, reading_num, status) values (?,?,?,?,?,?)`;
    const $params = ctx.request.body;
    const results = await query($sql, $params);
    console.log(results)
}