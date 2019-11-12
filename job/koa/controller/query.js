const connection = require('./index.js');
// console.log(connection)
module.exports = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        // console.log(sql, params)
        connection.query(sql, params, (error, data) => {
            if (error) {
                reject({ msg: 'error', error });
            } else {
                resolve({ msg: 'data', data })
            }
        })
    })
}