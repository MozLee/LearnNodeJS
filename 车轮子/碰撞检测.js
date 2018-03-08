function getRect(element) {
    return element.getBoundingClientRect();
}
/**
 * 碰撞检测
 * 
 * @param {检测碰撞元素1} box1 
 * @param {检测碰撞元素2} box2 
 * @returns 返回是否碰撞的结果
 */
function isDung(box1, box2) {
    let getBox1Rect = getRect(box1);
    let getBox2Rect = getRect(box2);
    if (
        getBox1Rect.right < getBox2Rect.left ||
        getBox1Rect.bottom < getBox2Rect.top ||
        getBox1Rect.left > getBox2Rect.right ||
        getBox1Rect.top > getBox2Rect.bottom
    ) {
        return false;
    } else {
        return true;
    }
}