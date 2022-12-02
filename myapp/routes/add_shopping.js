// 添加购物车
var sql = require('../mysql/config');

module.exports = async (req,res)=>{
    if (req.session.user) {
        var { name,img,price,url } = req.body;
        var email=req.session.user.email
        price=Number(price)
        var isName  = await sql(`select * from shoppingcart where email = "${email}" and name="${name}"`); // [{}]
        // 判断是否数据库中有相同的商品
        if(isName.length>0){
            var num=await sql(`select num from shoppingcart where email = "${email}" and name="${name}"`);
            num=num[0].num
            var data  = await sql(`UPDATE shoppingcart SET num=${num+1} WHERE email = "${email}" and name="${name}"`); // [{}]
        }else {
            var data = await sql(`INSERT INTO shoppingcart value(NULL,"${email}","${name}",${price},1,"${img}","${url}")`);
        }
        res.send({
            code:200,
            msg:"添加成功"
        });
    }else{
        res.send({
            code:500,
            msg:"用户未登录"
        });
    }
}