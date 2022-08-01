var net = require('net');
require('console-lt').overwrite();
var portInUse = function(port, ports, nf_ports) {
    var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket);
    });

    server.listen(port, '127.0.0.1');
    server.on('error', function (e) {
      	//console.log(port,'for', nf_ports[port],'is open');
		var client = new net.Socket();
        
        client.setTimeout(3000, function () {
            console.log('time out');
			console.log('port is frease', port, 'hide it');
			nf_ports[port]['name']='hiden';
            client.destroy();
		});
	
        client.connect(port, '127.0.0.1', function() {
            //console.log('Connected');
        });
        client.on('data', function(data) {
            //console.log('Received: ' + data);
             client.destroy(); 
        });
    });
    server.on('listening', function (e) {
  	  server.close();
      console.log('not active port', port, 'delete it');
      delete nf_ports[port];
      ports[port]=true;
      console.dir(nf_ports);
    });
};

//portInUse(15001, function(returnValue) {
//    console.log(returnValue);
//});

module.exports = function (ports, nf_ports) {
  //console.dir(ports);
  for (var port in nf_ports) {
    portInUse(port, ports, nf_ports);
  }
}
