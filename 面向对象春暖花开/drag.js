function Drag(dragElement) {
    this.el = dragElement;
    this.init();
}
//初始化
Drag.prototype.init = function () {
    this.el.onmousedown = (ev) => {
        this.disX = ev.clientX - this.el.offsetLeft;
        this.disY = ev.clientY - this.el.offsetTop;
        document.onmousemove = (ev) => {
            this.move(ev);
        }
        document.onmouseup = (ev) => {
            this.up(ev);
        }
    }
}
//鼠标移动
Drag.prototype.move = function (ev) {
    this.el.style.left = ev.clientX - this.disX + 'px';
    this.el.style.top = ev.clientY - this.disY + 'px';
}
//鼠标抬起
Drag.prototype.up = function (ev) {
    document.onmousemove = document.onmouseup = null;
}