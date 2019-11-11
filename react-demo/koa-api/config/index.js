const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'koa-review'
})
connection.connect();

module.exports.query = function($sql, $params = []) {
    return new Promise((resolve, reject) => {
        connection.query($sql, $params, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};