console.log('index.js加载成功');
//获取元素
const btn = document.querySelector('#changeBtn');
const lists = document.querySelector('#lists');
let news = null;

function getData() {
    // body
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:3000/data',
            success(data) {
                resolve(JSON.parse(data));
            },
            error(err) {
                reject(err);
            }
        })
    });
}
getData().then((data) => {
    news = data.data.news;
    lists.innerHTML = renderHtml(news, 0)
})
let n = 0;
btn.onclick = () => {
    // console.log(n);
    if (n >= news.length - 3) n = 0;
    n += 3;
    lists.innerHTML = renderHtml(news, n);
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function renderHtml(data, start) {
    let end = start + 2;
    let html = '';
    if (start + 3 > news.length) end = news.length - start;
    console.log(start, end);
    for (let i = start; i <= end; i++) {
        html += `<li style='color:${getRandomColor()}'>${news[i]}</li>`;
    }
    return html;
}