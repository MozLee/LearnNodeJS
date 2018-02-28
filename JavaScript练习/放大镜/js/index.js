//获取元素
const leftArea = document.querySelector('#left');
const mask = document.querySelector('#mask');
const rightImg = document.querySelector('#right img');
const rightBorder = document.querySelector('#border')
//处理比例
rightImg.style.width = rightBorder.clientWidth/(parseInt(getComputedStyle(mask).width)/leftArea.clientWidth) +'px';
rightImg.style.height = rightBorder.clientHeight/(parseInt(getComputedStyle(mask).height)/leftArea.clientHeight) + 'px';
console.log(rightBorder.clientWidth,parseInt(getComputedStyle(mask).height),leftArea.clientWidth)
//mask移动
leftArea.onmousemove = (e) => {
    //定位缩略图区
    mask.style.display = 'block';
    let disX = e.clientX - leftArea.getBoundingClientRect().left -
        mask.clientWidth / 2;
    let disY = e.clientY - leftArea.getBoundingClientRect().top -
        mask.clientHeight / 2;

    // 处理边界
    if(disX<0){
        disX=0;
    }
    if(disY<0){
        disY=0;
    }
    if(disX>leftArea.clientWidth-mask.clientWidth){
        disX = leftArea.clientWidth-mask.clientWidth;
    }
    if(disY>leftArea.clientHeight-mask.clientHeight){
        disY = leftArea.clientHeight-mask.clientHeight;
    }
    mask.style.left = disX + 'px';
    mask.style.top = disY + 'px';
    
    //计算比例
    let scaleX = disX/leftArea.clientWidth;
    let scaleY = disY/leftArea.clientHeight;
    //定位放大区
    rightImg.style.left = -rightImg.clientWidth*scaleX +'px';
    rightImg.style.top = -rightImg.clientHeight*scaleY +'px';
}

leftArea.onmouseout = () => {
    mask.style.display = 'none'
}