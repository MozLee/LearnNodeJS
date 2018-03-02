/**
 * 
 * 
 * @param {需要绑定滚轮事件的元素} element 
 * @param {向上滚动触发的回调函数} wheelUpFn 
 * @param {向下滚动出发的回调函数} wheelDownFn 
 */
function onMouseWheel (element,wheelUpFn,wheelDownFn) {
    element.addEventListener('mousewheel',wheel);
    element.addEventListener('DOMMouseScroll',wheel);
    // body
    function wheel(e) {
        let der = true; //deraction 默认为true 向上方向
        if (e.wheelDelata) { //chrome兼容
            d = e.wheelDelata > 0 ? true : false;
        } else if (e.detail) { //firefox兼容
            d = e.detail < 0 ? true : false;
        }
        //TODO判断是否传入函数以及修改函数中this指向以及
        //FIXME:写入判断函数函数
        if(der){
            console.log('向上');
        }else{
            console.log('向下');
        }
    }
}