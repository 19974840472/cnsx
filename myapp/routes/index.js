var express = require('express');
var router = express.Router();
var sql=require('../mysql/config')

var fruit,vegetable;
(async function(){
  // 请求的公共的数据
  fruit = await sql('select * from fruit');
  vegetable = await sql('select * from vegetable');
  vegetable.forEach((ele)=>{
    ele.img=eval(ele.img)
  })
  fruit.forEach((ele)=>{
    ele.img=eval(ele.img)
  })
})()


/* 首页 */
router.get('/', function(req, res, next) {
  var fruit_index=fruit.slice(0,4)
  var vegetable_index=vegetable.slice(0,4)
  res.render('index', { title: '首页',fruit_index,vegetable_index });
});
/* 首页 */
router.get('/index', function(req, res, next) {
  var fruit_index=fruit.slice(0,4)
  var vegetable_index=vegetable.slice(0,4)
  res.render('index', { title: '首页',fruit_index,vegetable_index });
});
/* 所有产品 */
router.get('/all', function(req, res, next) {
  res.render('all', { title: '所有产品' });
});
/* 水果 */
router.get('/fruit', function(req, res, next) {
  res.render('fruit', { title: '水果',fruit });
});
/* 蔬菜 */
router.get('/vegetables', function(req, res, next) {
  res.render('vegetables', { title: '蔬菜',vegetable });
});
/* 联系我们. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: '联系我们' });
});
/* 购物车. */
router.get('/shopping', async function(req, res, next) {
  if (req.session.user) {
    var shoppingcart  = await sql(`select * from shoppingcart where email = "${req.session.user.email}"`); // [{}]
    res.render('shopping', { title: '购物车' ,shoppingcart});
  }else{
     res.redirect('/login');
  }
});
/* 我的. */
router.get('/my', async function(req, res, next) {
  if (req.session.user) {
    var user =req.session.user
    var orders  = await sql(`select * from orders where email = "${req.session.user.email}"`);
    orders.forEach((ele)=>{
      ele.commodity=JSON.parse(ele.commodity)
    })
    res.render('my', { title: '我的' ,user ,orders});
  }else{
    res.redirect('/login');
  }
});
/*蔬菜商品. */
router.get('/vegetable_commodity', async function(req, res, next) {
  let id=Number(req.query.id)
  console.log("v",id);
  let article=await sql(`select * from vegetable where id=${id}`)
  article=article[0]
  article.img=eval(article.img)
  res.render('commodity', { title: 'Express',article });
});
/* 水果商品. */
router.get('/fruit_commodity', async function(req, res, next) {
  let id=Number(req.query.id)
  console.log("f",id);
  let article=await sql(`select * from fruit where id=${id}`)
  article=article[0]
  article.img=eval(article.img)
  res.render('commodity', { title: 'Express',article });
});
/* 支付 */
router.get('/pay', async function(req, res, next) {
  if (req.session.user) {
    var commodity=await sql(`select * from shoppingcart where email = "${req.session.user.email}"`); // [{}]
    res.render('pay', { title: '支付' ,commodity});
  }else{
    res.redirect('/login');
  }
});
/* 登录 */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
/* 注册 */
router.get('/create', function(req, res, next) {
  res.render('create', { title: 'Express' });
});

/* 订单详情. */
router.get('/dd_commodity', async function(req, res, next) {
  if (req.session.user) {
    let orders_id=req.query.id
    let commodity=await sql(`select * from orders where orders_id="${orders_id}"`)
    var dd_commodity=JSON.parse(commodity[0].commodity)
    commodity=commodity[0]
    res.render('dd_commodity', { title: 'Express',dd_commodity,commodity});
  }else{
    res.redirect('/login');
  }
});

/* 搜索. */
router.get('/search', async function(req, res) {
  //搜索关键字
  var s=req.query.s;
  var search_vegetable= await sql(`select * from vegetable where  title like "%${s}%"`);
  var search_fruit= await sql(`select * from fruit where  title like "%${s}%"`);
  // var btnNum=Math.ceil(search.length/8)
  if (search_vegetable.length>0){
    search_vegetable.forEach((ele)=>{
      ele.img=eval(ele.img)
    })
  }
  if (search_fruit.length>0){
    search_fruit.forEach((ele)=>{
      ele.img=eval(ele.img)
    })
  }
  // if(search_fruit.length===0 )
    res.render('search',{title:'搜索',search_vegetable,search_fruit});
});

module.exports = router;
