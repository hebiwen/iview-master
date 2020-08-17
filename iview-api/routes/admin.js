var express = require('express');
var router = express.Router();


//#region 文件上传
var fs = require('fs');
var multer = require('multer');
const util = require('../common/helper');

var createFolder = function(folder){
  try{
    if(fs.existsSync(folder)){
      fs.accessSync(folder);
    }else{
      fs.mkdirSync(folder); // 同步创建文件夹
    }
  }catch(e){
     console.log('createFolder err:'+e)
  }
}

var uploadFolder = '../uploadFolder/' + util.formatDate(new Date(),'yyyyMMdd') + '/';
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

//#endregion 

var uploadCtr = require('../controller/admin/upload');

var accountCtr = require('../controller/admin/account');
var securityCtr = require('../controller/admin/security');
var categoryCtr = require('../controller/admin/category');
var shopCtr = require('../controller/admin/shop');
var reportCtr = require('../controller/admin/report');

/* get请求使用req.query获取参数，post请求使用req.body获取参数 */
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('admin api responsed success');
});

/* 用户相关 */
router.get('/userList',accountCtr.getPageUser);
router.get('/userDetail',accountCtr.getUserDetail);
router.post('/addUser',accountCtr.addUser);
router.post('/editUser',accountCtr.editUser);
router.post('/removeUser',accountCtr.removeUser);

router.get('/dept',accountCtr.getDeptTree);
router.post('/login',accountCtr.doLogin);

/**分类相关 */
router.get('/categoryList',categoryCtr.getCategoryList);
router.get('/categoryListNew',categoryCtr.getCategoryNewList);
router.post('/addCategory',categoryCtr.addCategory);
router.post('/editCategory',categoryCtr.editCategory);
router.post('/removeCategory',categoryCtr.removeCategory);

/** 商品相关 */
router.get('/goodsList',shopCtr.getPageGoods);
router.get('/goodsDetail',shopCtr.getGoodsDetail);
router.post('/removeGoods',shopCtr.removeGoods);

/* 权限相关 */
router.get('/roleList',securityCtr.getRole);
router.get('/rolegroupList',securityCtr.getRoleGroup);

/* 报告相关 */
router.get('/reportList',reportCtr.getPageReport);
router.get('/reportDetail',reportCtr.getReportDetail);
router.post('/addReport',reportCtr.addReport);
router.post('/editReport',reportCtr.editReport);
router.post('/removeReport',reportCtr.removeReport);

/* 文件上传 */
router.post('/uploadSingle',upload.single('file'),uploadCtr.uploadSingle);
router.post('/uploadArray',upload.array('files',5),uploadCtr.uploadMulter);

module.exports = router;
