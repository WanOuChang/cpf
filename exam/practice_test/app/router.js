'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);

    // 登录
    router.post('/api/login', controller.user.login);

    router.get('/api/menu', controller.home.menu);
};