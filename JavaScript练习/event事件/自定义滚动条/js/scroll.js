let scroll = document.querySelector('#scroll');
let scrollbar = document.querySelector('#scrollbar');
let main = document.querySelector('#main');
//渲染元素
let lists = document.querySelector('#lists');
let html = `<li>开始</li>`;
for (let i = 0; i < 1000; i++) {
    html+=`<li>${i}</li>`
}
html += `<li>结束</li>`
lists.innerHTML = html;
//
let content = document.querySelector("#content")
let minY = 0;
let maxY = scroll.clientHeight - scrollbar.offsetHeight;

//拖拽滚动条
scrollbar.onmousedown = (ev) => {
    let dixY = ev.clientY - scrollbar.offsetTop;
    document.onmousemove = (ev) => {
        let t = ev.clientY - dixY;
        if (t < minY) t = minY;
        if (t > maxY) t = maxY;
        scrollbar.style.top = t + 'px';
        let n = -t/(scroll.offsetHeight-scrollbar.offsetHeight) * main.scrollHeight;
        console.log(scroll.offsetHeight);
        console.log(main.scrollHeight);
       // console.log(n);
        content.style.top = n + 'px'

    }
    document.onmouseup = () => {
        document.onmousup = document.onmousemove = null;
    }
}