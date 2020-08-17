var db = require('../../models/account');
const logger = require('../../common/log');
const util = require('../../common/helper');

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

}

