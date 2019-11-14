const connection = require('../db/index');

module.exports = () => {

    return async(ctx, next) => {
        ctx.mysql = {};
        let queryFun = (sql, params = []) => {
            return new Promise((resolve, reject) => {
                connection.query(sql, params, (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data)
                    }
                })
            })
        }
        ctx.mysql.query = queryFun;
        await next();

    }
}