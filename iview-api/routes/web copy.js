var express = require('express');
var router = express.Router();
var db = require('../models/dbMongodb');
var util = require('../common/helper');
var logger = require('../common/log');
var fs = require('fs');
var multer = require('multer');


/* 定义常量 */
const str1 = '1';
const pageSize = 10;

var createFolder = function(folder){
  try{
    fs.accessSync(folder);
  }catch(e){
     fs.mkdirSync(folder); // 同步创建文件夹
  }
}

/*
 *  文件上传
 **/
var uploadFolder = './uploadFolder/' + util.formatDate(new Date(),'yyyyMMdd') + '/';
createFolder(uploadFolder);

var storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,uploadFolder);
  },
  filename:function(req,file,cb){
    cb(null,file.originalname);
  }
})

var upload = multer({ storage:storage});

var result;
router.use(function(req,res,next){
  result = {
    message:''
  }
  next()
})

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express' });
});

/**
 * 文件上传
 **/
router.post('/uploadSingle', upload.single('file'),function(req,res,next){
  console.log("upload1:"+req.file);

  let fileName = req.file.path;
  result.fileName = fileName;

  res.send(result);
})

/**
 * 批量上传
 **/
router.post('/uploadArray',upload.array('files',5),function(req,res,next){
  console.log('uploadArray:'+req.files[0]);

  let fileName = req.files[0].path;
  result.fileName = fileName;
  res.send(result);
})

/**
 * base64压缩上传 (1、文件名会重新生成 2、只适合上传图片 3、图片会变大)
 **/
router.post('/uploadBase64',upload.single('file'),function(req,res,next){
  // console.log("req.file:"+req.body.file);
  let file = req.body.file;
  let base64Data = file.replace(/^data:image\/\w+;base64,/, '');
  let buffer = new Buffer(base64Data,'base64');
  var path = uploadFolder.replace('./','') + util.formatDate(new Date(),"yyyyMMdd") +".jpg";
  fs.writeFile(path,buffer,function(err){
    if(err) throw err;
    result.fileName = path; 
    res.send(result);
  })
})



/* 获取用户分页数据 */
router.get('/userList',function(req,res,next){
  logger.info('get userList data'+ util.currDate)

  var pageIndex = Number(req.query.pageIndex||1);
  var dept = req.query.deptCode || str1 ;
  var query = {};
  var search = new RegExp(req.query.search,'i');
  
  if(req.query.search!=''){
    // 多列模糊查询，且字母不区分大小写
    query = { 
      $or:[
          { UserName:{$regex:search} },
          { Mobile:{$regex:search,$options:'$i'}}
        ]
    }
  }else{
    query = {
      DeptCode:{$regex:dept}
    }
  }
  db.dbAccountInfo.countDocuments(query).then(function(count){
    var skip = (pageIndex-1)*pageSize;
    db.dbAccountInfo.find(query).sort({_id: util.sort.asc}).limit(pageSize).skip(skip).then(function(docs){
      console.log(docs);
        result.pageIndex= pageIndex;
        result.data = docs;
        result.total = count;
        result.message = 'get accountInfo list success.';

        res.json(result);
    })

    // 连接查询
    // db.dbAccountInfo.find({}).populate({ path:'Department',select:{ name:1 } }).exec(function(err,obj){
    //   console.log("data is :",obj);
    // })

  })
})

/* 获取用户详情 */
router.get('/userDetail',function(req,res,next){
  let _id = req.query.id;
  if(!_id) return;
  db.dbAccountInfo.findOne({_id:_id},function(err,docs){
    if(err) throw err;
    res.send(docs);
  })
})

/* 添加用户 */
router.post('/addUser',function(req,res,next){
  let account = {
    _id:null,
    UserId:req.body.userId,
    UserName:req.body.userName,
    DeptCode:req.body.dept,
    Password:req.body.password,
    Mobile:req.body.mobile,
    Email:req.body.email,
    Position:req.body.position,
    UserType:req.body.userType,
    AuditDate:req.body.auditDate
  }
  db.dbAccountInfo.findOne({UserId:req.body.userId}).then(docs=>{
    if(docs){
      result.message = "用户名已存在";
      return;
    }
    db.dbCounter.findOneAndUpdate({ _id:'AccountInfoIdSeqGenerator' },{ $inc:{ seq:1 } },{ new:true,upsert:true },(error,counter) => {
      if(error) throw error;
      console.log('AccountSeq:'+counter.seq);
      account._id = counter.seq;
      db.dbAccountInfo.create(account).then(newAccount=>{
        res.send(newAccount);
      })
    })
  })
})

