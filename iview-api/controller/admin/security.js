var db = require('../../models/security');
var logger = require('../../common/log')
var util = require('../../common/helper');
var common = require('../../common/common');

module.exports = {
    async  getRole(req,res,next){
        console.log("--------------获取角色列表-----------------")
        try{
            let query = {};
            if(!util.isNullOrEmpty(req.query.pageIndex))
            {
                console.log("pageIndex:"+req.query.pageIndex)
                console.log("i am message {0} haha {1}".format(req.query.pageIndex,99))
                console.log(new Date().format('yyyy-MM-dd'))
            }
            await db.dbRole.find({}).then(docs=>{
                res.send(docs);
            })
        }catch(e){
            logger.log("get getRole error" + e)
        }
    },
    async getRoleGroup(req,res,next){
        console.log("---------------获取用户分组------------------")
        try {
            await db.dbRoleGroup.find().then(docs => {
                res.send(docs);
            })
        } catch (error) {
            logger.log("get role group error" + e)
        }
    }

}

