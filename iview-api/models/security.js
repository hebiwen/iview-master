var mongoose = require('../mongodb') 

var DZZDRole = new mongoose.Schema({
    _id:Number,
    Name : String
},{ collection:'DZZD_P_Role'},{ versionKey : false })

var DZZDRoleGroup = new mongoose.Schema({
    _id:Number,
    Name:String
},{ collection:'DZZD_P_RoleGroup' },{ versionKey : false })

Model = {
    dbRole : mongoose.model('DZZD_P_Role',DZZDRole),
    dbRoleGroup:mongoose.model('DZZD_P_RoleGroup',DZZDRoleGroup)
}

module.exports =  Model