/* 修改用户 */
router.post('/editUser',function(req,res,next){
  var user = {
    UserName : req.body.userName,
    UserId : req.body.userId,
    Password : req.body.password,
    DeptCode : req.body.dept,
    DeptName : req.body.deptName,
    Mobile : req.body.mobile,
    Email : req.body.email
  }
  db.dbAccountInfo.updateOne({_id:req.body.id},user,function(err,docs){
    if(err) return;
    res.send(docs);
  })
})

/* 删除用户 */
router.post('/removeUser',function(req,res,next){
    db.dbAccountInfo.remove({_id:req.body.id},function(err,docs){
      if(err) return;
      res.send(docs);
    })
})

/* 获取报告分页数据 */
router.get('/reportList', function(req, res, next) {
  var pageIndex = Number(req.query.pageIndex||1);
  var query = {};
  if(req.query.name!=''){
    query = { Title : { $regex : new RegExp(req.query.name,'i') }  };
  }
  if(!util.isNullOrEmpty(req.query.category)){
    query = { CategoryName : req.query.category }
  }
  db.dbReport.countDocuments(query).then(function(count){
    let skip = (pageIndex - 1) * pageSize;
    db.dbReport.find(query).sort({_id:util.sort.asc}).limit(pageSize).skip(skip).then(docs => {
      let result = { pageIndex : pageIndex ,data : docs,total : count };
      logger.info(`/reportList->Result:${JSON.stringify(result)}`)
      res.json(result);
    })
  })

});

/* 添加报告 */
router.post('/addReport',function(req,res,next){
  let report = {
    _id : null,
    Title : req.body.title,
    Thumb : req.body.thumb,
    FileName : req.body.fileName,
    CategoryId : '1.2',
    CategoryName : req.body.category,
    Content : req.body.content
  }

  db.dbReport.findOne({ Title : req.body.title }).then(docs=>{
    if(docs){
      result.message = '报告已存在';
      return false;
    }

    db.dbCounter.findOneAndUpdate({_id:'ReportIdSeqGenerator'},{ $inc:{ seq : 1 } },{ new:true,upsert:true },(error,counter) => {
      if(error) throw error;
      console.log('seq:'+counter.seq);
      report._id = counter.seq;
      
      db.dbReport.create(report).then(newReport => {
        res.send(newReport);
      })
    })
  })
})

/* 删除报告 */
router.post('/removeReport',function(req,res,next){
  db.dbReport.remove({_id:req.body.id},function(err,docs){
    if(err) return;
    res.send(docs);
  })
})

/** 
* 报告详情  get请求使用req.query获取参数，post请求使用req.body获取参数
**/
router.get('/reportDetail',function(req,res,next){
  let id = req.query.id; 
  if(!id) return false;

  console.log("rptDetail:"+id);
  db.dbReport.findOne({ _id :id },function(error,docs){
    if(error) throw error;
    res.send(docs);
  })
})

/* 修改报告 */
router.post('/editReport',function(req,res,next){
  let report = {
    Title : req.body.title,
    Thumb : req.body.thumb,
    FileName :req.body.fileName,
    CategoryId : '1.2',
    CategoryName : req.body.category,
    Content : req.body.content
  }
  db.dbReport.updateOne({ _id : req.body.id },report,function(error,docs){
    if(error) throw error;
    res.send(docs);
  })

})


/* 获取部门树 */
router.get('/dept',function(req,res,next){
  db.dbAccountDept.find().then(function(docs){
    result.data = docs;
    res.send(result);
  })
})

/* 会员登录 */
router.post('/login',function(req,res,next){
  let userName = req.body.userName;
  let password = req.body.password;
  let reg = new RegExp(userName,'i');
  db.dbAccountInfo.find({$or:[{UserId:{$regex:reg}},{Mobile:{$regex:reg}}],Password : password },function(err,docs){
    if(err) throw err; 
    result.data = docs;
    res.send(result);
  })
})

/* 分类导航 */
router.get('/categoryList',function(req,res,next){
  var query = {};
  var group = req.query.group;
  if(!util.isNullOrEmpty(group)){
    console.log("group"+group);
    if(group.length == 1){
      query = { Group : group[0] }
    }else if(group.length > 1){
      query = { Group: { $in : group } }
    }
  }
  db.dbCategory.find(query).sort({ Sort:util.sort.asc }).then(docs => {
    result.data = docs;
    res.send(result);
  })
})

/* 商品列表 */
router.get('/goodsList',function(req,res,next){
  db.dbGoodsInfo.find().sort({_id:util.sort.asc}).then(docs => {
    result.data = docs;
    res.send(result);
  })
})

/* 商品详情 */
router.get('/goodsDetail',function(req,res,next){
  var query = {};
  var id = req.query.id;
  if(!util.isNullOrEmpty(id)){
    query = { _id :id };
  }
  db.dbGoodsInfo.findOne(query).then(docs => {
    result.data = docs;
    res.send(result);
    console.log('resultId'+docs._id)
  })
})


module.exports = router;