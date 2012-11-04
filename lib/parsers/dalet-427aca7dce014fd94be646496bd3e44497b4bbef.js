console.log('--- PARSER: dalet-427aca7dce014fd94be646496bd3e44497b4bbef');

xml2js = require('xml2js');
var xmlParser = new xml2js.Parser();


module.exports = SuhailParser;

function SuhailParser() {}

SuhailParser.create = function create() {
	return new this();
}

SuhailParser.prototype.parseContent = function parseContent(content, cb) {
	console.log('--- PARSING');

	data = {
		updated: null,
		stationName: null,
		suhailStationId: null,
		current: {
			startTime: null,
			titleName: null,
			artistName: null,
			albumName: null,
			year: null,
			itemDurationMs : null,
		},
			current: {
			startTime: null,
			titleName: null,
			artistName: null,
			albumName: null,
			year: null,
			itemDurationMs : null,
		}
	}

    xmlParser.parseString(content, function (err, result) {
		cb(result);
    });
    
}