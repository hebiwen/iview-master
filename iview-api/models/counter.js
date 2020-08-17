var mongoose = require('../mongodb')

// 将每张表的_id保存在Counter表中
var CounterSch = new mongoose.Schema({
    _id:{ type:String,required:true },
    seq:{ type:Number,default:0 } // 表ID做新增时+1，做删除时不-1
},{ collection :'Counter' },{ versionKey:false })

module.exports = {
    dbCounter : mongoose.model('Counter',CounterSch)
}
