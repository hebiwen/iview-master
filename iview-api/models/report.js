var mongoose = require('../mongodb')
const util = require('../common/helper')

var ReportSch = new mongoose.Schema({
    _id: Number,
    Title: String,
    Thumb: String,
    FileName: String,
    CategoryId: String,
    CategoryName:String,
    Content:String,
    IsTop: { type:Number,default:0 },
    ReadSum: { type:Number,default:0 },
    CreateDate: { type:String,default:util.currDate },  // 初始化时设定默认值
    LastModified: { type:String,default:util.currDate },
    IsValid: { type:Boolean, default:true }
}, { collection: 'Reports' },{ versionKey : false })

module.exports = {
    dbReport : mongoose.model('Reports',ReportSch)
}