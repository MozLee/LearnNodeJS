const express = require('express');
let app = express();
app.get('/',(req,res) => {
  res.send('啦啦啦啦啦~')  
});
app.listen(3000);