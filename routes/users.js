var config = require('../config');
var express = require('express');
var router = express.Router();

var Cloudant = require('cloudant');

var user = config.db.user;
var password = config.db.password;
var host = config.db.host;

var cloudant = Cloudant("https://" + user + ":" + password + "@" + host);

var db = cloudant.db.use('chat_users');

/* GET home page. */
router.get('/skills/:skillId', function(req, res, next) {
  var question = req.query.question
  db.find({selector:{skills:req.params.skillId},fields:["name","slackid"]}, function(er, result) {
    if (er) {
      throw er;
    }
    res.set('chat-dummy-question', question)
    res.redirect('/chat?from=' + req.query.from + '&to=' + result.docs[0].slackid+'&question='+question);
//res.send(result.docs);
  });
});

module.exports = router;
