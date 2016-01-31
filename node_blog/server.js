// Load the http module to create an http server.
var http = require('http');
var host = process.env.VCAP_APP_HOST || 'localhost';
var port = process.env.VCAP_APP_PORT || '3000';

// Configure our HTTP server to respond with Hello World to all requests.
http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World!\n\n 你能看到本页面代表着git@osc部署在mopaasv2上的演示程序工作正常,请注意,本程序源代码仅演示如何部署,并不做他用,当然,版权也木有,翻版绝对不究!(Powered by CloudFoundry)\n");
}).listen(port, host);

// Put a friendly message on the terminal
console.log("Server running at http://" + host + ":" + port + "/");