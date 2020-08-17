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
    }

}

