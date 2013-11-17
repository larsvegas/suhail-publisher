"use strict";

var util = require('util')
  , fs = require('fs')
  , http = require('http');

var SuhailPublisher = function SuhailPublisher() {
  this.config = {};
};

module.exports = SuhailPublisher;

SuhailPublisher.create = function create(config) {
  var instance = new this();
  instance.config = config || {};
  return instance;
};

SuhailPublisher.prototype.watch = function watch(cb) {
  var file = this.config.file;
  var fileEncoding = this.config.fileEncoding;
  var options = {
    persistent: true,
    interval: this.config.watchPollTimeIntervall
  };

  fs.exists(file, function (exists) {
    if (exists) {
      console.log('WATCHING existing file:', file);
      fs.watchFile(file, options, function watch(curr, prev) {
        console.log('\nFILE may changed...', curr.mtime.toISOString(), prev.mtime.toISOString());
        if (curr.mtime !== prev.mtime) {
          var data = fs.readFileSync(file, fileEncoding);
          cb(data);
        }
      });
    }
    else {
      throw new Error('ERROR no such file', file);
    }
  });
};

SuhailPublisher.prototype.unwatch = function unwatch() {
  var file = this.config.file;

  fs.exists(file, function (exists) {
    if (exists) {
      fs.unwatch(file);
    }
    else {
      throw new Error('ERROR can not unwatch unexisting file');
    }
  });
};


SuhailPublisher.prototype.publish = function (data) {
  console.log('PUBLISHING');
  data = JSON.stringify(data);

  var options = {
    hostname: this.config.publisher.http.host,
    port: this.config.publisher.http.port,
    path: this.config.publisher.http.path + '/' + this.config.suhailStationId,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    console.log(res.statusCode + ' on etablishing connection of SuhailPublisher to Suhail');

    if (res.statusCode !== 200) {
      console.log(res.statusCode + ' ERROR there was a Problem to create a connection to Suhail');
    }
  });

  req.on('error', function (e) {
    console.log('ERROR on request: ' + e.message);
  });

  // write data to request body
  data = new Buffer(data);
  req.end(data);
};
