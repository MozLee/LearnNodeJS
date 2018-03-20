function Car (color,type) {
    // body
    this.color = color;
    this.type  = type;
}
Car.prototype.run = () => {
    console.log('我会跑');
}

let ggcar = new Car('white','X-RV');
console.log(ggcar.type);
ggcar.run();
console.log(ggcar.__proto__);
console.log(ggcar.__proto__.__proto__);
console.log(ggcar.__proto__.__proto__.__proto__);