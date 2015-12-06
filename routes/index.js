var express = require('express');
var router = express.Router();

var net = require('net');



/* GET home page. */
router.get('/', function(req, res, next) {
  var sock = net.createConnection({port: 0x1234}, function() {
    console.log('connect to service');
  });
  var result;
  sock.write('Request from node');  //send request to service
  sock.on('data', function(data) {
    console.log(data.toString());
    result = JSON.parse(data.toString());
    sock.end();


    res.render('index', { title: 'Daily Change By Ticker', content: result.aggregationByTicker });
  });
  sock.on('end', function() {
    console.log('disconnect to service');
  });
  sock.on('uncaughtException', function() {
    console.log('err');
  });

});

module.exports = router;
