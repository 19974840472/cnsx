// 引入mysql模块
var mysql = require('mysql');
// 创建mysql数据库配置
var mysqlConnectionConfig = {
    host     : 'localhost',   // 主机名
    user     : 'root',        // mysql登录用户名
    password : '123456',      // mysql登录密码
    database : 'rookie'       // 网站数据库名
}
// promise封装mysql语句执行函数
// sql ： 是mysql的sql语句
function sql(sql){
    return new Promise((resolve,reject)=>{
        var connection = mysql.createConnection(mysqlConnectionConfig);
        // 创建mysql数据库连接
        connection.connect();
        // 执行mysql的sql语句
        connection.query(sql, function (error, results, fields) {
            if (error) reject(error);
            // console.log('The solution is: ', results[0].solution);
            // console.log('===============分隔符1==================');
            // console.log('The results is: ', results[0]);
            // console.log('===============分隔符2==================');
            // console.log('The fields is: ', fields);
            resolve(results);
        });
        // 断开mysql数据连接
        connection.end();
    })
}
// 暴露
module.exports = sql;