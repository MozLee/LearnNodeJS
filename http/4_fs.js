//使用fs模块
//引入http
const http = require('http');
//引入url模块
const url = require('url');
//引入fs模块
const fs = require('fs')
//创建http服务
const server = http.createServer((res,req)=>{
  let path = url.parse(res.url).path;
  if(path == '/test'){
      fs.readFile('.'+path+'/index.html',(err,data)=>{
          if(err){
              throw err;
          } 
          req.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
          req.end(data);
      })
  }else{
    req.writeHead(400,{'Content-Type':'text/html;charset=utf-8'});
    req.end('走丢了');
  }
}).listen(3000,'127.0.0.1')
//未完成，明天接着测试