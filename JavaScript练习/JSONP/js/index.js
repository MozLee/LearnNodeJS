const searchInfo = document.querySelector('#searchInfo');
const tips = document.querySelector('.tips');
const bookscontainer = document.querySelector('.bookscontainer');
let n = 0;
let pageNum = 0;
//实时搜索功能
function search(data) {
    searchtxt.remove();
    let html = '';
    data.books.forEach(element => {
        html +=
            `<li>
            <div class="sopicCont fl">
                <img src="${element.image}" alt="">
            </div>
           <div class="sopicInfo fl">
                <p><a href=''>${element.title}</a><span>${element.pubdate}</span></p>
                <p>${element.author[0]}</p>
           </div>
        </li>`
    });
    tips.innerHTML = html;
}
let timer = null;
searchInfo.oninput = function () {
    //使用定时器解决即时请求，延时.5s请求数据
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    timer = setTimeout(() => {
        if(searchInfo.value===''){
            tips.style.display = 'none';
            return;
        }
        let url =
            `https://api.douban.com/v2/book/search?q=${searchInfo.value}&count=5&callback=search`;
        let script = document.createElement('script');
        script.id = 'searchtxt';
        script.src = url;
        document.body.appendChild(script);
        tips.style.display = 'block';
    }, 500)
}
//获取搜索数据
const serBtn = document.querySelector('#search');
//渲染
let data = null;
//渲染分页
function renderPages(dataLength, currPage) {
    // body
    let html = `<li>
                    <a href="javascript:;" class = 'pagePre'><</a>
                </li>`;
    let a = Math.ceil(dataLength / 5);
    pageNum = a;

    if (a <= 7) {
        for (let i = 1; i <= a; i++) {
            if (i == currPage) {
                html += `<li>
                <a href="javascript:;" class='active'>${i}</a>
                 </li>`
            } else {

                html += `<li>
            <a href="javascript:;">${i}</a>
      </li>`
            }
        }
    } else if (a > 7) {
        console.log('页数大于7');
        //处理中心左侧分页数据包含当前
        if (4 - currPage >= 0) {
            //渲染左侧
            for (let i = 1; i <= 4; i++) {
                if (i == currPage) {
                    html += `<li>
                            <a href="javascript:;" class='active'>${i}</a>
                        </li>`
                } else {
                    html += `<li>
                            <a href="javascript:;">${i}</a>
                        </li>`
                }

            }
            //渲染右侧
            html += `<li><a href="javascript:;">${5}</a></li>
                  <li>..</li>
                  <li><a href="javascript:;">${a-1}</a></li>
                  <li><a href="javascript:;">${a}</a></li>
                  
            `
        } else if (4 - currPage < 0 && a - currPage <= 3) {
            //渲染左侧
            html += `<li><a href="javascript:;">${1}</a></li>
                  <li><a href="javascript:;">${2}</a></li>
                  <li>..</li>
                  <li><a href="javascript:;">${currPage-1}</a></li>
                  <li><a href="javascript:;" class = 'active'>${currPage}</a></li>  
            `
            for (let i = currPage + 1; i <= a; i++) {
                html += `<li><a href="javascript:;">${i}</a></li>
                         `
            }
        }else{
            console.log(123);
            html += `<li><a href="javascript:;">${1}</a></li>
            <li><a href="javascript:;">${2}</a></li>
            <li>..</li>
            <li><a href="javascript:;">${currPage-1}</a></li>
            <li><a href="javascript:;" class = 'active'>${currPage}</a></li>
            <li><a href="javascript:;">${currPage+1}</a></li>
            <li>..</li>  
            <li><a href="javascript:;">${a-1}</a></li>
            <li><a href="javascript:;">${a}</a></li>
      `
        }
        //处理中心右侧数据
    }
    html += `<li>
                 <a href="javascript:;" class='pageNex'>></a>
            </li>`
    return html;
}
let pagination = document.querySelector('.pagination');
// pagination.innerHTML = renderPages(100,6);
function getData(obj) {
    getdata.remove();
    // data = obj;
    data = obj;
    n = 1;
    bookscontainer.innerHTML = renderData(data, 0, 5);
    pagination.innerHTML = renderPages(obj.count, n)

}
//渲染数据
function renderData(data, start, num) {
    // body
    let html = ``
    for (let i = start; i < num; i++) {
        let item = data.books[i];
        html += ` <div class="item-root">
        <a href="${item.alt}" class="cover-link fl">
            <img src="${item.image}" alt="${item.title}" class="cover">
        </a>
        <div class="detail fl">
            <div class="title">
                <a href="${item.alt}" class="title-text">${item.title}</a>
            </div>
            <div class="rating sc-bwzfXH hxNRHc">
                <span class="star${Math.round(item.rating.average)} rating-stars"></span>
                <span class="rating_nums">${item.rating.average}</span>
                <span class="pl">(${item.rating.numRaters}人评价)</span>
            </div>
            <div class="meta abstract">${item.author[0]}\/${item.translator} \/ ${item.publisher} \/ ${item.pubdate}\/${item.price}</div>
        </div>
    </div>`
    }
    return html;
}
serBtn.onclick = function () {
    tips.style.display = 'none';
    bookscontainer.innerHTML = `<h2>数据加载中。。。。。。</h2>`
    let url =
        `https://api.douban.com/v2/book/search?q=${searchInfo.value}&callback=getData&count=45`;
    let script = document.createElement('script');
    script.id = 'getdata';
    script.src = url;
    document.body.appendChild(script);
}
//为分页添加事件监听
pagination.addEventListener('click', (ev) => {
    let target = ev.target;
    if (target.nodeName === 'A') {
        let currPage = parseInt(target.innerHTML);
        //上一页
        if (target.classList.contains('pagePre')) {
            if (n - 1 <= 0) {
                alert('到头了')
            } else {
                n--;
                bookscontainer.innerHTML = renderData(data, (n - 1) * 5, n * 5);
                pagination.innerHTML = renderPages(data.count, n)
            }
        } else if (target.classList.contains('pageNex')) { //下一页
            if (pageNum - n <= 0) {
                alert('到头了~')
            } else {
                n++;
                bookscontainer.innerHTML = renderData(data, (n - 1) * 5, n * 5);
                pagination.innerHTML = renderPages(data.count, n)
            }
        } else {
            n = parseInt(target.innerHTML);
            bookscontainer.innerHTML = renderData(data, (n - 1) * 5, n * 5);
            pagination.innerHTML = renderPages(data.count, n)
        }
    }
})