const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://time.geekbang.org/");
  await page.screenshot({ path: "example1.png" });

  await browser.close();
})();
// var page = require("webpage").create();
// page.open("http://localhost:8080/", function(status) {
//   console.log("Status: " + status);
//   if (status === "success") {
//     var body = page.evaluate(function() {
//       var toString = function(pad, element) {
//         const children = element.children;
//         var childrenString = "";
//         for (var i = 0; i < children.length; i++) {
//           childrenString += toString(" " + pad, children[i]) + "\n";
//         }
//         var name;
//         if (element.nodeType === Node.TEXT_NODE) {
//           name = "#text " + JSON.stringify(element.textContent);
//         }

//         if (element.nodeType === Node.ELEMENT_NODE) {
//           name = element.tagName;
//         }

//         return pad + element.tagName + "\n" + childrenString;
//       };
//       console.log(document.body);
//       return toString("", document.body);
//     });
//     console.log(body);
//   }
//   phantom.exit();
// });
