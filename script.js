/**
 * Created by myl17 on 2017/8/9.
 */
//轮播
$('.slide').on('click','.slide-control ul > li',function (e) {
    clearInterval(turnoff);
    var  $li = $(e.currentTarget)   //匹配到li元素
    var  index = $li.index()        //获取到当前元素索引
    go(index)
})
var curent = 0
$('.previous').on('click',function (e) {
    clearInterval(turnoff);
    var nextIndex
    if(curent > 0){
        nextIndex = curent - 1
    }else if(curent === undefined){
        nextIndex = 0
    }
    go(nextIndex)
    curent = nextIndex
})
$('.next').on('click',function (e) {
    clearInterval(turnoff);
    var nextIndex = curent + 1
    if(nextIndex === 9){
        nextIndex = 0
    }
    go(nextIndex)
    curent = nextIndex
})
var turnoff  = setInterval(function () {
    var nextIndex = curent + 1
    if(nextIndex === 9){
        nextIndex = 0
    }
    go(nextIndex)
    curent = nextIndex
},3000)
function  go(index){
    $('.slide-control ul > li').eq(index).addClass('active').siblings().removeClass('active')

    var width = $('.slide > .slide-content').width()
    $('.slide > .slide-content > ul').css({
        transform: 'translateX(' + (-width*index) + 'px)'
    })
}

//加载更多
var n = 1
var hasNext = true      //是否有下一页
var isRequest = false  //正在请求
loadMoreButton.onclick = function () {
    if(isRequest){ return}
    if(hasNext === false){ return}
    var request = new XMLHttpRequest()
    request.open('GET','./page-'+(n+1)+'.html') //同级目录的page-2
    request.onerror = function () { isRequest = false}
    request.onload = function () {
        isRequest = false
        n += 1
        var response = request.responseText
        //JSON.parse输入符合 JSON 语法的字符串,输出JSON对应的数
        var data = window.JSON.parse(response)
        for(var i = 0; i<data.content.length; i++){
            var liString =
                `<li>
                    <img src="./images/giphy.gif" data-source="${data.content[i].url}" alt="${data.content[i].alt}"/>
                    <h3>${data.content[i].title}</h3>
                    <p>${data.content[i].text}</p>
                 </li>
                `
            list.insertAdjacentHTML('beforeend',liString)
        }
        if(data.hasNextPage === false){
            hasNext = false;
            loadMoreButton.textContent = '加载完成'
        }
    }
    isRequest = true
    request.send()
}

//自动加载
window.onscroll = function () {
    if(shownOnTheScreen(loadMoreButton) === true){
        if(hasNext === true){
            loadMoreButton.onclick()
        }
    }
    var  images = document.querySelectorAll('img[data-source]')
    for(var i=0; i<images.length; i++){
        if(shownOnTheScreen(images[i]) === true){//图片为true出现在屏幕上
            images[i].src = images[i].getAttribute('data-source')
            images[i].removeAttribute('data-source')
        }
    }
}

//加载按钮或图片img,出现在屏幕上
function shownOnTheScreen(element) {
    var doc = document.documentElement //是整个文档节点树的根节点，在网页中即html标签
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    var clientHeight = doc.clientHeight

    var viewportOffset = element.getBoundingClientRect()
    var buttonTop = viewportOffset.top
    if(buttonTop <= clientHeight){
        return true
    }else{
        return false
    }
}
