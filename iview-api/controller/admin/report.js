var db = require('../../models/report');
const logger = require('../../common/log');
const util = require('../../common/helper');

module.exports = {
    async getPageReport(req,res,next){
        try {
            var pageIndex = Number(req.query.pageIndex||1);
            var query = {};
            if(req.query.name!=''){
                query = { Title : { $regex : new RegExp(req.query.name,'i') }  };
            }
            if(!util.isNullOrEmpty(req.query.category)){
                query = { CategoryName : req.query.category }
            }
            await db.dbReport.countDocuments(query).then(function(count){
                let skip = (pageIndex - 1) * util.pageSize;
                db.dbReport.find(query).sort({_id:util.sort.asc}).limit(util.pageSize).skip(skip).then(docs => {
                    let result = { pageIndex : pageIndex ,data : docs,total : count };
                    logger.info(`/reportList->Result:${JSON.stringify(result)}`)
                    res.json(result);
                })
            })
        } catch (error) {
            logger.log("");
        }
    },
    async getReportDetail(req,res,next){
        try {
            let id = req.query.id; 
            if(!id) throw "params is null";
            await db.dbReport.findOne({ _id :id },function(error,docs){
                if(error) throw error;
                res.send(docs);
            })
        } catch (error) {
            logger.log("");
        }
    },
    async addReport(req,res,next){
        try {
            let report = {
                _id : null,
                Title : req.body.title,
                Thumb : req.body.thumb,
                FileName : req.body.fileName,
                CategoryId : '1.2',
                CategoryName : req.body.category,
                Content : req.body.content
              }
            
              await db.dbReport.findOne({ Title : req.body.title }).then(docs=>{
                if(docs){
                  result.message = '报告已存在';
                  return false;
                }
            
                db.dbCounter.findOneAndUpdate({ _id:apiEnum.COUNTER.ReportId },{ $inc:{ seq : 1 } },{ new:true,upsert:true },(error,counter) => {
                  if(error) throw error;
                  console.log('seq:'+counter.seq);
                  report._id = counter.seq;
                  
                  db.dbReport.create(report).then(newReport => {
                    res.send(newReport);
                  })
                })
              })
        } catch (error) {
            logger.log("");
        }
    },
    async removeReport(req,res,next){
        try {
            await db.dbReport.remove({_id:req.body.id},function(err,docs){
                if(err){
                  logger.error("admin RemoveReport error:"+err);
                  return;
                }
                res.send(docs);
              })
        } catch (error) {
            logger.log("");
        }
    },
    async editReport(req,res,next){
        try {
            let report = {
                Title : req.body.title,
                Thumb : req.body.thumb,
                FileName :req.body.fileName,
                CategoryId : '1.2',
                CategoryName : req.body.category,
                Content : req.body.content
              }
              await db.dbReport.updateOne({ _id : req.body.id },report,function(error,docs){
                if(error) throw error;
                res.send(docs);
              })
        } catch (error) {
            logger.log("");
        }
    }

}

