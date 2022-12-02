// 订单
var sql = require('../mysql/config');

module.exports = async (req,res)=>{
    if (req.session.user) {
        var {consignee,address,money,phoneNum,orders_id} = req.body;
        var email=req.session.user.email
        money=Number(money)
        var commodity  = await sql(`select * from shoppingcart where email = "${email}"`)
        commodity=JSON.stringify(commodity)
        // 给数据库添加订单信息
        var data = await sql(`INSERT INTO orders value(NULL,"${orders_id}","${email}","${consignee}","${phoneNum}","${address}",${money},'${commodity}')`);
        // 删掉购物车数据
        var remove=await sql(`DELETE FROM shoppingcart WHERE email = "${email}"`);

        res.send({
            code:200,
            msg:"添加成功"
        });
    }
}