const http = require('http')
http.createServer((req, res) => {
    console.log('监听到请求啦~');
}).listen(process.env.npm_package_config_port, () => {
    console.log('server is running on ' + process.env.npm_package_config_port);
})