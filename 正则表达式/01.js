let str = 'm123msad231jkj3k2jkj1j23';
let numArr = [];
//需求一 找到字符串中所有的数字，放入数组中
let re = /\d/g;
let arr = str.match(re);
console.log(arr);
//需求二 找到字符串中所有的连续的数字，放在数组中
let re2 = /\d\d+/g
let arr2 = str.match(re2);
console.log(arr2);