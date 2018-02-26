//获取按钮元素
const subBtn = document.querySelector('#btn');
const delBtn = document.querySelector('#delbtn');
const sortBtn = document.querySelector('#sortbtn');
const checkAllBtn = document.querySelector('#check-all')

//获取input元素
const userName = document.querySelector('#name');
const userAge = document.querySelector('#age');
const userSex = document.querySelector('#sex')
//获取初始数据
let iniData = [{
        id: '0001',
        name: '李雷',
        age: 18,
        sex: '男'
    },
    {
        id: '0002',
        name: '韩梅梅',
        age: 14,
        sex: '女'
    },
    {
        id: '0003',
        name: '小明',
        age: 28,
        sex: '男'
    },
    {
        id: '1231',
        name: '二狗',
        age: 22,
        sex: '男'
    },

]

//获取容器渲染数据
const contBox = document.querySelector('tbody');

//渲染数据
iniData.forEach((item, index) => {
    contBox.innerHTML += `  
        <tr>
            <td><input type="checkbox"></td>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.sex}</td>
            <td><a href="javascript:;">删除</a></td>
        </tr>
        `
});

//添加删除事件
function addDelEvent() {
    // body
    let a = document.querySelectorAll('a');
    for (let i = 0; i < a.length; i++) {
        a[i].addEventListener('click', delInfo);
    }
}
addDelEvent();
/**
 * 添加用户信息功能
 * 1、点击添加按钮，在tbody添加信息
 * 2、姓名年龄不能为空
 * 3、随机生成不重复的UID
 * 4、点击删除删除当前
 * 5、点击全选，全选
 * 6、单选点满，全选点亮
 */

//随机生成UID函数 randomUID1
function randomUID(randomLength) {
    // body
    return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
};

//添加提交点击事件
subBtn.onclick = () => {
    //判断输入框是否为空
    if (userName.value == '' || userAge.value == '') {
        alert('请输入完整信息');
        return;
    } else {
        contBox.innerHTML += `  
        <tr>
            <td><input type="checkbox"></td>
            <td>${randomUID(0)}</td>
            <td>${userName.value}</td>
            <td>${userAge.value}</td>
            <td>${userSex.value}</td>
            <td><a href="javascript:;">删除</a></td>
        </tr>
        `
    }
    addDelEvent();
}
//移除函数
function delInfo() {
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
}

//TODO:完成全选，单选功能
//全选点击事件
checkAllBtn.onclick = ()=>{
    //获取所有checked
    let 
}