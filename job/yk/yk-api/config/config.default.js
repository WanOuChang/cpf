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
    config.keys = appInfo.name + '_1574217024349_1493';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
        mysql: {
            client: {
                host: 'localhost',
                user: 'root',
                password: 'root',
                port: 3306,
                database: 'yka'
            },
            app: true,
            agent: false,
        },
        securify: {
            csrf: false,
        }
    };

    return {
        ...config,
        ...userConfig,
    };
};