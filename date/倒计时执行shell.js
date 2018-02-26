let shell = require('shelljs')
let nDate = new Date(2018, 1, 15, 24, 00, 00);
let nT = nDate.getTime();
setInterval(() => {
    let date = new Date();
    let time = date.getTime();
    let h = parseInt(((nT - time)/1000)%86400/3600);
    let m = parseInt(((nT - time)/1000)%86400%3600/60);
    let s = parseInt((nT - time)/1000%60);
    shell.exec("clear")
    console.log('在2018年2月15日24时自动执行微信拜年');
    console.log('倒计时:' + addZero(h) + '时' + addZero(m) + '分' + addZero(s) + '秒');
    if(nT- time<=0){
        shell.exec("python3 ~/Desktop/wechat/HappyNewYear.py")
    }
}, 1000);
function addZero (m) {
    return m<10?'0'+m:m;
}