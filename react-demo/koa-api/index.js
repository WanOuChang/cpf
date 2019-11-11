// 引入 koa 框架模块
const Koa = require('koa');
// 实例 app
const app = new Koa();
// 引入解析 post 请求中间件 
const bodyParser = require('koa-bodyparser');
// 引入静态资源处理中间件
const static = require('koa-static');
// 引入处理路由中间件
const router = require('koa-router')();
// 引入处理路径内置模块
const path = require('path');
const { put } = require('./controller/index')


// 使用 解析post请求中间件
app.use(bodyParser());

// 处理静态资源路径
app.use(static(path.join(process.cwd(), "public")));

// 处理路由
app.use(router.routes());
app.use(router.allowedMethods());

// 添加
router.post("/api/put", put)

// 修改
// router.post("/api/update", async(ctx, next) => {
//     let { create_time, title, author, significance, reading_num, status } = ctx.request.body;
//     let res = await new Promise((resolve, reject) => {
//         connect.query(`insert into koaList (create_time, title, author, significance, reading_num, status) values (?,?,?,?,?,?)`, [create_time, title, author, significance, reading_num, status], (error, data) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 console.log(data)
//                 resolve(data);
//             }
//         })
//     })
//     ctx.body = res;
// })


// 删除
// router.get("/api/del", async(ctx, next) => {

// })

// 列表
// router.get("/api/bookslist", async(ctx, next) => {
//     let res = await new Promise((resolve, reject) => {
//         connect.query('select * from koaList', (error, data) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 console.log(data)
//                 resolve(data);
//             }
//         })
//     })
//     console.log(res)
//     ctx.body = res;
// })






// 启动监听服务
app.listen(process.env.PORT || 3000, () => {
    console.log('服务启动成功')
})