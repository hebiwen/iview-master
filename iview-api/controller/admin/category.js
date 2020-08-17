var db = require('../../models/report');
const apiEnum = require('../../common/enum');
const util = require('../../common/helper');
const logger = require('../../common/log');

module.exports = {
    /* 分类列表 */
    async getCategoryList(req,res,next){
        try {
            var query = {};
            var group = req.query.group;
            if(!util.isNullOrEmpty(group)){
                if(group.length == 1){
                    query = { Group : group[0] }
                }else if(group.length > 1){
                    query = { Group: { $in : group } }
                }
            }
            await db.dbCategory.find(query).sort({ Sort:util.sort.asc }).then(docs => {
                res.send(docs);
            })
        } catch (error) {
            logger.log("");
        }
    },
    /* 添加分类 */
    async addCategory(req,res,next){
        try {
            let category = {
                CategoryName : req.body.categoryName,
                ParentId:req.body.parentId,
              }
              await db.dbCounter.findOneAndUpdate({ _id :apiEnum.COUNTER.CategoryId },{ $inc:{ seq:1 } },{ new:true,upsert:true },function(error,counter){
                category._id = counter.seq;
                category.SelfCode = req.body.selfCode +'.' + counter.seq;
                db.dbCategoryDZZD.create(category,function(error,docs){
                  if(error) throw error;
                  res.send(docs);
                })
              })
        } catch (error) {
            logger.log("");
        }
    },
    async editCategory(req,res,next){
        try {
            var id = req.body.id;
            var newText = req.body.newText;
            await db.dbCategoryDZZD.updateOne({ _id:id },{ CategoryName:newText },function(error,docs){
                if(error) throw error;
                res.send(docs);
            })
        } catch (error) {
            logger.log("");
        }
    },
    async removeCategory(req,res,next){
        try {
            await db.dbCategoryDZZD.remove({_id:req.body.id},function(error,docs){
              if(error) throw error;
              res.send(docs);
            })
        } catch (error) {
            logger.log("");
        }
    },
    async getCategoryNewList(req,res,next){
        try {
            await db.dbCategoryDZZD.find().sort({ Sort:util.sort.asc }).then(docs => {
              res.send(docs)
            })
        } catch (error) {
            logger.log("");
        }
    }
}

