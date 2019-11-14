const router = require('koa-router')();

const bannerRouter = require('./banner');

router.use(bannerRouter.routes(), bannerRouter.allowedMethods());



module.exports = router;