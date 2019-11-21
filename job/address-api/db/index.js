const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'address'
})

connection.connect()

module.exports = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    })
}