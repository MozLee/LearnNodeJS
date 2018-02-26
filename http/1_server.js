/*
  使用http模块搭建一个简单的http服务器
*/
//引入http模块
var http = require('http');
//创建http服务
//回调函数传入request和 response
http.createServer(function(req,res) {
	// 响应头写回状态码与MIME类型
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	//响应必须有end结束
	res.end('访问成功')
	console.log('数据访问')
	//监听3000端口 ip127.0.0.1
}).listen(3000,'127.0.0.1');
console.log('服务器启动成功');