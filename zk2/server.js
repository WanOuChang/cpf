const http = require('http');
const fs = require('fs');

let type = {
    '/json': 'application/json',
    '/txt': 'text/plain;charset=utf-8',
    '/jpg': 'image/jpeg'
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': type[req.url] });
    if (req.url === '/json') {
        console.log('json')
        res.end(JSON.stringify({ code: 1, title: '玩偶' }))
    } else if (req.url === '/txt') {
        res.end('玩偶')
    } else if (req.url === "/jpg") {
        let bufimg = fs.readFileSync('./3.jpg')
        res.end(bufimg)
    } else {
        console.log('玩偶 -- 练习')
    }
})

server.listen(3000, () => {
    console.log('服务启动成功')
})