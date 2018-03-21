let o = {
    // a:1,
    b:123
}
// o.a =123;
Object.prototype.a = 3;
console.log(o.hasOwnProperty('a'));
console.log(o.hasOwnProperty('aaa'));
console.log(o.a);
console.log(o.__proto__);
