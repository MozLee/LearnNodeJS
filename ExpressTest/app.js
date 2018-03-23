const express = require('express');
let app = express();
app.use(express.static('www'));
app.listen(3000);  
console.log('服务器启动成功,监听3000端口');
