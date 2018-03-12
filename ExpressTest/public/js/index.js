//   console.log("index.js加载成功")
// 渲染左侧目录结构开始
//获取元素
const lists = document.querySelector(".catalogue");
//获取容器元素
const fileTitleBox = document.querySelector('.filestitle ul');
//获取全选框
const checkAllBox = document.querySelector('#selectall');
//获取信息提示显示元素
const infoTips = document.querySelector('.do-info');
//递归左侧目录遍历数据
let n = 0;

function render(data, id, n) {
    let html = '';
    n++;
    if (id === -1) {
        html = `<ul class="lists">`
    } else {
        html = `<ul>`
    }
    for (let key in data) {
        if (data[key].pid == id) {
            let dataId = data[key].id;
            let html2 = '<li>';
            if (data[key].type == 'file') {
                html2 += `
                <div style="padding-left:${n*10+20}px" class = "list-container" data-id =${data[key].id}>
                    <i class='arrow-ico openarrow-ico'></i>
                    <i class="file-ico closefile-ico"></i>
                    <span>${data[key].title}</span>
                </div>`
            } else {
                html2 += `
                <div style="padding-left:${n*10+20}px" class = "list-container" data-id =${data[key].id}>
                    <i class='arrow-ico'></i>
                    <i class="file-ico closefile-ico"></i>
                    <span>${data[key].title}</span>
                </div>`;
            }
            html2 += render(data, dataId, n);
            html += html2;
            html += '</li>';
        }
    }
    html += '</ul>';
    return html;
}
lists.innerHTML = render(data, -1, -1);

//初始化微云被选中样式
let catalogueFirstDivs = document.querySelectorAll('.catalogue div');
catalogueFirstDivs[0].classList.add('active');
//获取左侧目录元素事件委托 为标题添加点击事件
lists.addEventListener('click', (ev) => {
    let target = null;
    if (ev.target.nodeName === "I" || ev.target.nodeName === "SPAN") {
        target = ev.target.parentNode;
    } else {
        target = ev.target;
    }
    fileTitleBox.innerHTML = creatTitleDOM(target.dataset.id);
    cleanClass(catalogueFirstDivs, 'active');
    target.classList.add('active');
    //渲染右侧数据
    filesBox.innerHTML = createChildDOM(target.dataset.id);
    //重置全选
    resetSelectAll();

})

function resetSelectAll() {
    checkAllBox.setAttribute('data-click', 'off');
    checkAllBox.classList.remove('active');
}
/**
 * 循环清除元素集合的响应样式
 * @param {元素集合} elements 
 * @param {class名} classname 
 */
function cleanClass(elements, classname) {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.classList.remove(classname);
    }
    // console.log('清除指定样式成功');
}

//------渲染右侧标题--------
// 初始化渲染
//通过id获取标题元素函数 返回一个数组
function getParentTilteById(id) {
    // body
    let arr = [];
    let currData = data[id];
    if (currData) {
        arr.push(currData);
        arr = arr.concat(getParentTilteById(currData.pid));
    }
    return arr
}
// 创建右侧标题元素结构函数，返回html结构
function creatTitleDOM(id) {
    const domData = getParentTilteById(id).reverse();
    let html = ``
    if (id == 0) return html = `<li data-id='${domData[0].id}' class="active">${domData[domData.length-1].title}</li>`
    html = `<li data-id='${domData[0].id}'>${domData[0].title}</li>`
    for (let i = 1; i < domData.length - 1; i++) {
        html += `<li class="arrow-li"></li>
               <li data-id='${domData[i].id}' >${domData[i].title}</li>`
    }
    html += `<li class="arrow-li"></li>
             <li class="active" data-id='${domData[domData.length-1].id}'>${domData[domData.length-1].title}</li>`
    //

    return html

}
//初始化标题数据
fileTitleBox.innerHTML = creatTitleDOM(0);
//为标题添加点击事件
fileTitleBox.addEventListener('click', (ev) => {
    let target = ev.target;
    if (target.className == 'arrow-li') return;
    fileTitleBox.innerHTML = creatTitleDOM(target.dataset.id);
    cleanClass(catalogueFirstDivs, 'active');
    //添加目录对应active
    for (let i = 0; i < catalogueFirstDivs.length; i++) {
        const element = catalogueFirstDivs[i];
        if (target.dataset.id == element.dataset.id) {
            element.classList.add('active');
        }
    }
    //渲染右侧数据
    filesBox.innerHTML = createChildDOM(target.dataset.id);
    //重置全选
    resetSelectAll();
})

