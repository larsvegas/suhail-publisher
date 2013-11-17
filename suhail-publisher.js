"use strict";

process.title = "suhail: publisher";

var fs = require('fs');
fs.existsSync('./config.json') || (function () { throw new Error('config.json does not exists') }());
var config = JSON.parse(fs.readFileSync("./config.json"));
var SuhailPublisher = require('./lib/suhail-publisher').create(config);

// configure parser
// TODO: this shoud be an abstract factory
var parserName = config.parser;
fs.existsSync('./lib/parsers/' + parserName + '.js') || (function () { throw new Error('no such parser') }());
var SuhailParser = require('./lib/parsers/' + parserName).create();

SuhailPublisher.watch(function parseContent(content) {
  var options = {
    suhailStationId : config.suhailStationId,
  }

  SuhailParser.parseContent(content, options, function publishParsedConten(data) {
    data = JSON.stringify(data);
    data = JSON.parse(data);
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
