var express = require('express');
var router = express.Router();

var net = require('net');



/* GET home page. */
router.get('/', function(req, res, next) {
  var sock = net.createConnection({port: 0x1234}, function() {
    console.log('connect to service');
    sock.write('aggregationByTicker');  //send request to service
  });
  var result;

  sock.on('data', function(data) {
    console.log(data.toString());
    result = JSON.parse(data.toString());
    sock.end();


    res.render('index', { title: 'Daily Change By Ticker', content: result.content.aggregationByTicker });
  });
  sock.on('end', function() {
    console.log('disconnect to service');
  });
  sock.on('uncaughtException', function() {
    console.log('err');
  });

});



router.get('/byQuality', function(req, res, next) {
  var sock = net.createConnection({port: 0x1234}, function() {
    console.log('connect to service');
    sock.write('aggregationByQuality');  //send request to service
  });
  var result;

  sock.on('data', function(data) {
    console.log(data.toString());
    result = JSON.parse(data.toString());
    sock.end();

    res.render('byQuality', { title: 'Daily Change By Quality', content: result.content.aggregationByQuality });
  });
  sock.on('end', function() {
    console.log('disconnect to service');
  });
  sock.on('uncaughtException', function() {
    console.log('err');
  });

});


router.get('/riskByMaturity', function(req, res, next) {

    res.render('riskByMaturity', { title: 'Risk by Maturity', content: 'k' });


});

router.get('/varChart', function(req, res, next) {


  res.render('varChart', { title: 'Historical P&L Chart', content: 'k' });


});

module.exports = router;
