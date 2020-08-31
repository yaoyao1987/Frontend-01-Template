const http = require("http");
const querystring = require("querystring");
const fs = require("fs");
var archiver = require("archiver");

const postData = querystring.stringify({
  content: "Hello World 666!",
});

const filename = "./cat.jpg";
const packageName = "./package";

// fs.stat(filename, (error, stat) => {

const options = {
  host: "localhost",
  port: 8081,
  path: `/?filename=${filename}`,
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
    // "Content-Length": stat.size,
  },
};

const archive = archiver("zip", {
  zlib: { level: 9 },
});

archive.directory(packageName, false);

archive.pipe(fs.createWriteStream("./package.zip"));

archive.finalize();

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});

req.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});

archive.pipe(req);

archive.on("end", () => {
  console.log("end");
});

// Write data to request body
// let readStream = fs.createReadStream("./cat.jpg");
// readStream.pipe(req);
// readStream.on("end", () => {
//   req.end();
// });
// });
