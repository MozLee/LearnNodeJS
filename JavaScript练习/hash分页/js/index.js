
//获取元素
const rightList = document.querySelector('#rightList');
const pagesBox = document.querySelector('#pagesBox');
let hashKey = window.location.hash;

//处理数据渲染分页

//获取数据长度
let dataLen = data.world.length;

//分页数量
let pagesNum = Math.ceil(dataLen / 4);

//渲染分页
for (let i = 1; i <= pagesNum; i++) {
    pagesBox.innerHTML += `<a href="javascript:;">${i}</a>`
}

//获取所有分页按钮
const pageBtns = pagesBox.querySelectorAll('a');

//判断是否存在hash
if (hashKey) {

    //处理hash值
    let curHash = Number(hashKey.slice(1));

    //渲染数据
    renderData(curHash);
} else {
    renderData(1);
}


//渲染数据函数 
function renderData(start) {

    //清空其他class
    for (let i = 0; i < pageBtns.length; i++) {
        pageBtns[i].className = " ";
    }

    //为第一页添加class
    pageBtns[start - 1].classList.add('active');
    
    //处理数据
    let newArr = data.world.slice((start - 1) * 4, 4 * start);

    //渲染数据
    newArr.forEach(element => {
        rightList.innerHTML +=
            `<li>
             <span class="num">${element.num}</span>
             <div class="list">
                 <a href=""><span class="job">招聘类型${element.job}</span><span>需求人数：${element.pNum}名</span><time>${element.data}</time></a>
                 <p><span class="text">${element.ask}</span><a href="javascript:;">查看详情>></a></p>
             </div>
         </li>`
    });
}

//分页按钮点击事件
for (let i = 0; i < pageBtns.length; i++) {
    pageBtns[i].onclick = function () {

        //添加hash
        let newHashKey = i + 1;
        window.location.hash = newHashKey;

        //清空容器
        rightList.innerHTML = '';

        //渲染数据
        renderData(newHashKey)
    }
}