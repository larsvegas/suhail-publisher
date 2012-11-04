var SuhailPublisher = require('./lib/suhail-publisher')
  , fs = require('fs')
  , config = JSON.parse(fs.readFileSync("./config.json"));

suhailPublisher = SuhailPublisher.init(config);
suhailPublisher.watch();