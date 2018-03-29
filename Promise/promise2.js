function asyncSetimeOut (time) {
    // body
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve(parseInt(Math.random()*10))
        },time)
    });
}
asyncSetimeOut(1000)
.then((data) => {
    console.log(data);
    return asyncSetimeOut(500);
})
.then((data) => {
    console.log(data);
    return asyncSetimeOut(1000)
})
.then((data) => {
    console.log(data);
})