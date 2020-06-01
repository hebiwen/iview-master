var mongoose = require('mongoose')
/* mongoose连接字符串 */
mongoose.connect('mongodb://localhost:27017/webapp',{ useNewUrlParser:true });

mongoose.connection.on('connected',function(){
    console.log('connect to mongodb success')
})

mongoose.connection.on('error',function(){
    console.log('connect to mongodb failed')
})

var AccountInfo = new mongoose.Schema({
    id:Number,
    UserId:String ,
    WeixinOpenId:String ,
    UserName:String ,
    NickName:String ,
    Department:String ,
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
    CreateDate:Date ,
    LastModified:Date ,
    IsValid:Boolean
},{collection:'AccountInfo'})

Model = {
    dbAccountInfo :mongoose.model('AccountInfo',AccountInfo)
}

module.exports = Model

