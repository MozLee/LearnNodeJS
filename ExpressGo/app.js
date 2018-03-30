const express = require('express');
const app = express();
const data = require('./modules/data');
//静态路由
app.use('/public',express.static(__dirname+'/public'));
//动态路由
app.get('/',(req,res) => {
    res.sendFile(__dirname+'/views/index.html');  
})
//数据接口
app.get('/data',(req,res) => {
    res.send(JSON.stringify(data));
})
app.listen(3000,() => {
    console.log(`服务器启动成功，监听3000端口`);
})
