// 退出登录
module.exports = (req,res)=>{
    req.session.destroy(() => {
        res.send({
            code:200,
            msg:"用户session清除成功！"
        });
    });
}