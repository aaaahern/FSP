var express = require('express');
var router = express.Router();

var net = require('net');


var port = 0x1234; //The same port that the server is listening on
var host = '172.16.179.50';


/* GET home page. */
router.get('/', function(req, res, next) {


  var socket = new net.Socket(); //Decorate a standard net.Socket with JsonSocket
  var buffer = "";

  socket.connect(port, host);

  socket.on('connect', function() { //Don't send until we're connected
    socket.write('aggregationByTicker');
  });
  var result;

  socket.on('data', function(data) {
    buffer += data.toString();
    console.log('data: ' + buffer);

    console.log('size: ' + socket.bytesRead);
    socket.end();
  });

  socket.on('end', function() {
    console.log('end');
    //console.log(buffer.toString());
    var result = JSON.parse(buffer.toString());
    res.render('index', { title: 'Daily Change By Ticker', content: result.content.aggregationByTicker });
    console.log('disconnect to service');
  });

  socket.on('close', function() {
    console.log('Connection closed');
  });

  socket.on('uncaughtException', function() {
    console.log('err');
  });

});



router.get('/byQuality', function(req, res, next) {
  var socket = new net.Socket();

  socket.connect(port, host);

  socket.on('connect', function() { //Don't send until we're connected
    socket.write('aggregationByQuality');
  });

  var result;
  var buffer = "";

  socket.on('data', function(data) {
    buffer += data;
    console.log('size: ' + socket.bytesRead);
    socket.end();
  });

  socket.on('end', function() {
    console.log('buffer size: ' + buffer.toString().length);
    result = JSON.parse(buffer.toString());
    res.render('byQuality', { title: 'Daily Change By Quality', content: result.content.aggregationByQuality });
    console.log('disconnect to service');
  });
  socket.on('uncaughtException', function() {
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
