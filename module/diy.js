function add (a,b) {
    // body
    console.log(`努力计算${a}+${b}`);
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            let num = a + b;
            console.log(`成功`);
            resolve(num);
        },2000)
    });
}
module.exports.add = add;