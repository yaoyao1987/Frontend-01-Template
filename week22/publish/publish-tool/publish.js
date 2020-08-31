const http = require("http");
const querystring = require("querystring");
const fs = require("fs");
const archiver = require("archiver");
const child_process = require("child_process");

const packageName = "./package";

const options = {
  host: "localhost",
  port: 8088,
  path: `/?filename=package.zip`,
  method: "POST",
  headers: {
    token: token,
    "Content-Type": "application/octet-stream",
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});

req.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});

const archive = archiver("zip", {
  zlib: { level: 9 },
});

archive.directory(packageName, false);

archive.pipe(fs.createWriteStream("./package.zip"));

archive.finalize();

archive.pipe(req);

archive.on("end", () => {
  req.end();
  console.log("publish success!!");
  server.close();
});

server.listen(8080);
