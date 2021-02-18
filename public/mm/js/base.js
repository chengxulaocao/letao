// 因为mui组件默认禁止a的href属性，无法跳转页面 所以我们要激活一下
$(function(){
    mui('body').on('tap','a',function(){
        document.location.href = this.href;
    });
})