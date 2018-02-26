//引入http模块
let http  = require('http');
let server  = http.createServer((req,res)=>{
	//判断request请求的url地址是否为/main
	console.log(req.url)
	if(req.url == '/main'){
    //响应头状态码200，返回html
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	res.end(`<h2>哈哈~你居然找到我了</h2>`)
	}else{
	//响应头状态码404，返回html
	res.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
	res.end(`<h1>404,不好意思走丢了</h1>`)
	}
});
//监听为局域网ip地址
server.listen(3000,'172.20.10.2');
console.log('局域网服务器172.20.10.2启动成功，监听3000端口');