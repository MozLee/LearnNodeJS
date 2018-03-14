//引入express
const express = require('express');
//创建app
const app = express();
//设置模板
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('views engine','html');

app.listen(3000);