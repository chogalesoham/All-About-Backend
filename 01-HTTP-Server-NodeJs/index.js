const http = require("http");
const fs = require("fs");

const MyServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Reqest Received... \n`;
  fs.appendFile("log.txt", log, (error, data) => {
    switch (req.url) {
      case "/":
        res.end("Hello From Home-Page");
        break;
      case "/about":
        res.end("Hello From About-Page");
        break;
      case "/contact":
        res.end("Hello From Contact-Us-Page");
        break;
      default:
        res.end("404 Not Found !");
        break;
    }
  });
});

MyServer.listen(8080, () => console.log("Server Start"));