//---------------渲染右侧内容区----------------
// 获取右侧内容容器
const filesBox = document.querySelector('.files-content');
//通过id获取子集数据
function getChildTitleById(id) {
    let arr = [];
    for (const key in data) {
        if (data[key].pid == id) {
            arr.push(data[key]);
        }
    }
    return arr;
}
//通过id创建右侧内容DOM结构
function createChildDOM(id) {
    let data = getChildTitleById(id);
    let html = ``
    if (data.length > 0) {
        data.forEach(element => {
            html +=
                `<div class="file-container" data-id=${element.id}>
                    <div class="checkbox none" data-click='off'></div>
                    <img class="files-ico" src="./imgs/folder-ico.png" alt="file-ico">
                    <input class="file-name none" type='text' value = '${element.title}'/> 
                    <p class="file-name">${element.title}</p>
                </div>
                `
        });
    } else {
        html = `<div class="nofiles">
        <img src="./imgs/nofiles.png"/>
    </div>`
    }
    return html;
}
//初始化数据
filesBox.innerHTML = createChildDOM(0)
//添加事件委托
filesBox.addEventListener('click', (ev) => {
    let target = null;
    let checkbox = null;
    if (ev.target.className == 'file-container') target = ev.target;
    if (ev.target.nodeName == 'P' || ev.target.nodeName == "IMG") target = ev.target.parentNode;
    if (ev.target.nodeName === 'DIV' && ev.target.classList.contains('checkbox')) {
        checkbox = ev.target;
    }
    if (target) {
        filesBox.innerHTML = createChildDOM(target.dataset.id);
        fileTitleBox.innerHTML = creatTitleDOM(target.dataset.id);
        cleanClass(catalogueFirstDivs, 'active');
        //添加目录对应active
        for (let i = 0; i < catalogueFirstDivs.length; i++) {
            const element = catalogueFirstDivs[i];
            if (target.dataset.id == element.dataset.id) {
                element.classList.add('active');
            }
        }
        //重置全选
        resetSelectAll();
    }
    //单选框点击
    if (checkbox) {
        //获取所有check元素
        let checkboxs = document.querySelectorAll('.checkbox');
        if (checkbox.dataset.click === 'off') {
            checkbox.classList.add('active');
            checkbox.parentNode.classList.add('active');
            checkbox.setAttribute('data-click', 'on');
            checkbox.parentNode.setAttribute('data-click', 'on');
        } else {
            checkbox.classList.remove('active');
            checkbox.parentNode.classList.remove('active');
            checkbox.setAttribute('data-click', 'off');
            checkbox.parentNode.setAttribute('data-click', 'off');
        }
        //检测是否全选
        // console.log(checkALl(checkboxs, 'click', 'on'));
        // 联动全选
        if (checkALl(checkboxs, 'click', 'on')) {
            checkAllBox.classList.add('active');
            checkAllBox.setAttribute('data-click', 'on')
        } else {
            checkAllBox.classList.remove('active')
            checkAllBox.setAttribute('data-click', 'off')
        }
    }
})
//全选按钮点击时
//为全选添加事件
checkAllBox.onclick = function () {
    let checkboxs = document.querySelectorAll('.checkbox');
    if (this.dataset.click === 'on') {
        console.log(111);
        for (let i = 0; i < checkboxs.length; i++) {
            const element = checkboxs[i];
            element.classList.remove('active')
            element.classList.add('none')
            element.parentNode.classList.remove('active')
            element.setAttribute('data-click', 'off');
            element.parentNode.setAttribute('data-click', 'off');
        }
        this.setAttribute('data-click', 'off');
        this.classList.remove('active');
    } else {
        for (let i = 0; i < checkboxs.length; i++) {
            const element = checkboxs[i];
            element.classList.add('active')
            element.classList.remove('none')
            element.parentNode.classList.add('active')
            element.setAttribute('data-click', 'on')
            element.parentNode.setAttribute('data-click', 'on');
        }
        this.setAttribute('data-click', 'on');
        this.classList.add('active');

    }
}
//鼠标移入时添加事件委托
filesBox.addEventListener('mouseover', (ev) => {
    let target = null;

    if (ev.target.nodeName === 'DIV' && ev.target.classList.contains('file-container')) {
        target = ev.target;
    }
    if (ev.target.nodeName === 'DIV' && ev.target.classList.contains('checkbox')) {
        target = ev.target.parentNode;
        checkbox = ev.target;
    }
    if (ev.target.nodeName === 'IMG' || ev.target.nodeName === 'P') target = ev.target.parentNode;
    if (target) {
        target.firstElementChild.classList.remove('none');
    }

})
//鼠标移除时添加事件委托
filesBox.addEventListener('mouseout', (ev) => {
    let target = null;
    if (ev.target.nodeName === 'DIV' && ev.target.classList.contains('file-container')) {
        target = ev.target;
    }
    if (target && target.firstElementChild.dataset.click != 'on') {
        target.firstElementChild.classList.add('none');
    }
})
//创建鼠标选框
filesBox.onmousedown = (ev) => {
    if (ev.button == 0 && ev.target.classList.contains('files-content')) { //鼠标左键
        //获取当前区域的碰撞元素
        let divs = document.querySelectorAll('.file-container');
        let oriX = ev.clientX;
        let oriY = ev.clientY;
        // console.log(oriX,oriY);
        let selectDiv = document.createElement('div');
        selectDiv.classList.add('mouseselect');
        selectDiv.style.display = 'none';
        let offsetX = filesBox.getBoundingClientRect().left;
        let offsetY = filesBox.getBoundingClientRect().top;
        filesBox.appendChild(selectDiv);
        document.onmousemove = (ev) => {
            if (Math.abs(ev.clientX - oriX) > 20 && Math.abs(ev.clientY - oriY) > 20) {
                selectDiv.style.display = 'block'
            }
            selectDiv.style.width = Math.abs(ev.clientX - oriX) + 'px';
            selectDiv.style.height = Math.abs(ev.clientY - oriY) + 'px';
            selectDiv.style.left = Math.min((ev.clientX - offsetX), (oriX - offsetX)) + 'px';
            selectDiv.style.top = Math.min((ev.clientY - offsetY), (oriY - offsetY)) + 'px';
            //碰撞检测
            for (let i = 0; i < divs.length; i++) {
                const element = divs[i];
                if (isDung(selectDiv, element)) {
                    //console.log('碰撞',element);
                    element.classList.add('active');
                    element.firstElementChild.classList.remove('none');
                    element.firstElementChild.classList.add('active');
                    element.setAttribute('data-click', 'on');
                    element.firstElementChild.setAttribute('data-click', 'on');
                } else {
                    element.classList.remove('active');
                    element.firstElementChild.classList.add('none');
                    element.firstElementChild.classList.remove('active');
                    element.setAttribute('data-click', 'off');
                    element.firstElementChild.setAttribute('data-click', 'off');
                }
            }
            // 联动全选
            if (divs.length > 0) {
                if (checkALl(divs, 'click', 'on')) {
                    checkAllBox.classList.add('active');
                    checkAllBox.setAttribute('data-click', 'on')
                } else {
                    checkAllBox.classList.remove('active')
                    checkAllBox.setAttribute('data-click', 'off')
                }
            }
            return false;
        }
        document.onmouseup = (ev) => {
            document.onmousemove = document.onmouseup = null;
            // console.log(selectDiv);
            filesBox.removeChild(selectDiv);



        }
    }
}
//----------------碰撞检测函数开始----------------------
function getRect(element) {
    return element.getBoundingClientRect();
}
/**
 * 碰撞检测
 * 
 * @param {检测碰撞元素1} box1 
 * @param {检测碰撞元素2} box2 
 * @returns 返回是否碰撞的结果
 */
