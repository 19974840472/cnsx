// 从购物车删除
var sql = require('../mysql/config');

module.exports = async (req,res)=>{
    if (req.session.user) {
        var { name} = req.body;
        var email=req.session.user.email
        var data  = await sql(`DELETE FROM shoppingcart WHERE email = "${email}" and name="${name}";`)
        res.send({
            code:200,
            msg:"添加成功"
        });
    }
}