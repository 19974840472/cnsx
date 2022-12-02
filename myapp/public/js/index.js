
// 主页动画
$(".container.list-sc>div>div").hover(function (){
        $(this).addClass("animated pulse")
    },
    function (){
        $(this).removeClass("animated pulse")
    }
)
$(window).scroll(function (){
    if ($(this).scrollTop()>200){
        $(".navbar").slideUp(1000,function (){
        })
    }else {
        $(".navbar").slideDown(1000,function (){
        })
    }
})


// // 注册登入 邮箱密码验证
// $("#dr_email").focusout(function (){
//     let value=$(this).val()
//     let email_reg=new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$","ig")
//     if (email_reg.test(value)){
//         $(this).next().html("正确").css("color","green")
//     }else {
//         $(this).next().html("请输入正确邮箱号").css("color","red")
//     }
// })
//
// if (localStorage.getItem("yh")==null){
//     localStorage.setItem("yh","[]")
// }
//
//
// // 导航条 我的按钮判断跳转
// setTimeout(function (){
//     if (localStorage.getItem("state")=="true"){
//         $("#my").attr("href","my.html")
//     } else {
//         $("#my").attr("href","login.html")
//     }
//
//     if (localStorage.getItem("shopping")=="[]"||localStorage.getItem("shopping")==null){
//         $(".nav_shopping").html("")
//     }else {
//         $(".nav_shopping").html(JSON.parse(localStorage.getItem("shopping")).length)
//     }
// },100)
//
//
// //导航条搜索跳转
// $("#search").on("click","a", function (){
//     let str=$(this).prev().val()
//     switch (str){
//         case "蔬菜":location.assign("vegetables.html");break
//         case "水果":location.assign("fruit.html");break
//         case "蔬菜袋":location.assign("layout.html");break
//         case "水蜜桃":location.assign("commodity2.html");break
//         default:$(this).next().html("没有搜索结果")
//     }
// })

