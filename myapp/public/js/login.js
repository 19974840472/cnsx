$("#dr_btn").click(function (){
    let email=$("#dr_email").val()
    let pwd=$("#dr_pwd").val()
    if (localStorage.getItem("yh")=="[]"){
        $("#zc_h2").html("用户名不存在或密码错误")
    }else {
        let yh=JSON.parse(localStorage.getItem("yh"))
        for(let i=0;i<yh.length;i++){
            if (yh[i].email===email && yh[i].pwd===pwd){
                $("#zc_h2").html("登入成功")
                localStorage.setItem("state","true") //本地添加登入状态为true
                localStorage.setItem("my",JSON.stringify(yh[i]))
                $("#wc").click(function (){
                    location.replace("index.html")
                })
                break
            }else {
                $("#zc_h2").html("用户名不存在或密码错误")
            }
        }
    }
})