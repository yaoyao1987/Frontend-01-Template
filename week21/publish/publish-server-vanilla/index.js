const http = require("http");
const fs = require("fs");
const unzipper = require("unzipper");
const https = require("https");

const server = http.createServer((req, res) => {
  if (req.url.match(/^\/auth/)) return auth(req, res);

  if (!req.url.match(/^\/?/)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("not found");
    return;
  }

  const options = {
    hostname: "github.com",
    port: 443,
    path: `/user`,
    method: "GET",
    headers: {
      Authorization: `token ${req.headers.token}`,
      "User-Agent": "toy-publish-tool",
    },
  };

  const request = https.request(options, (response) => {
    let body = "";
    response.on("data", (d) => {
      body += d.toString();
    });
    response.on("end", () => {
      console.log("user", body);
      let user = JSON.parse(body);
      console.log("user", user);
      // 权限检查

      let writeStream = unzipper.Extract({ path: "../server/public" });
      req.pipe(writeStream);
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("okay");
      });
    });
  });

  // let writeStream = unzipper.Extract({ path: "../server/public" });
  // req.pipe(writeStream);
  // req.on("end", () => {
  //   res.writeHead(200, { "Content-Type": "text/plain" });
  //   res.end("okay");
  // });
});
server.listen(8081);

function auth(req, res) {
  let code = req.url.match(/code=([^&]+)/)[1];
  console.log("code", code);
  let state = "abc123";
  let client_secret = "d3f705acc607a65a5aafde930ddf73ca474dbcb6";
  let client_id = "Iv1.6e42db42b93ab770";
  let redirect_uri = encodeURIComponent("http://localhost:8081/auth");

  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  // let url = `https://github.com/login/oauth/access_token?${params}`;

  const options = {
    hostname: "github.com",
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: "POST",
  };

  const request = https.request(options, (response) => {
    console.log("statusCode:", response.statusCode);
    console.log("headers:", response.headers);

    response.on("data", (d) => {
      let result = d.toString().match(/access_token=([^&]+)/);

      if (result) {
        let token = result[1];
        res.writeHead(200, {
          access_token: token,
          "Content-Type": "text/plain",
        });
        res.end(
          `<a href="http://localhost:8080/publish?token=${token}">publish</a>`
        );
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("error");
      }
    });
  });

  request.on("error", (e) => {
    console.log(e);
  });

  request.end();

  // res.writeHead(200, { "Content-Type": "text/plain" });
  // res.end("okay");
}
