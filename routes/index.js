var express = require('express');
var router = express.Router();

var net = require('net');

//Application Server Information
var port = 0x1234;
var host = '172.16.205.90';


/* GET home page. */
router.get('/', function(req, res, next) {
  var socket = new net.Socket(); //Decorate a standard net.Socket with JsonSocket
  var buffer = "";

  socket.connect(port, host);

  socket.on('connect', function() {
    socket.write('aggregationByTicker');
  });

  socket.on('data', function(data) {
    buffer += data.toString();
    socket.end();
  });

  socket.on('end', function() {
    console.log('receive data size: ' + buffer.toString().length);
    var result = JSON.parse(buffer.toString());
    res.render('index', { title: 'Daily Change By Ticker',
                          content: result.content.aggregationByTicker,
                          vardata: result.var,
                          time: result.time
                        });
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
    socket.end();
  });

  socket.on('end', function() {
    console.log('receive data size: ' + buffer.toString().length);
    result = JSON.parse(buffer.toString());
    res.render('byQuality', { title: 'Daily Change By Quality',
                              content: result.content.aggregationByQuality,
                              vardata: result.var,
                              time: result.time
                            });
  });

  socket.on('uncaughtException', function() {
    console.log('err');
  });

});


router.get('/riskByMaturity', function(req, res, next) {
  var socket = new net.Socket();
  socket.connect(port, host);

  socket.on('connect', function() { //Don't send until we're connected
    socket.write('riskByMaturity');
  });

  var result;
  var buffer = "";

  socket.on('data', function(data) {
    buffer += data;
    socket.end();
  });

  socket.on('end', function() {
    console.log('receive data size: ' + buffer.toString().length);
    result = JSON.parse(buffer.toString());
    res.render('riskByMaturity', { title: 'Risk by Maturity',
                                   content: result.riskByMaturity,
                                   setting: result.setting,
                                   time: result.time
                                 });
  });

  socket.on('uncaughtException', function() {
    console.log('err');
  });

});

router.get('/varChart', function(req, res, next) {

  var socket = new net.Socket();

  socket.connect(port, host);

  socket.on('connect', function() { //Don't send until we're connected
    socket.write('pnlchart');
  });

  var result;
  var buffer = "";


  socket.on('data', function(data) {
    buffer += data;
    socket.end();
  });

  socket.on('end', function() {
    console.log('receive data size: ' + buffer.toString().length);
    result = JSON.parse(buffer.toString());

    res.render('varChart', { title: 'Historical P&L Chart',
                             labels: result.labels,
                             data: result.data
                           });
  });

  socket.on('uncaughtException', function() {
    console.log('err');
  });

});


router.get('/adjustSpread', function(req, res, next) {

  var socket = new net.Socket();
  socket.connect(port, host);

  socket.on('connect', function() { //Don't send until we're connected
    socket.write('adjustSpread' + ' '
                 + req.query.yield2 + ' '
                 + req.query.yield5 + ' '
                 + req.query.yield10 + ' '
                 + req.query.yield30 + ' '
                 + req.query.spread2 + ' '
                 + req.query.spread5 + ' '
                 + req.query.spread10 + ' '
                 + req.query.spread30
    );
  });

  var result;
  var buffer = "";

  socket.on('data', function(data) {
    buffer += data;
    socket.end();
  });

  socket.on('end', function() {
    console.log('receive data size: ' + buffer.toString().length);
    result = JSON.parse(buffer.toString());
    res.render('riskByMaturity', { title: 'Risk by Maturity',
      content: result.riskByMaturity,
      setting: result.setting,
      time: result.time
    });
  });

  socket.on('uncaughtException', function() {
    console.log('err');
  });

});

router.get('/upYield', function(req, res, next) {

  var socket = new net.Socket();
  socket.connect(port, host);

  socket.on('connect', function() { //Don't send until we're connected
    socket.write('upYield' + ' '
        + req.query.yield2 + ' '
        + req.query.yield5 + ' '
        + req.query.yield10 + ' '
        + req.query.yield30
    );
  });

  var result;
  var buffer = "";

  socket.on('data', function(data) {
    buffer += data;
    socket.end();
  });

  socket.on('end', function() {
    console.log('receive data size: ' + buffer.toString().length);
    result = JSON.parse(buffer.toString());
    res.render('riskByMaturity', { title: 'Risk by Maturity',
      content: result.riskByMaturity,
      setting: result.setting,
      time: result.time
    });
  });

  socket.on('uncaughtException', function() {
    console.log('err');
  });

});

router.get('/downYield', function(req, res, next) {

  var socket = new net.Socket();
  socket.connect(port, host);

  socket.on('connect', function() { //Don't send until we're connected
    socket.write('downYield' + ' '
        + req.query.yield2 + ' '
        + req.query.yield5 + ' '
        + req.query.yield10 + ' '
        + req.query.yield30
    );
  });

  var result;
  var buffer = "";

  socket.on('data', function(data) {
    buffer += data;
    socket.end();
  });

  socket.on('end', function() {
    console.log('receive data size: ' + buffer.toString().length);
    result = JSON.parse(buffer.toString());
    res.render('riskByMaturity', { title: 'Risk by Maturity',
      content: result.riskByMaturity,
      setting: result.setting,
      time: result.time
    });
  });

  socket.on('uncaughtException', function() {
    console.log('err');
  });

});


module.exports = router;
