console.log('--- PARSER: dalet-427aca7dce014fd94be646496bd3e44497b4bbef');

//var Mixin = require('./../mixin'); // see: https://gist.github.com/580651

xml2js = require('xml2js');
var xmlParser = new xml2js.Parser();


module.exports = SuhailParser;

function SuhailParser() {};

SuhailParser.create = function create() {
  return new this();
}

SuhailParser.prototype.parseContent = function parseContent(content, options, cb) {
  if(typeof options === Function) {
    cb = options;
    options = {};
  }

  console.log('--- PARSING ' + options.suhailStationId);

  xmlParser.parseString(content, function (err, result) {
    result = result.BroadcastMonitor;

    data = {
      updated: result.updated[0],
      stationName: result.stationName[0],
      suhailStationId: options.suhailStationId ,
      current: {
        startTime: result.Current[0].startTime[0],
        titleName: result.Current[0].titleName[0],
        artistName: result.Current[0].artistName[0],
        albumName: result.Current[0].albumName[0],
        year: result.Current[0].Year[0],
        itemDurationSec : result.Current[0].itemDuration[0],
      },
      next: {
        startTime: result.Next[0].startTime[0],
        titleName: result.Next[0].titleName[0],
        artistName: result.Next[0].artistName[0],
        albumName: result.Next[0].albumName[0],
        year: result.Next[0].Year[0],
        itemDurationSec : result.Next[0].itemDuration[0],
      }
    }

    // TODO validate json here,
    // or at the endpoint in the callback?

    //   console.dir(JSON.stringify(data));
    //    data = JSON.stringify(data)
    //    console.log(data);
    cb(data);
  });

}
