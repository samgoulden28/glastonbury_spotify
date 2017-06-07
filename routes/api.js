var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
const readline = require('readline');
/* GET home page. */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var count = 0;
router.get('/act/:choose', function(req, res){
  url = 'http://www.glastonburyfestivals.co.uk/line-up/line-up-2017/?stage';
  request(url, function(error, response, html){
    // First we'll check to make sure no errors occurred when making the request

    if(!error){
      var act = req.params.choose;
      if(!act) {
        console.log("No act provided")
        res.send("No act provided")
        return;
      }
      var actUCase = act.toUpperCase();
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
      var $ = cheerio.load(html);

      // Finally, we'll define the variables we're going to capture
      var time, day, stage;
      var json = { time : "", day : "", stage : ""};
      $('.col_5.lineup').filter(function() {
        var data = $(this).find("a:contains('"+ actUCase + "')")
        console.log(data.parent().next().text());
        json.time = data.parent().next().text();
        json.day = data.parent().parent().parent().children().first().text();
        json.stage = data.parent().parent().parent().parent().parent().parent().parent().parent().prev().text();
        console.log(json);
        res.send(json);
      });
    }
  })
})


// $('.col_5.lineup').filter(function(){
//
// // Let's store the data we filter into a variable so we can easily see what's going on.
//
//      var data = $(this);
//
// // In examining the DOM we notice that the title rests within the first child element of the header tag.
// // Utilizing jQuery we can easily navigate and get the text by writing the following code:
//
//      title = data.children().first().children();
//
//      console.log("enter to continue")
//      process.stdin.once('data', function () {
//        printChild(title)
//      })
//  })
  function printChild(title) {
    console.log(count + ": ")
    console.log(title[count])
    console.log("enter to continue")
    count++;
    process.stdin.once('data', function () {
      printChild(title)
    });
  }
// })

 module.exports = router;
