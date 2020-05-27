const http = require('http');

const server = http.createServer((req, res) => {
  console.log('request received');
  console.log(req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`<html>
<head>
  <style>
    #container {
      display: flex;
      width: 560px;
      height: 480px;
      background-color: rgb(255,255,255);
    }
    #container #myid {
      width: 360px;
      height: 200px;
      background-color: rgb(255,0,0);
    }
    #container .cc {
      flex: 1;
      height: 100px;
      background-color: rgb(0,255,0);
    }
  </style>
</head>
<body>
  <div id="container">
    <div id="myid"></div>
    <div class="cc"></div>
  </div>
</body>
</html>
  `);
});

server.listen(8088);
