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
//路由
app.get('/',(req,res)=>{
    res.render('index')
})


app.listen(3000);