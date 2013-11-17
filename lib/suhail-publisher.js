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
      console.log('--- WATCHING existing file:', file);
      fs.watchFile(file, options, function watch(curr, prev) {
        console.log('file may changed...', curr.mtime.toISOString(), prev.mtime.toISOString());
        if (curr.mtime !== prev.mtime) {
          var data = fs.readFileSync(file, fileEncoding);
          cb(data);
        }
      });
    }
    else {
      throw new Error('no such file', file);
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
      throw new Error('cannot unwatch unexisting file');
    }
  });
};


SuhailPublisher.prototype.publish = function (data) {
  console.log('--- PUBLISHING');
  data = JSON.stringify(data);

  // TODO we already know the options here
  var options = {
    hostname: 'suhail-io.herokuapp.com',
    port: 80,
    //hostname: 'localhost'
    //, port: 8080
    path: '/collector/ff0d03fa-3555-4f78-8ed9-72baa2ed3cd3',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  var req = http.request(options, function (res) {
    // TODO
    // add an error handler with notifier if we do not get HTTP200
    console.log(res.statusCode + ' on publishing of SuhailPublisher');
    //    console.log('HEADERS: ' + JSON.stringify(res.headers));
    //    res.setEncoding('utf8');
    ////res.on('data', function (chunk) {
    ////      console.log('BODY: ' + chunk);
    //});
  });

  req.on('error', function (e) {
    console.log('PROBLEM with request: ' + e.message);
  });

  // write data to request body
  data = new Buffer(data);
  req.end(data);
};

