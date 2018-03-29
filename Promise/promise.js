let p = new Promise(function(resolve, reject) {
     setTimeout(() => {
         let a = 2;
         resolve(a);
     },2000);
});
p.then((data) => {
    console.log(data);
},(error) => {
    console.log(error);
})