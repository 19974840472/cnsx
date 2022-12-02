// 逻辑路由
var express = require('express');
var router = express.Router();
// 处理图片上传的模块
const multer  = require('multer');
const path = require('path');
// 定义图片上传的文件夹
const upload = multer({ dest: path.join(__dirname,'../public/img/') });


// 注册中间件
var register = require('./register');
// 登录中间件
var login = require('./login');
// 登录中间件
var quit = require('./quit');
// 添加购物车中间件
var add_shopping = require('./add_shopping');
// 购物车商品数量增加中间件
var num_add = require('./num_add');
// 从购物车删除中间件
var remove_shopping = require('./remove_shopping');
// 生成订单
var pay = require('./pay');





// 注册路由   /api/register
router.post('/register',register);
// 登录路由   /api/register
router.post('/login',login);
// 退出路由   /api/register
router.post('/quit',quit);
// 添加购物车路由   /api/register
router.post('/add_shopping',add_shopping);
// 购物车商品数量增加路由   /api/register
router.post('/num_add',num_add);
// 从购物车删除路由   /api/register
router.post('/remove_shopping',remove_shopping);
// 生成订单   /api/register
router.post('/pay',pay);



// 暴露路由
module.exports = router;