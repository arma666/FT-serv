var http = require('http');
require('console-lt').overwrite();
var help=require('./mod/help');
var monit=require('./mod/monit');

help.debug=true;
var ports = help.range(15000,20000);
var regports = {};
const path = require('path');
var fileSystem = require('fs');

setInterval(function () {
  monit(ports,regports);
},10000);

http.createServer(function (req, res) {
  switch (req.method) {
	case 'OPTIONS':
		listuser(req, res)
		break;
	case 'PATCH':
		chver(req, res)
		break;
    case 'GET':
	  send(req, res)
      break;
    case 'POST':
      add(req, res)
      break;
    case 'DELETE':
      test(req, res);
      break;
    case 'PUT':
      chupdate(req, res);
      break;
    default:

  }
}).listen(8080);

function listuser(req, res){
	res.write('['+JSON.stringify(regports)+']')
	res.end()
}

function chver(req, res){
	let version = require('./v.json');
	res.write(version.v)
	res.end()
	delete require.cache[require.resolve('./v.json')];
}

function send(req, res){
	var filePath = path.join(__dirname, '/ver/myfile.zip');
	//console.log(filePath)
    var stat = fileSystem.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'archive/zip',
        'Content-Length': stat.size
    });
    var readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(res);
}

function add(req, res) {
  var body = "";
  req.on('data', chunk => {
            body += chunk.toString();
        });
  req.on('end', () => {
    j = body;
    console.dir(JSON.parse(j));
    res.write(
      help.getfirstfree(ports,regports,JSON.parse(j))
    );
    res.end();
  });

}

function test(req, res) {
  var uri = decodeURI(req.url).split('/');
  var str = 'no';
  for (var port in regports) {
    if ("/"+regports[port].name==req.url)
      str = 'yes'
  }
  res.write(str)
  res.end();
}
