var sql = require('../mysql/config');
// 加密模块
var crypto = require('crypto');

// 引入自定义加密模块
var { output } = require('../until/crypto');

// 注册请求处理中间件
async function register(req,res){
    // 获取前端传递的数据  req.body { username:'zhangsan',password:'123'}
    // var username = req.body.username;
    // var password = req.body.password;
    // 精简，使用ES6,对象的解构赋值
    var { name,surname,email,password} = req.body;
    // const secret = 'abcdefg';
    // const hash = createHmac('sha256', secret)
    //             .update('I love cupcakes')
    //             .digest('hex');
    // console.log(hash);

    // 注册去重
    var result = await sql(`select * from users`);  // [{},{}]
    // 判断是否数据库中有相同的用户名
    var isUserName = result.some(item=>item.email === email);
    // 判断
    if (isUserName) {
        res.send({
            code:500,
            msg:"此用户已存在，请前去登录！"
        });
        return;
    }

    // 对称和非对称加密

    // 1.防内:系统管理员看到用户的密码，做一些XXXX的事情
    // 2.防外：防止黑客获取用户的密码，做一些XXXXX的事情

    // 定义密钥
    // var secret = 'hellom';
    // var newPassword = crypto
    //     .createHmac('sha256',secret)
    //     .update(password,'utf-8')
    //     .digest('hex');

    /**
     *  MD5：128位
     SHA-1：160位
     SHA256 ：256位
     SHA512：512位
     */
    // console.log(username,password);
    // 精简，使用ES7, async / await
    // try / catch   捕获js的错误，，好处是它不会影响后面代码的执行
    // var data = await sql(`INSERT INTO user value(NULL,${username},"${password}")`);
    try {
        var secret = 'rookie';
        // 加密
        var newPassword = crypto
            .createHmac('sha256',secret)
            .update(password,'utf-8')
            .digest('hex');
        var data = await sql(`INSERT INTO users value(NULL,"${name}","${surname}","${email}","${newPassword}")`);
        res.send({
            code:200,
            msg:"注册成功"
        });
    } catch (error) {
        console.log(error);
        res.send({
            code:500,
            msg:"注册失败"
        });
    }
}

module.exports = register;