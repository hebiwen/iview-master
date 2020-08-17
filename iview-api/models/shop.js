var mongoose = require('../mongodb')
const util = require('../common/helper')

var ShopCartSch = new mongoose.Schema({
    _id:Number,
    UserId:String,
    CookieId:String,
    GoodsId:String,
    GoodsName:String,
    Amount:{ type:Number,default:1 },
    Price:{ type:Number,default:0.00 },
    FeeSum:{ type:Number,default:0.00 },
    CreateDate:{ type:Date,default:util.currDate}
})

var GoodsInfoSch = new mongoose.Schema({
    _id:Number,
    GoodsName:String, 
    GoodsPrice:Number,      
    GoodsRealPrice:Number,  // 实价(折扣价)
    Spec:String,            // 规格
    WorkCategory:String,    // 所属类别
    Thumb:String,
    ShopName:String,        // 商品名称(厂家名称、生产商、销售商)
    GoodsDescription:String,
    GoodsDetail:String,
    Remark:String,
    CreateDate:Date
},{ collection:'DZZD_GoodsInfo' },{ versionKey:false })

module.exports = {
    dbShopCart : mongoose.model('ShopCart',ShopCartSch),
    dbGoodsInfo:mongoose.model('DZZD_GoodsInfo',GoodsInfoSch)
}

