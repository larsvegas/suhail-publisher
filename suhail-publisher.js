var fs = require('fs');
var util = require('util');
var config = JSON.parse(fs.readFileSync("./config.json"));
var SuhailPublisher = require('./lib/suhail-publisher').create(config);
//console.log(util.inspect(SuhailPublisher, true, 100));

// configure parser
// TODO: this shoud be an abstract factory
var parserName = config.parser;
fs.existsSync('./lib/parsers/' + parserName + '.js') || (function () { throw new Error('no such parser') }());
var SuhailParser = require('./lib/parsers/' + parserName).create();
//console.log(util.inspect(SuhailParser, true, 100));


SuhailPublisher.watch(function parseContent(content) {
  var options = {
    suhailStationId : config.suhailStationId,
  }

  SuhailParser.parseContent(content, options, function publishParsedConten(data) {
    SuhailPublisher.publish(data);
  })
});

// termination
process.on('exit', function () {
  SuhailPublisher.unwatch();
});

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
