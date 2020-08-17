/* user router is for test */

var express = require('express');
var router = express.Router();

var permission = require('../controller/permission/permission');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/roleList',permission.getRole)

router.get('/rolegroupList',permission.getRoleGroup)

module.exports = router;
