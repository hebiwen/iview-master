var mongoose = require('../mongodb')
var mongoose = require('mongoose')

var DZZDCategorySch = new mongoose.Schema({
    _id:Number,
    CategoryName:String,
    Sort:Number,
    Group:String,  // 所属分类
    ParentId:Number,
    SelfCode:String  // 自身Code(2.3.5)
},{ collection:'DZZD_Category'},{ versionKey:false })

var CategorySch = new mongoose.Schema({
    _id: Number,
    CategoryName: String,
    Childrens: Array,
    Sort:Number,
    CreateDate: String,
    LastModified: String,
    IsValid: Boolean
}, { collection: 'Categorys' });

module.exports = { 
    dbCategory : mongoose.model('Categorys', CategorySch),
    dbCategoryDZZD : mongoose.model('DZZD_Category',DZZDCategorySch) 
}
