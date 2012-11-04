var fs = require('fs');
var util = require('util');
var config = JSON.parse(fs.readFileSync("./config.json"));
var parserName = config.parser;

//console.log(parserName);
//console.log('./lib/parsers/' + parserName + '.js');
//console.log(fs.existsSync('./lib/parsers/' + parserName + '.js'));

//fs.existsSync('./lib/parsers/' + parserName + '.js') || process.exit(1);
fs.existsSync('./lib/parsers/' + parserName + '.js') || (function () { throw new Error('no such parser') }());

var SuhailParser = require('./lib/parsers/' + parserName).create();
var SuhailPublisher = require('./lib/suhail-publisher').create(config);

console.log(SuhailParser);

SuhailPublisher.watch();

console.log(util.inspect(SuhailPublisher, true, 100));

process.on('exit', function () {
	SuhailPublisher.unwatch();
});

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});