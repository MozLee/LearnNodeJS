function wheel(e) {
    let der = true; //deraction 默认为true 向上方向

    if (e.wheelDelata) { //chrome兼容
        d = e.wheelDelata > 0 ? true : false;
    } else if (e.detail) { //firefox兼容
        d = e.detail < 0 ? true : false;
    }
    
    if(der){
        console.log('向上');
    }else{
        console.log('向下');
    }
}