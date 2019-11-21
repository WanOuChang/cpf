'use strict';

const Service = require('egg').Service;

class UserService extends Service {

    // 判断用户名是否存在
    async find(username) {
        return await this.app.mysql.query('select * from userlist where username=?', [username])
    }

    // 注册
    async registry({ username, password, age }) {
        return await this.app.mysql.query('insert into userlist (username,password) values (?,?)', [username, password, age])
    }

    // 登录
    async login({ username, password }) {
        return await this.app.mysql.query('select * from userlist where username=? and password=?', [username, password])
    }

    // 注销
    async del(id) {
        return await this.app.mysql.query('delete from userlist where id=?', [id])
    }

    // 判断密码是否一致
    async pwdSome({ id, password }) {
        return await this.app.mysql.query('select * from userlist where id=? and password=?', [id, password])
    }

    // 修改密码
    async editPassword({ id, newpassword }) {
        return await this.app.mysql.query('update userlist set password=? where username=?', [id, newpassword])
    }

    // 更改用户信息
    async editInfo(username, age, id) {
        return await this.app.mysql.query('update userlist set username=?,age=? where id=?', [username, age, id]);
    }
}

module.exports = UserService;