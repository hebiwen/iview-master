var mongoose = require('../mongodb')

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
},{collection:'DZZD_AccountDept'},{ versionKey : false })

Model = {
    dbAccountInfo : mongoose.model('DZZD_AccountInfo',AccountInfoSch),
    dbAccountDept : mongoose.model('DZZD_AccountDept',AccountDeptSch),
}

module.exports = Model