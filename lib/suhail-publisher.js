var util = require('util');
var fs = require('fs');

// SuhailPublisher = function (config) {
// 	this.config = config || {}
// 	var that = this;

// 	// console.log(util.inspect(config, true, 2));
// 	console.log(this);
// 	// console.log(that);
// };

// SuhailPublisher.prototype.watch = function () {
// 	var file = this.config.file
	
// 	fs.exists(file, function (exists) {
// 	  if(exists) {
// 			console.log('--- WATCHING existing file:', file);
// 			fs.watchFile(file, function (curr, prev) {
// 					console.log('file may changed...');
// 		  		console.log('the current mtime is: ' + curr.mtime);
// 		  		console.log('the previous mtime was: ' + prev.mtime);	

// 		  		if(curr.mtime !== prev.mtime) {
// 		  			// SuhailPublisher.parseFile(function(data) {
// 		  			// 	SuhailPublisher.publish(data);
// 		  			// })
// 		  			parseFile();
// 		  		}
// 			});	  	
// 	  }
// 	  else {
// 			console.log(file, "does not exitst");
// 	  }
// 	});
// };

// SuhailPublisher.prototype.parseFile = function (cb) {
// 	console.log('--- PARSE ---');

// 	// readFile
// 	fileContent = fs.readFileSync(this.config.file, this.config.fileContentEncoding);

// 	console.log(fileContent);
// 	cb(fileContent);

// };

// SuhailPublisher.prototype.parseXml = function () {
// 	console.log('parseXML');
// };

// SuhailPublisher.prototype.publish = function (data) {
// 	console.log('--- PUBLISHING ---');
// 	console.log(data);
// };

// SuhailPublisher.prototype.publishHttp = function (data) {

// };




// // export
// exports = module.exports.init = function (config) {
// 	return new SuhailPublisher(config);
// };



module.exports = SuhailPublisher;

function SuhailPublisher() {
	this.config = {};
}

SuhailPublisher.create = function create(config) {
	var instance = new this();
	instance.config = config || {};
	return instance;
}

SuhailPublisher.prototype.watch = function watch() {
	var file = this.config.file
	
	fs.exists(file, function (exists) {
	  if(exists) {
			console.log('--- WATCHING existing file:', file);
			fs.watchFile(file, function (curr, prev) {
					console.log('file may changed...');
		  		console.log('the current mtime is: ' + curr.mtime);
		  		console.log('the previous mtime was: ' + prev.mtime);	

		  		if(curr.mtime !== prev.mtime) {
		  			// SuhailPublisher.parseFile(function(data) {
		  			// 	SuhailPublisher.publish(data);
		  			// })
		  			//parseFile();
		  		}
			});
	  }
	});
};

SuhailPublisher.prototype.unwatch = function unwatch() {
	var file = this.config.file;
	fs.unwatch(file);
};







