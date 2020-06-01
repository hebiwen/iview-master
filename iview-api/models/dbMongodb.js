var mongoose = require('mongoose')
var util = require('../common/helper');
mongoose.connect('mongodb://localhost:27017/webapp', { useNewUrlParser: true });

mongoose.connection.on('connected', function () {
    console.log('connect to mongodb success');
})

mongoose.connection.on('error', function () {
    console.log('connect to mongodb error');
})

// 将每张表的_id保存在Counter表中
var Counter = new mongoose.Schema({
    _id:{ type:String,required:true },
    seq:{ type:Number,default:0 }
},{ collection :'Counter' })

var Category = new mongoose.Schema({
    id: Number,
    CategoryName: String,
    Childrens: Array,
    CreateDate: String,
    LastModified: String,
    IsValid: Boolean
}, { collection: 'Categorys' });

var Report = new mongoose.Schema({
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

var AccountInfo = new mongoose.Schema({
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
    UserType:Number ,
    QRCode:String ,
    Remark:String,
    CreateDate:Date ,
    LastModified:Date ,
    IsValid:Boolean
},{collection:'DZZD_AccountInfo'},{ versionKey:false })  // versionKey 解决生成表数据时产生的_v字段

var AccountDept = new mongoose.Schema({
    _id:Number, 
    title:String ,
    ParentId:String ,
    DeptCode:String,
    CreateDate:Date ,
    LastModified:Date,
    expand:Boolean,
    children:Array
},{collection:'DZZD_AccountDept'})


Model = {
    dbCounter : mongoose.model('Counter',Counter),
    dbCategory : mongoose.model('Categorys', Category),
    dbReport : mongoose.model('Reports', Report),
    dbAccountInfo : mongoose.model('AccountInfo',AccountInfo),
    dbAccountDept : mongoose.model('AccountDept',AccountDept),
}

module.exports = Model
