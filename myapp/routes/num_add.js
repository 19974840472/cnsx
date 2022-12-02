// 购物车商品数量增加
var sql = require('../mysql/config');

module.exports = async (req,res)=>{
    if (req.session.user) {
        var { name,num} = req.body;
        var email=req.session.user.email
        var data  = await sql(`UPDATE shoppingcart SET num=${num} WHERE email = "${email}" and name="${name}"`)
        res.send({
            code:200,
            msg:"添加成功"
        });
    }
}