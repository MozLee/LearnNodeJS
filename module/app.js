let add = require('./diy');
// add.add(1,2).then((data) => {
//    console.log('计算成功,结果为',data); 
// })

async function addGropu() {
    let a = await add.add(1,2);
    let b = await add.add(2,2);
    let c = await add.add(0,1);
    return [a,b,c];
}
addGropu().then((data) => {
    console.log(data);
})