function isDung(box1, box2) {
    let getBox1Rect = getRect(box1);
    let getBox2Rect = getRect(box2);
    if (
        getBox1Rect.right < getBox2Rect.left ||
        getBox1Rect.bottom < getBox2Rect.top ||
        getBox1Rect.left > getBox2Rect.right ||
        getBox1Rect.top > getBox2Rect.bottom
    ) {
        return false;
    } else {
        return true;
    }
}
//----------------碰撞检测函数结束----------------------
/**
 * 检测元书中的data-key属性的值是否全部相同
 * @param {被检测的元素结合} elements 
 * @param {data-key的key值} dataKey 
 * @param {value值} dataValue 
 */
function checkALl(elements, dataKey, dataValue) {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.dataset[dataKey] != dataValue) {
            return false;
        }
    }
    return true;
}


//-------------右侧标题功能开始-------------------

//----新建文件夹------
function addNewFileToData(id, pid, title, type) {
    data[id] = {
        "id": id,
        "pid": pid,
        "title": title,
        "type": ''
    }
}
//获取新建文件夹按钮
const newFileBtn = document.querySelector('#newfile');
let id = 1000;
let newN = 0; //用于控制新建文件夹
newFileBtn.addEventListener('click', (ev) => {
    if (newFileBtn.dataset.disable === 'on') return;
    let menuTitles = document.querySelectorAll('.filestitle li');
    let pid = getIdByParent(menuTitles);
    id++;
    // pid是父亲的ID

    let title = creatNewFileName('新建文件夹', data, pid);
    let type = 'file';
    let html = `<div class="checkbox none"  data-click='off'></div>
                <img class="files-ico" src="./imgs/folder-ico.png" alt="file-ico">
                <input class="file-name" type='text' value = '${title}'/>    
                <p class="file-name none">JS基础课程</p>
                `
    let newDiv = document.createElement('div');
    newDiv.classList.add('file-container');
    newDiv.setAttribute('data-id', id)
    newDiv.innerHTML = html;
    filesBox.appendChild(newDiv);
    let input = newDiv.querySelector('input');
    let p = newDiv.querySelector('p');
    input.focus();
    input.select();
    input.onblur = () => {

        if (input.value == '') {
            console.log(123);
            console.log(newDiv);
            newDiv.remove();
        } else {
            p.innerHTML = input.value;
            title = input.value;
            if (checkFileName(title, data, pid)) {
                input.focus();
                input.select();
                input.style.outlineColor = 'red';
                newFileBtn.setAttribute('data-disable', 'on');
                console.log('名字重复');
            } else {
                p.classList.remove('none');
                input.classList.add('none');
                newFileBtn.setAttribute('data-disable', 'off');
                upDateData();
                //重新渲染左侧目录结构
                filesBox.innerHTML = createChildDOM(pid);
            };
        }


    }

    function upDateData() {
        //表面数据处理完毕,开始向数据data插入数据
        addNewFileToData(id, pid, title, type);
        //更新左侧目录
        // console.log(pid);
        lists.innerHTML = render(data, -1, -1);
        // 更新
        catalogueFirstDivs = document.querySelectorAll('.catalogue div');
        //添加目录对应active
        for (let i = 0; i < catalogueFirstDivs.length; i++) {
            const element = catalogueFirstDivs[i];
            if (element.dataset.id == pid) {
                element.classList.add('active');
            }
        }
    }
})
// console.log(data);
//遍历获取父亲ID
function getIdByParent(elements) {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.classList.contains('active')) return parseInt(element.dataset.id);
    }
}
//检测是否与data重名函数
/**
 * 检查是否与统计数据中同名
 * 
 * @param {文件名字} filename 
 * @param {数据} data 
 * @param {pid} pid 
 * @returns true or flase
 */
