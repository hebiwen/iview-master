var db = require('../../models/account');
var util = require('../../common/helper');
var apiEnum = require('../../common/enum');
var logger = require('../../common/log');

module.exports = {
    /* 获取用户分页数据 */
    async getPageUser(req,res,next){
        try {
            var pageIndex = Number(req.query.pageIndex||1);
            var dept = req.query.deptCode || '1' ;
            var query = {};
            var search = new RegExp(req.query.search,'i');
  
            if(req.query.search!=''){
                // 多列模糊查询，且字母不区分大小写
                query = { 
                    $or:[
                        { UserName:{$regex:search} },
                        { Mobile:{$regex:search,$options:'$i'}}
                    ]
                }   
            }else{
                query = {
                    DeptCode:{$regex:dept}
                }
            }
            await db.dbAccountInfo.countDocuments(query).then(function(count){
                var skip = (pageIndex-1)*util.pageSize;
                db.dbAccountInfo.find(query).sort({_id: util.sort.asc}).limit(util.pageSize).skip(skip).then(function(docs){
                    let result = { pageIndex: pageIndex, total:count,data:docs };
                    res.json(result);
                })
            })
        } catch (error) {
            logger.log("get user data error:" + error)
        }
    },
    /* 获取用户详情 */
    async getUserDetail(req,res,next){
        try {
            let id = req.query.id;
            if(!id) return;
            await db.dbAccountInfo.findOne({_id:id},function(err,docs){
                if(err) throw err;
                res.send(docs);
            })
        } catch (error) {
            logger.log("")
        }
    },
    /* 添加用户 */
    async addUser(req,res,next){
        try {
            let account = {
                _id:null,
                UserId:req.body.userId,
                UserName:req.body.userName,
                DeptCode:req.body.dept,
                Password:req.body.password,
                Mobile:req.body.mobile,
                Email:req.body.email,
                Position:req.body.position,
                UserType:req.body.userType,
                AuditDate:req.body.auditDate
            }
            await db.dbAccountInfo.findOne({UserId:req.body.userId}).then(docs=>{
                if(docs!=null){
                  throw "用户已存在";
                }
                db.dbCounter.findOneAndUpdate({ _id:apiEnum.COUNTER.AccountId },{ $inc:{ seq:1 } },{ new:true,upsert:true },(error,counter) => {
                  if(error) throw error;
                  account._id = counter.seq;
                  db.dbAccountInfo.create(account).then(newAccount=>{
                    res.send(newAccount);
                  })
                })
            })
        } catch (error) {
            logger.log("");
        }
    },
    /* 修改用户 */
    async editUser(req,res,next){
        try {
            var user = {
                UserName : req.body.userName,
                UserId : req.body.userId,
                Password : req.body.password,
                DeptCode : req.body.dept,
                DeptName : req.body.deptName,
                Mobile : req.body.mobile,
                Email : req.body.email
              }
              await db.dbAccountInfo.updateOne({_id:req.body.id},user,function(err,docs){
                if(err) throw err;
                res.send(docs);
              })
        } catch (error) {
            logger.log("");
        }
    },
    /* 删除用户 */
    async removeUser(req,res,next){
        try {
            await db.dbAccountInfo.remove({_id:req.body.id},function(err,docs){
                if(err) throw err;              
                res.send(docs);
            })
        } catch (error) {
            logger.log("");
        }
    },
    /* 获取部门树 */
    async getDeptTree(req,res,next){
        try {
            await db.dbAccountDept.find().then(function(docs){
                res.send(docs);
            })
        } catch (error) {
            logger.log("");
        }
    },
    /* 会员登录 */
    async doLogin(req,res,next){
        try {
            let userName = req.body.userName;
            let password = req.body.password;
            let reg = new RegExp(userName,'i');
            await db.dbAccountInfo.find({$or:[{UserId:{$regex:reg}},{Mobile:{$regex:reg}}],Password : password },function(err,docs){
                if(err) throw err; 
                res.send(docs);
            })
        } catch (error) {
            logger.log("");
        }
    }
}


