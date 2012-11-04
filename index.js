var s = require('./lib/suhail-publisher')
  , fs = require('fs')
  , config = JSON.parse(fs.readFileSync("./config.json"));

suhailPublisher = s.init(config);
console.log(suhailPublisher);
//suhailPublisher.watch();