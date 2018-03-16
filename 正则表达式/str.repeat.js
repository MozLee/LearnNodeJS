let str = 'www.baidu.com,wwww.asdf.asdf.qweqwe.wwww'
let re = /w+/g;
// let newStr = str.replace(re,(item)=>{
//     return '*'.repeat(item.length);
// })

let newStr = str.replace(re,item=> '*'.repeat(item.length));

console.log(newStr);