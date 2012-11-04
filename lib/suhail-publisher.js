var util = require('util')
	, fs = require('fs');

var SuhailPublisher = function SuhailPublisher(config) {
	this.config = config || {}
	console.log(util.inspect(config, true, 2));
}

SuhailPublisher.prototype.watch = function watch() {
	console.log('watch');
	var file = this.config.file
	console.log(file);
	var ex = fs.exists(file);
	console.log(ex);

	fs.watchFile(file, function (curr, prev) {
  		console.log('the current mtime is: ' + curr.mtime);
  		console.log('the previous mtime was: ' + prev.mtime);
	});
}

SuhailPublisher.prototype.parse = function parse() {
	console.log('parse');

}

SuhailPublisher.prototype.parseXml = function parseXml() {
	console.log('parseXML');
}

SuhailPublisher.prototype.publish = function publish(data) {
	console.log('--- PUBLISHING ---');
	console.log(data);
}

SuhailPublisher.prototype.publishHttp = function publishHttp(data) {

}




// export
exports = module.exports.init = function init(config) {
	return new SuhailPublisher(config);
};