var express = require('express');
var router = express.Router();

/** web controller moudle function */
var account = require('../controller/web/account');
var category = require('../controller/web/category');
var report = require('../controller/web/report');
var shop = require('../controller/web/shop');

/* get请求使用req.query获取参数，post请求使用req.body获取参数 */
router.get('/',function(req,res,next){
  res.send('web api responsed success..');
})

router.get('/userList',account.getPageUser);
router.get('/userDetail',account.getUserDetail);

router.get('/categoryList',category.getCategoryList);

router.get('/goodsList',shop.getPageGoods);
router.get('/goodsDetail',shop.getGoodsDetail);

router.get('/reportList',report.getPageReport);
router.get('/reportDetail',report.getReportDetail);


module.exports = router;