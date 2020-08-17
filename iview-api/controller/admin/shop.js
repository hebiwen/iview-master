var db = require('../../models/shop');
const logger = require('../../common/log');
const util = require('../../common/helper');

module.exports = {
    async getPageGoods(req,res,next){
        try {
            var query = {};
            var pageIndex = Number(req.query.pageIndex || 1)
            if(!util.isNullOrEmpty(req.query.goodsName)){
                query = { GoodsName : {$regex : new RegExp(req.query.goodName,i)} }
            }
            await db.dbGoodsInfo.countDocuments(query).then((count)=>{
                let skip = (pageIndex -1 )* util.pageSize;
                db.dbGoodsInfo.find(query).skip(skip).limit(util.pageSize).sort({_id:util.sort.asc}).then(docs => {
                    result = { pageIndex:pageIndex,total:count,data:docs };
                    res.send(result);
                })
            })
        } catch (error) {
            logger.log("");
        }
    },
    async getGoodsDetail(req,res,next){
        try {
            var query = {};
            var id = req.query.id;
            if(!util.isNullOrEmpty(id)){
                query = { _id :id };
            }
            await db.dbGoodsInfo.findOne(query).then(docs => {
                res.send(docs);
            })
        } catch (error) {
            logger.log("");
        }
    },
    async removeGoods(req,res,next){
        try {
            await db.dbGoodsInfo.remove({_id : req.body.id },(err,docs)=>{
                if(err) throw err;
                res.send(docs);
            })
        } catch (error) {
            logger.log("");
        }
    }
}

