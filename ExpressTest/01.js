const express = require('express');
let app = express();
app.get('/',(req,res) => {
  res.send('啦啦啦啦啦~');
});
app.get('/123',(req,res) => {
  res.send('丢雷楼某')
})
app.listen(3000);
console.log('服务启动成功');