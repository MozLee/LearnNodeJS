function Tab(parent) {
    this.btns = parent.querySelectorAll('button');
    this.divs = parent.querySelectorAll('div');
    this.len = this.btns.length;
    this.n = 0;
    this.timer = null;
    //自动初始化
    this.init();
}

//初始化
Tab.prototype.init = function () {
    //初始化相关样式
    this.divs[0].style.display = 'block';
    this.btns[0].classList.add('active');
    //添加事件
    for (let i = 0; i < this.len; i++) {
        this.btns[i].onclick = () => {
            this.play(i);
        }
    }
}

//切换
Tab.prototype.play = function (index) {
    //重置相关样式
    for (let j = 0; j < this.len; j++) {
        this.divs[j].style.display = 'none';
        this.btns[j].classList.remove('active');
    }
    //对当前添加样式
    this.btns[index].classList.add('active');
    this.divs[index].style.display = 'block';
}

//自动切换
Tab.prototype.autoPlay = function () {
    this.timer = setInterval(() => {
        this.n++;
        if(this.n>this.len-1) this.n = 0;
        this.play(this.n);    
    },1000)
}

//检测是否在autoplay
Tab.prototype.isAutoPlay = function () {
    return !!this.timer;
}

//停止自动运行autoplay
Tab.prototype.stopAutoPlay = function(){
    clearInterval(this.timer);
    this.timer = null;
}