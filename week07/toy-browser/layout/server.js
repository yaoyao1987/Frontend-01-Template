const http = require('http');

const server = http.createServer((req, res) => {
  console.log('request received');
  console.log(req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`<html maaa=a >
  <head>
    <style>
  #container {
    display: flex;
    width: 560px;
    height: 480px;
  }
  #container #myid {
    width: 360px;
  }
  #container .cc {
    flex:1;
  }
    </style>
  </head>
  <body>
    <div id="container">
      <div id="myid"/>
      <div class="cc" />
    </div>
  </body>
  </html>
  `);
});

server.listen(8088);
