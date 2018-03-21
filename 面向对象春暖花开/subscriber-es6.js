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