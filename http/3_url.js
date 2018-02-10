/*
   学习使用url模块
*/
//先引入http模块
const http = require('http');

//引入url模块
const url = require('url');

//创建http服务
http.createServer((res,req)=>{
   if(res.url== '/favicon'){
       return;
   }
   let pathName = url.parse(res.url,true).path;
   console.log(pathName);
   req.end(pathName)
}).listen(3000,'127.0.0.1');
console.log('服务器运行成功')