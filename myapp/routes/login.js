// 引入mysql模块 相对路径
var sql = require('../mysql/config');

// 加密模块
var crypto = require('crypto');

// 引入自定义加密模块
var { input } = require('../until/crypto');

// 登录请求处理中间件
async  function login(req,res){
    // 获取前端传递的登录信息
    var email = req.body.email;
    var password = req.body.password;
    var users  =await sql(`select * from users where email = "${email}"`); // [{}]

    if (users.length === 0) {
        res.send({
            code:500,
            msg:"用户不存在,请前去注册！"
        });
    }else{
        //密码加密
        var secret = 'rookie';
        var newPassword = crypto
            .createHmac('sha256',secret)
            .update(password,'utf-8')
            .digest('hex');
        if ( users[0].password === newPassword ) {
            // 在服务端保存用户的登录信息 -- 登录用户验证
            req.session.user = users[0]; // {username:,password,nickname:avatar}
            // 响应前端
            res.send({
                code:200,
                msg:"登录成功",
                user:{ name:users[0].name,surname:users[0].surname,email:users[0].email }
            });
        }else{
            res.send({
                code:500,
                msg:"密码错误"
            });
        }
    }
}

module.exports = login;