const http = require("http");
const fs = require("fs");
const unzipper = require("unzipper");
const https = require("https");

const server = http.createServer((req, res) => {
  let writeStream = unzipper.Extract({ path: "../server/public" });
  req.pipe(writeStream);
  req.on("end", () => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("okay");
  });
});
server.listen(8088);
