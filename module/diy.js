function add (a,b) {
    // body
    console.log(`努力计算${a}+${b}`);
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            let num = a + b;
            let r = Math.random()*10
            if(r>5){
                console.log(`成功`);
            resolve(num);
            }else{
                reject(`失败`);
            }
            
        },2000)
    });
}
module.exports.add = add;