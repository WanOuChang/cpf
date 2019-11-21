'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async login(username, password) {
        return await this.app.mysql.query('select * from userlist where username=? and password=?', [username, password])
    }
}

module.exports = UserService;