"use strict";

process.title = 'suhail: publisher';

var fs = require('fs');

// does config exist?
if (!fs.existsSync('./config.json')) {
  throw new Error('config.json does not exists');
}

var config = JSON.parse(fs.readFileSync('./config.json'));
var SuhailPublisher = require('./lib/suhail-publisher').create(config);

// configure parser, and check if it exist
// TODO: Factorize!
var parserName = config.parser;
if (!fs.existsSync('./lib/parsers/' + parserName + '.js')) {
  throw new Error('no such parser');
}

var SuhailParser = require('./lib/parsers/' + parserName).create();

SuhailPublisher.watch(function parseContent(content) {
  var options = {
    suhailStationId : config.suhailStationId,
  };

  SuhailParser.parseContent(content, options, function publishParsedConten(data) {
    data = JSON.stringify(data);
    data = JSON.parse(data);
    SuhailPublisher.publish(data);
  });
});

// termination
process.on('exit', function () {
  SuhailPublisher.unwatch();
});

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

