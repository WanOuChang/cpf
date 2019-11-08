// 引入cluster 内置模块
const cluster = require('cluster');
// 引入 http 创建服务内置模块
const http = require('http');
// 获取 CPU 数量 
let cpuLen = require('os').cpus().length;


// 判断是否是主进程
if (cluster.isMaster) {
    // 创建子进程
    for (let i = 0; i < cpuLen; i++) {
        cluster.fork();
    }
} else {
    // 创建服务
    http.createServer((req, res) => {
        if (req.url === '/list') {
            res.writeHead(200, { "Content-Type": 'text/plain;charset=utf-8' })
            res.end('世界那么大，我想去看看');
        } else {
            res.end('ok')
        }

    }).listen(3000)
}

// 退出重启
cluster.on('exit', (work) => {
    cluster.fork();
})