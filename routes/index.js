var express = require('express');
var router = express.Router();

router.get('/app', function(req, res){
  res.render('index', {"access_token": req.query.access_token});
})

 module.exports = router;
