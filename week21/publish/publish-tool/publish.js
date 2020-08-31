const http = require("http");
const querystring = require("querystring");
const fs = require("fs");
const archiver = require("archiver");
const child_process = require("child_process");

const packageName = "./package";

let client_secret = "d3f705acc607a65a5aafde930ddf73ca474dbcb6";
let client_id = "Iv1.6e42db42b93ab770";
let redirect_uri = encodeURIComponent("http://localhost:8081/auth");
let url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=abc123`;
child_process.exec(`open ${url}`);

const server = http.createServer((request, res) => {
  console.log(request.url);
  console.log("real publish!!");
  let token = request.url.match(/token=([^&]+)/)[1];

  const options = {
    host: "localhost",
    port: 8081,
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
    console.log('publish success!!');
    server.close();
  });
});

server.listen(8080);

// const postData = querystring.stringify({
//   content: "Hello World 666!",
// });

// const filename = "./cat.jpg";
// const packageName = "./package";

// // fs.stat(filename, (error, stat) => {

// const options = {
//   host: "localhost",
//   port: 8081,
//   path: `/?filename=${filename}`,
//   method: "POST",
//   headers: {
//     "Content-Type": "application/octet-stream",
//     // "Content-Length": stat.size,
//   },
// };

// const archive = archiver("zip", {
//   zlib: { level: 9 },
// });

// archive.directory(packageName, false);

// archive.pipe(fs.createWriteStream("./package.zip"));

// archive.finalize();

// const req = http.request(options, (res) => {
//   console.log(`STATUS: ${res.statusCode}`);
//   console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
// });

// req.on("error", (e) => {
//   console.error(`problem with request: ${e.message}`);
// });

// archive.pipe(req);

// archive.on("end", () => {
//   console.log("end");
//   req.end();

//   let client_secret = "d3f705acc607a65a5aafde930ddf73ca474dbcb6";
//   let client_id = "Iv1.6e42db42b93ab770";
//   let redirect_uri = encodeURIComponent("http://localhost:8081/auth");
//   let url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=abc123`;
//   child_process.exec(`open ${url}`);
// });
// Write data to request body
// let readStream = fs.createReadStream("./cat.jpg");
// readStream.pipe(req);
// readStream.on("end", () => {
//   req.end();
// });
// });