function checkFileName(filename, data, pid) {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            if (element.title === filename && element.pid == pid) return true;
        }
    }
    return false;
}
// console.log(checkFileName('我的文档',data,0))
// 检测重名病创建名字函数
/**
 * 创建与统计不同名字的函数
 * 
 * @param {名字} title 
 * @param {数据} data 
 * @param {pid} pid 
 * @returns 一个与众不同的名字~~~
 */
function creatNewFileName(title, data, pid) {
    let name = title;
    let i = 0;

    function add() {
        if (checkFileName(name, data, pid)) {
            i++;
            let re = /\d+/;
            name = name + i;
            name = name.replace(re, i);
            add();
        } else {
            name = name;
        }
    }
    add();
    return name;
}
// creatNewFileName();

// -----------------删除文件开始------------------
//获取删除文件按钮
let delBtn = document.querySelector('#delfile');
//获取最后确认元素
let delConfirmBox = document.querySelector('.del-confirm');
let delConfirmBtn = document.querySelector('#delconfirm');
let delCancelBtn = document.querySelector('#delcancel');
delBtn.addEventListener('click', () => {
    //首先获取被选中的元素
    let files = document.querySelectorAll('.files-content .file-container');
    let checkedElements = [];
    let timer = null;
    //判断是否有文件夹
    if (!files.length) {
        infoTips.innerHTML = '该文件夹下没有文件可以删除';
        infoTips.classList.remove('none');
        infoTips.classList.add('err');
    } else {
        infoTips.classList.remove('err');
        infoTips.classList.add('none');
        //循环遍历是否有选中项
        files.forEach(element => {
            if (element.dataset.click === 'on') {
                checkedElements.push(element);
            }
        });
        if (checkedElements.length > 0) { //有选中的元素做删除处理
            //先提示是否确认删除
            delConfirmBox.classList.remove('none');
            //删除选中元素
            delConfirmBtn.onclick = () => {
                checkedElements.forEach((element) => {
                    //移除DOM 
                    element.remove()
                    //删除数数据
                    delete data[element.dataset.id];
                    delChildById(element.dataset.id);
                })
                delConfirmBox.classList.add('none');
                checkAllBox.classList.remove('active');
                checkAllBox.setAttribute('data-click', 'off');
                //更新左侧目录数据
                updatedLeftMenu();
                //渲染右侧数据
                filesBox.innerHTML = createChildDOM(updatedLeftMenu())

            }
            delCancelBtn.onclick = () => {
                delConfirmBox.classList.add('none')
            }
        } else {
            infoTips.innerHTML = '请先选择文件夹';
            infoTips.classList.remove('none');
            infoTips.classList.add('err');
        }
    }
})
//更新左侧目录函数
function updatedLeftMenu() {
    //再次更新渲染左侧目录
    lists.innerHTML = render(data, -1, -1);
    // 更新
    let menuTitles = document.querySelectorAll('.filestitle li');
    let pid = getIdByParent(menuTitles);
    catalogueFirstDivs = document.querySelectorAll('.catalogue div');
    //添加目录对应active
    for (let i = 0; i < catalogueFirstDivs.length; i++) {
        const element = catalogueFirstDivs[i];
        if (element.dataset.id == pid) {
            element.classList.add('active');
        }
    }
    return pid;
}
//通过ID删除子元素
function delChildById(id) {
    for (const key in data) {
        // console.log(123);
        if (data[key].pid == id) {
            let id = data[key].id;
            delete data[key];
            delChildById(id);
            // delChildById(data[key]);            
        }
    }
}
// -----------------移动文件夹开始------------------
// FIXME:在根目录点击移动数据后在别的目录下点移动 列表只会渲染微云一个目录？？？？？
// TODO:我也不知道为啥数据会丢失啊？？data也没改变，咋就渲染不出来呢？？？？ 一脸懵逼。。。。
const moveBtn = document.querySelector('#movefile');
const moveBox = document.querySelector('.move');
const moveBoxLists = document.querySelector('.move div')
const currPistion = document.querySelector('.move .position')
moveBoxLists.innerHTML = render(data, -1, -1);
//点击移动到按钮

