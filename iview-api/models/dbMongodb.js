var mongoose = require('mongoose')
var util = require('../common/helper');

mongoose.connect('mongodb://localhost:27017/webapp', { useNewUrlParser: true },err => {
    if(err) console.log('connect to mongodb error');
    else console.log('connect to mongodb success');
});

// 将每张表的_id保存在Counter表中
var CounterSch = new mongoose.Schema({
    _id:{ type:String,required:true },
    seq:{ type:Number,default:0 }
},{ collection :'Counter' },{ versionKey:false })

var CategorySch = new mongoose.Schema({
    _id: Number,
    CategoryName: String,
    Childrens: Array,
    Sort:Number,
    CreateDate: String,
    LastModified: String,
    IsValid: Boolean
}, { collection: 'Categorys' });

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

var AccountInfoSch = new mongoose.Schema({
    _id:Number,
    UserId:String ,
    WeixinOpenId:String ,
    UserName:String ,
    NickName:String ,
    DeptCode:String ,
    DeptName:String,
    Password:String ,
    Mobile:String ,
    QQ:String ,
    Wechat:String ,
    Email:String ,
    Addr:String ,
    Sex:Number ,
    Avtar:String ,
    Position:String ,
    BalanceAll:Number ,
    BalanceAvail:Number ,
    BalanceInOrder:Number ,
    AuditStatus:Number ,
    AuditDate:Date ,
    UserType:String ,
    QRCode:String ,
    Remark:String,
    CreateDate:Date ,
    LastModified:Date ,
    IsValid:Boolean
},{collection:'DZZD_AccountInfo'},{ versionKey:false })  // versionKey 解决生成表数据时产生的_v字段

var AccountDeptSch = new mongoose.Schema({
    _id:Number, 
    title:String ,
    ParentId:String ,
    DeptCode:String,
    CreateDate:Date ,
    LastModified:Date,
    expand:Boolean,
    children:Array
},{collection:'DZZD_AccountDept'})

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


var DZZDCategorySch = new mongoose.Schema({
    _id:Number,
    CategoryName:String,
    Sort:Number,
    Group:String,  // 所属分类
    ParentId:Number,
    SelfCode:String  // 自身Code(2.3.5)
},{ collection:'DZZD_Category'},{ versionKey:false })


Model = {
    dbCounter : mongoose.model('Counter',CounterSch),
    dbCategory : mongoose.model('Categorys', CategorySch),
    dbReport : mongoose.model('Reports', ReportSch),
    dbAccountInfo : mongoose.model('AccountInfo',AccountInfoSch),
    dbAccountDept : mongoose.model('AccountDept',AccountDeptSch),
    dbShopCart : mongoose.model('ShopCart',ShopCartSch),
    dbGoodsInfo:mongoose.model('GoodsInfo',GoodsInfoSch),
    dbCategoryDZZD : mongoose.model('DZZD_Category',DZZDCategorySch)
}

module.exports = Model
