class Drag {
    constructor(dragElement) {
        this.el = dragElement;
        this.init();
    }
    //初始化
    init() {
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
    move(ev) {
        this.el.style.left = ev.clientX - this.disX + 'px';
        this.el.style.top = ev.clientY - this.disY + 'px';
    }
    //鼠标抬起
    up(ev) {
        document.onmousemove = document.onmouseup = null;
    }
}