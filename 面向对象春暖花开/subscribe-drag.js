class Subscribe {
    constructor() {
        this.subscribersInfo = {};
    }

    /**
     * 订阅者注册
     * @param {订阅者订阅的信息} subscriber 
     * @param {订阅者收到反馈执行的函数} fn 
     */
    on(subscriber, fn) {
        //检查是否存在相同subscriber
        if (!this.subscribersInfo[subscriber]) {
            this.subscribersInfo[subscriber] = [];
        }
        //检查是否存在相同fn
        if (this.subscribersInfo[subscriber].indexOf(fn) === -1) {
            this.subscribersInfo[subscriber].push(fn);
        }
    }

    /**
     * 发布者发布
     */
    trigger(subscriber, ...params) {
        let users = this.subscribersInfo[subscriber];
        if(users){
            for (let i = 0; i < users.length; i++) {
                const element = users[i];
                element(...params);
            }
        }
    }

    /**
     * 订阅者取消订阅
     * @param {订阅者订阅的信息} subscriber 
     * @param {订阅者收到反馈执行的函数} fn 
     */
    off(subscriber, fn) {
        for (let i = 0; i < this.subscribersInfo[subscriber].length; i++) {
            const element = this.subscribersInfo[subscriber][i];
            if (element === fn) {
                this.subscribersInfo[subscriber].slice(i, 1);
            }
        }
    }
}

class Drag extends Subscribe {
    constructor(dragElement) {
        super();
        this.el = dragElement;
        this.init();
        
    }
    //初始化
    init() {
        console.log(this.el);
        this.el.onmousedown = (ev) => {
            this.disX = ev.clientX - this.el.offsetLeft;
            this.disY = ev.clientY - this.el.offsetTop;
            this.trigger('m-down','鼠标按下');
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
        this.trigger('m-move','鼠标移动');
        
    }
    //鼠标抬起
    up(ev) {
        document.onmousemove = document.onmouseup = null;
        this.trigger('m-up','鼠标抬起');
        
    }
}