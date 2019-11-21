/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1574228418379_3807';

    // add your middleware config here
    config.middleware = ['jwt'];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
        mysql: {
            client: {
                host: 'localhost',
                user: 'root',
                password: 'root',
                port: 3306,
                database: 'practice_test'
            },
            app: true,
            agent: false
        },
        security: {
            csrf: false,
        },
    };

    return {
        ...config,
        ...userConfig,
    };
};