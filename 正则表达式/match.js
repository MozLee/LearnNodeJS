let str = '12asjalksjd23,.,.sd,d,.,232323.343.4asdad';
let re = /\d+/g
let re2 = /\D+/g
let result = str.match(re);
console.log(result);
console.log(str.match(re2));