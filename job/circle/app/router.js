'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    // 注册
    router.post('/api/registry', controller.user.registry);
    // 登录
    router.post('/api/login', controller.user.login);
    // 注销
    router.get('/api/del', controller.user.del);
    // 修改密码
    router.post('/api/editPassword', controller.user.editPassword);
    // 修改信息
    router.post('/api/editInfo', controller.user.editInfo);
};