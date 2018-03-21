function Subscibe() {
    this.subscribersInfo = {};
}

/**
 * 订阅者注册
 * @param {订阅者订阅的信息} subscriber 
 * @param {订阅者收到反馈执行的函数} fn 
 */
Subscibe.prototype.on = function (subscriber, fn) {
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
Subscibe.prototype.trigger = function (subscriber, ...params) {
    let users = this.subscribersInfo[subscriber];
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        element(...params);
    }
}

/**
 * 订阅者取消订阅
 * @param {订阅者订阅的信息} subscriber 
 * @param {订阅者收到反馈执行的函数} fn 
 */
Subscibe.prototype.off = function (subscriber, fn) {
    for (let i = 0; i < this.subscribersInfo[subscriber].length; i++) {
        const element = this.subscribersInfo[subscriber][i];
        if (element === fn) {
            this.subscribersInfo[subscriber].slice(i, 1);
        }
    }
}