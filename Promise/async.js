function getDate () {
    // body
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            let date = Date.now();
            resolve(date);
        },1000)
    });
}
function getDate2 () {
    // body
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            let date = Date.now();
            reject('出错啦~~~~~~');
        },1000)
    });
}

async function doGetDate () {
    // body
    let a = await getDate();
    console.log(a);
    let b = await getDate();
    console.log(b);
    let c = await getDate2();
    console.log(c);
    return [a,b,c]
}
let a = doGetDate();
a.then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})