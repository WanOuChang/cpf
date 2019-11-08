// 引入 http 创建服务内置模块
const http = require('http');
// 创建子进程服务
let childServer = http.createServer((req, res) => {

})

// 接收主进程数据
process.on('message', (flig, server) => {
    if (flig === "server") {
        // 将子进程服务关联到主进程服务 TCP流
        server.on('connection', socket => {
            childServer.emit('connection', socket)
        })
    }
})

// 异常错误捕获
process.on('uncaughtException', () => {
    // 响应给主进程
    process.send({ msg: 'error' });
})