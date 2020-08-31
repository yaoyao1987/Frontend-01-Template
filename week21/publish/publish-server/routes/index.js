var express = require("express");
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.post("/", function(req, res, next) {
  // let body = [];
  // request
  //   .on("data", (chunk) => {
  //     body.push(chunk);
  //   })
  //   .on("end", () => {
  //     body = Buffer.concat(body).toString();
      
  //   });
  // res.render('index', { title: 'Express' });
  fs.writeFileSync("../server/public/" + req.query.filename, req.body.content);
});

module.exports = router;
