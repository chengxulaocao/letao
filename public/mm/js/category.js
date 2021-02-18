$(function(){
    // 激活a标签的href属性
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 请求一级分类的数据
    $.ajax({
        url:"/category/queryTopCategory",
        type:'GET',
        dataType:'json',
        success: function(res) {
            // console.log(res)
            // 所谓的模板引擎
            /*
             作用：就是用来帮助我们将请求回来的数据和HTML进行拼接
             将拼接好之后的结果，返回给我们 让我们直接拿这个结果去渲染页面

             步骤：
              1.将数据和HTML拼接
              2.参数1  HTML模板的id
              3.参数2  数据
              4.告诉模板引擎 HTML模板和数据怎样进行拼接
            */
            let html = template('category-first',{result:res.rows});
            $("#links").html(html);
            // 如果一级分类有数据的话 发送二级分类
            if(res.rows.length){
                // 给刚加载的数据第一行加个被选中状态
                $("#links").find('a').eq(0).addClass('active')
                // 获取到一级分类的id
                var id = res.rows[0].id;
                // 根据一级分类的id去获取对应的二级分类的数据
                $.ajax({
                    url:'/category/querySecondCategory',
                    type:'get',
                    dataType:'json',
                    data:{
                        // 把参数传过去
                        id:id
                    },
                    success: function(res) {
                        // console.log(res)
                        var html = template("category-second",res);
                        $("#brand-list").html(html)
                    }
                })
            }
        }
    })

    // 点击一级分类获取指定二级分类的数据
    // 给所有的一级分类添加点击事件 移动端 tap 事件轻敲事件  基本等同于click事件
    $("#links").on('tap','a',function(){
        // alert(11111)
        // 获取当前一级分类的自定义id
        var id = $(this).attr("data-id");
        // console.log(id)
        // 动态的为被点击的目标添加active
        $(this).addClass('active').siblings().removeClass('active')
        // 根据被点击的目标的id，请求对应的二级分类的数据 用模板引擎渲染到页面
        $.ajax({
            url:'/category/querySecondCategory',
            type:'get',
            dataType:'json',
            data:{
                // 把参数传过去
                id:id
            },
            success: function(res) {
                // console.log(res)
                var html = template("category-second",res);
                $("#brand-list").html(html)
            }           
        })
    })
})