let checkedElements = []; //TODO:危险操作！！！！！ 爸爸把变量拿出来了！ 怕不怕？？？
moveBtn.addEventListener('click', () => {
    //检查当前有没有选择的数据
    let files = document.querySelectorAll('.files-content .file-container');
    //获取当前目录名称

    let lis = document.querySelectorAll('.filestitle li')
    let delArr = [];
    //如果目录下没有文件
    if (!files.length) {
        infoTips.innerHTML = '该目录下没有文件';
        infoTips.classList.remove('none');
        infoTips.classList.add('err');
    } else {
        //文件检测是否存在选中
        infoTips.classList.remove('err');
        infoTips.classList.add('none');
        //循环遍历是否有选中项
        files.forEach(element => {
            if (element.dataset.click === 'on') {
                checkedElements.push(element);
            }
        });
        if (checkedElements.length > 0) { //如果有文件被选中
            moveBox.classList.remove('none');
            //在data中删除自己
            checkedElements.forEach((item) => {
                delArr.push(data[item.dataset.id])
                delete data[item.dataset.id];
            });
            //渲染移动目录
            // console.log(data);
            // console.log(render(data, -1, -1));
            moveBoxLists.innerHTML = render(data, -1, -1);
            currPistion.innerHTML = getCurrName(lis);
            //渲染后将数据返回
            if (delArr.length > 0) {
                delArr.forEach((item) => {
                    addNewFileToData(item.id, item.pid, item.title, item.type)
                })
            }
            // console.log(data);
        } else {
            infoTips.innerHTML = '请先选择文件';
            infoTips.classList.remove('none');
            infoTips.classList.add('err');
        }
    }
});
// 为移动目录添加点击交互

