var util = require('util');
var fs = require('fs');

module.exports = SuhailPublisher;

function SuhailPublisher() {
	this.config = {};
}

SuhailPublisher.create = function create(config) {
	var instance = new this();
	instance.config = config || {};
	return instance;
}

SuhailPublisher.prototype.watch = function watch(cb) {
	var file = this.config.file;
	var fileEncoding = this.config.fileEncoding;
	var options = {
		persistent: true,
		interval: this.config.watchPollTimeIntervall
	};

	//console.log(options);
	
	fs.exists(file, function (exists) {
	  if(exists) {
			console.log('--- WATCHING existing file:', file);
			fs.watchFile(file, options, function watch(curr, prev) {
					console.log('file may changed...', curr.mtime, prev.mtime);

		  		if(curr.mtime !== prev.mtime) {
		  			data = fs.readFileSync(file, fileEncoding);
		  			cb(data);
		  		}
			});
	  }
	});
};

SuhailPublisher.prototype.unwatch = function unwatch() {
	var file = this.config.file;
	fs.unwatch(file);
};


SuhailPublisher.prototype.publish = function (data) {
	console.log('--- PUBLISHING');
	console.log(data);
};




