/**
 * Created by myl17 on 2017/8/9.
 */
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
loadMoreButton.onclick = function () {
    var request = new XMLHttpRequest()
    request.open('GET','./page-'+(n+1)+'.html') //同级目录的page-2
    request.onload = function () {
        n += 1
        var response = request.responseText
        //JSON.parse输入符合 JSON 语法的字符串,输出JSON对应的数
        var data = window.JSON.parse(response)
        for(var i = 0; i<data.content.length; i++){
            var li = document.createElement('li')

            var img = document.createElement('img')
            img.src = data.content[i].url
            img.alt = data.content[i].alt

            var h3 = document.createElement('h3')
            h3.textContent = data.content[i].title

            var p = document.createElement('p')
            p.textContent = data.content[i].text

            li.appendChild(img)
            li.appendChild(h3)
            li.appendChild(p)
            list.appendChild(li)
        }
        console.log(data.hasNextPage)
        if(data.hasNextPage === false){
            loadMoreButton.disabled = true
            loadMoreButton.textContent = '加载完成'
        }
    }
    request.send()
}
//自动加载
/*window.onscroll = function () {
    console.log('start')
    var doc = document.documentElement //是整个文档节点树的根节点，在网页中即html标签
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    var clientHeight = doc.clientHeight
    var viewportOffset = loadMoreButton.getBoundingClientRect()
    var buttonTop = viewportOffset.top
    console.log(buttonTop,clientHeight)
    if(buttonTop < clientHeight){ //按钮出现150px以后
        loadMoreButton.click()
        console.log('if')
    }
    console.log('end')
}*/
