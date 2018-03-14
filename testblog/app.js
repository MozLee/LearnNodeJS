//引入express
const express = require('express');
const swig = require('swig')

//创建app
const app = express();

//设置模板
app.set('views','./views');
app.set('view engine','html');
app.engine('.html', swig.renderFile);
//取消模板缓存限制
swig.setDefaults({cache:false});

//静态资源
app.use('/public',express.static(__dirname+'/public'));

//路由
app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(3000);
console.log('服务器启动成功,监听3000端口');