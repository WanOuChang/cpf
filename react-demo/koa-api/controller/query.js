const connection = require('./index');

module.exports = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        console.log(sql, params)
        connection.query(sql, params, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    })
}