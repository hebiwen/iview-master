var db = require('../../models/category');
const logger = require('../../common/log');
const util = require('../../common/helper');

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
}

