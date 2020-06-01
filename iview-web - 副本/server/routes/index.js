var express = require('express');
var router = express.Router();
var db = require('../models/dbMongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/userList',function(req,res,next){
  db.dbAccountInfo.find().then(function(docs){
    res.send(docs);
  })
})


module.exports = router;