moveBoxLists.addEventListener('click', (ev) => {
    let moveDivs = document.querySelectorAll('.movelists .list-container');
    let target = null;
    if (ev.target.nodeName === 'I' || ev.target.nodeName === "SPAN") target = ev.target.parentNode;
    if (ev.target.nodeName === "DIV" && ev.target.classList.contains('list-container')) target = ev.target;
    //清除其他样式
    cleanClass(moveDivs, 'active');
    target.classList.add('active');
    currPistion.style.color = '#000'
    currPistion.innerHTML = target.innerText;
})
//点击确认按钮
const moveConfirmBtn = document.querySelector('#moveconfirm');
moveConfirmBtn.addEventListener('click', () => {
    //判断是否移动后为当前目录
    let lis = document.querySelectorAll('.filestitle li');
    let currId = 0;
    lis.forEach((item) => {
        if (item.classList.contains('active')) {
            currId = item.dataset.id;
        }
    })
    let moveDivs = document.querySelectorAll('.movelists .list-container');
    //获取被选中的目录
    let currMenuId = 0;
    moveDivs.forEach(element => {
        if (element.classList.contains('active')) {
            currMenuId = element.dataset.id;
        }
    });
    if (currId == currMenuId) {
        currPistion.innerHTML = '该文件夹已经在这个目录下';
        currPistion.style.color = 'red'
    } else {
        checkedElements.forEach(element => {
            for (const key in data) {
                if (data[key].id == element.dataset.id) {
                    data[key].pid = parseInt(currMenuId);
                }
            }
            element.remove();
        });
        //重新渲染页面
        updatedLeftMenu();
        //关闭模态框、
        moveBox.classList.add('none');
        currPistion.style.color = '#000'
    }

})
//取消
const moveCancelBtn = document.querySelector('#movecancel');
moveCancelBtn.addEventListener('click', () => {
    moveBox.classList.add('none');
    currPistion.style.color = '#000';
})
//
//交互样式
//获取当前目录的名字
function getCurrName(lis) {
    let name = '获取名字失败'
    lis.forEach(element => {
        if (element.classList.contains('active')) {
            name = element.innerHTML;
        }
    });
    return name;
}
//给当前目录添加样式

//复制对象
let cloneObj = function (obj) {
    let newObj = {};
    if (obj instanceof Array) {
        newObj = [];
    }
    for (let key in obj) {
        let val = obj[key];
        newObj[key] = typeof val === 'object' ? cloneObj(val) : val;
    }
    return newObj;
};
//---------------重新命名开始----------------
//获取元素
const renameBtn = document.querySelector('#renamefile');

renameBtn.addEventListener('click', () => {
    //例行判断该文件夹下有没有元素
    //检查当前有没有选择的数据
    let checkedElements = [];
    let files = document.querySelectorAll('.files-content .file-container');
    if (!files.length) {
        infoTips.innerHTML = '该目录下没有文件';
        infoTips.classList.remove('none');
        infoTips.classList.add('err');
    } else {
        //文件检测是否存在选中
        infoTips.classList.remove('err');
        infoTips.classList.add('none');
        //循环遍历是否有选中项
        files.forEach(element => {
            if (element.dataset.click === 'on') {
                checkedElements.push(element);
            }
        });
        if (checkedElements.length === 1) {
            //如果有文件被选中
            infoTips.classList.add('none');
            let input = checkedElements[0].querySelector('input');
            let p = checkedElements[0].querySelector('p');
            let menuTitles = document.querySelectorAll('.filestitle li');
            let id = checkedElements[0].dataset.id;
            let pid = getIdByParent(menuTitles);
            let oriTitle = input.value;
            input.classList.remove('none');
            input.focus();
            input.select();
            p.classList.add('none');
            input.onblur = () => {
                p.innerHTML = input.value;
                title = input.value;
                if (title == oriTitle) {
                    p.classList.remove('none');
                    input.classList.add('none');
                } else {
                    if (!checkFileName(title, data, pid)) { //不重名
                        p.classList.remove('none');
                        input.classList.add('none');
                        //更新数据
                        for (const key in data) {
                            if (data.hasOwnProperty(key)) {
                                const element = data[key];
                                if (element.id == id) {
                                    element.title = title
                                }
                            }
                        }
                        lists.innerHTML = render(data, -1, -1);

                    } else { //重名了
                        input.focus();
                        input.select();
                        input.style.outlineColor = 'red';
                    }
                }

            }
        } else {
            infoTips.innerHTML = '请选择一个文件';
            infoTips.classList.remove('none');
            infoTips.classList.add('err');
        }
    }

})