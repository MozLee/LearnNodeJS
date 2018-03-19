let str = 'www.baidu.com,wwww.asdf.asdf.qweqwe.wwww'
let re = /w+/g;
// let newStr = str.replace(re,(item)=>{
//     return '*'.repeat(item.length);
// })

let newStr = str.replace(re, item => '*'.repeat(item.length));

console.log(newStr);
let re2 = /[_0-9a-zA-Z]+@[0-9a-zA-Z]+(\.[a-z]{2,5}){1,3}/g
let re3 = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g
console.log(re2.test('68879747@qq.com1211113'));

let re4 = /123/;
let str2 = '1234'
console.log(re4.test('1234'));