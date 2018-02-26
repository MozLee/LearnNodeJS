let str = '我是谁啊，大傻子，你才是呢';
const re = /我|傻子|你/g
//replace 第二个参数可以是一个回调函数
let nstr = str.replace(re, (str) => {
    //console.log(str);
    let nstr = ''
    //用关键字匹配星星
    for (let i = 0; i < str.length; i++) {
        nstr += '*';
    }
    console.log(nstr);
    return nstr;
});

console.log(nstr);